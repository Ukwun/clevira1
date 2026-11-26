import { NextResponse } from "next/server";
import { formatNaira, getProductOffer, type ProductOfferId } from "@/lib/offer";

type OrderPayload = {
  name?: unknown;
  whatsappPhone?: unknown;
  streetAddress?: unknown;
  city?: unknown;
  state?: unknown;
  offerId?: unknown;
  consent?: unknown;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return NextResponse.json({ error: "Use a JSON request body." }, { status: 415 });
  }

  let payload: OrderPayload;
  try {
    payload = (await request.json()) as OrderPayload;
  } catch {
    return NextResponse.json({ error: "Please submit a valid order." }, { status: 400 });
  }

  const name = clean(payload.name, 100);
  const whatsappPhone = clean(payload.whatsappPhone, 30);
  const streetAddress = clean(payload.streetAddress, 250);
  const city = clean(payload.city, 100);
  const state = clean(payload.state, 100);
  const offerId = clean(payload.offerId, 40) as ProductOfferId;
  const offer = getProductOffer(offerId);
  const phoneDigits = whatsappPhone.replace(/\D/g, "").length;

  if (name.length < 2 || !offer || payload.consent !== true || !streetAddress || !city || !state || !/^[+()\d\s.-]{7,30}$/.test(whatsappPhone) || phoneDigits < 7 || phoneDigits > 15) {
    return NextResponse.json({ error: "Please complete all required order details." }, { status: 400 });
  }

  const notificationEmail = process.env.ORDER_NOTIFICATION_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.ORDER_FROM_EMAIL;
  if (!notificationEmail || !apiKey || !fromEmail) {
    console.error("Order email is not configured. Set ORDER_NOTIFICATION_EMAIL, RESEND_API_KEY, and ORDER_FROM_EMAIL.");
    return NextResponse.json({ emailSent: false, error: "Order email is not configured." }, { status: 503 });
  }

  const bottleCount = offer.paidBottles + offer.freeBottles;
  const submittedAt = new Date().toISOString();
  const details = {
    name,
    whatsappPhone,
    package: `${offer.label} (${bottleCount} ${bottleCount === 1 ? "bottle" : "bottles"})`,
    price: formatNaira(offer.priceNgn),
    delivery: "FREE nationwide",
    address: `${streetAddress}, ${city}, ${state}`,
    submittedAt,
  };

  try {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: fromEmail,
        to: [notificationEmail],
        subject: `New Clevira order request — ${name}`,
        html: `<h2>New Clevira order request</h2><p><strong>Name:</strong> ${escapeHtml(details.name)}</p><p><strong>WhatsApp:</strong> ${escapeHtml(details.whatsappPhone)}</p><p><strong>Package:</strong> ${escapeHtml(details.package)}</p><p><strong>Price:</strong> ${escapeHtml(details.price)}</p><p><strong>Delivery:</strong> ${escapeHtml(details.delivery)}</p><p><strong>Address:</strong> ${escapeHtml(details.address)}</p><p><strong>Submitted:</strong> ${escapeHtml(details.submittedAt)}</p>`,
      }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });

    if (!emailResponse.ok) {
      console.error(`Order email provider returned HTTP ${emailResponse.status}.`);
      return NextResponse.json({ emailSent: false, error: "Order email could not be sent." }, { status: 502 });
    }
  } catch (error) {
    console.error("Order email request failed.", error);
    return NextResponse.json({ emailSent: false, error: "Order email could not be sent." }, { status: 502 });
  }

  return NextResponse.json({ emailSent: true });
}
