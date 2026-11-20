import { MAX_REQUESTED_QUANTITY, getUnitPriceNgn, formatNaira } from "@/lib/offer";
import { NextResponse } from "next/server";

type InterestPayload = {
  email?: unknown;
  quantity?: unknown;
  consent?: unknown;
  website?: unknown;
};

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    let requestOrigin: string;
    try {
      requestOrigin = new URL(origin).origin;
    } catch {
      return NextResponse.json({ error: "This request could not be verified." }, { status: 403 });
    }
    if (requestOrigin !== new URL(request.url).origin) {
      return NextResponse.json({ error: "Cross-origin requests are not accepted." }, { status: 403 });
    }
  }

  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return NextResponse.json({ error: "Use a JSON request body." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 4096) {
    return NextResponse.json({ error: "The submitted form is too large." }, { status: 413 });
  }

  let payload: InterestPayload;
  try {
    const body: unknown = await request.json();
    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ error: "Please submit a valid form." }, { status: 400 });
    }
    payload = body as InterestPayload;
  } catch {
    return NextResponse.json({ error: "Please submit a valid form." }, { status: 400 });
  }

  if (typeof payload.website === "string" && payload.website.trim()) {
    return NextResponse.json({ error: "Please submit a valid form." }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const quantity = payload.quantity;
  if (
    typeof quantity !== "number" ||
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > MAX_REQUESTED_QUANTITY
  ) {
    return NextResponse.json(
      { error: `Choose a whole-number quantity between 1 and ${MAX_REQUESTED_QUANTITY}.` },
      { status: 400 },
    );
  }

  if (payload.consent !== true) {
    return NextResponse.json({ error: "Please agree to be contacted about your request." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.LEADS_NOTIFICATION_EMAIL;
  const sender = process.env.LEADS_FROM_EMAIL;
  if (!apiKey || !recipient || !sender) {
    return NextResponse.json(
      { error: "Email delivery is not configured yet. Please try again later." },
      { status: 503 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient) || !sender.trim()) {
    console.error("Lead notification email configuration is invalid.");
    return NextResponse.json({ error: "Email delivery is temporarily unavailable." }, { status: 500 });
  }

  const unitPriceNgn = getUnitPriceNgn();
  const total = unitPriceNgn === null ? null : unitPriceNgn * quantity;
  const submittedAt = new Date().toISOString();
  const text = [
    "A new Clevira product-information request was submitted.",
    "",
    `Customer email: ${email}`,
    `Requested quantity: ${quantity}`,
    `Unit price: ${unitPriceNgn === null ? "Not configured" : formatNaira(unitPriceNgn)}`,
    `Total: ${total === null ? "To be confirmed" : formatNaira(total)}`,
    "Payment taken: No",
    `Submitted at: ${submittedAt}`,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `Clevira product enquiry (${quantity} ${quantity === 1 ? "unit" : "units"})`,
        text,
      }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Lead notification provider returned HTTP ${response.status}.`);
      return NextResponse.json(
        { error: "We couldn’t send your request just now. Please try again later." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Lead notification request failed.", error);
    return NextResponse.json(
      { error: "We couldn’t send your request just now. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
