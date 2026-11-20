import { ANALYTICS_CONSENT_COOKIE, isAnalyticsEvent } from "@/lib/analytics";
import { NextRequest, NextResponse } from "next/server";

type ActivityPayload = {
  visitorId?: unknown;
  event?: unknown;
  path?: unknown;
};

const visitorIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(request: NextRequest) {
  if (request.cookies.get(ANALYTICS_CONSENT_COOKIE)?.value !== "granted") {
    return NextResponse.json({ error: "Optional analytics consent is required." }, { status: 403 });
  }

  const origin = request.headers.get("origin");
  if (origin) {
    let requestOrigin: string;
    try {
      requestOrigin = new URL(origin).origin;
    } catch {
      return NextResponse.json({ error: "This request could not be verified." }, { status: 403 });
    }
    if (requestOrigin !== new URL(request.url).origin) {
      return NextResponse.json({ error: "Cross-origin activity requests are not accepted." }, { status: 403 });
    }
  }

  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return NextResponse.json({ error: "Use a JSON request body." }, { status: 415 });
  }

  let payload: ActivityPayload;
  try {
    const body: unknown = await request.json();
    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ error: "Please submit a valid activity event." }, { status: 400 });
    }
    payload = body as ActivityPayload;
  } catch {
    return NextResponse.json({ error: "Please submit a valid activity event." }, { status: 400 });
  }

  const visitorId = typeof payload.visitorId === "string" ? payload.visitorId : "";
  const event = payload.event;
  const path = payload.path;
  if (!visitorIdPattern.test(visitorId) || !isAnalyticsEvent(event) || path !== "/") {
    return NextResponse.json({ error: "The activity event is not valid." }, { status: 400 });
  }

  const webhookUrl = process.env.ACTIVITY_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: "Activity collection is not configured." }, { status: 503 });
  }

  let destination: URL;
  try {
    destination = new URL(webhookUrl);
  } catch {
    console.error("ACTIVITY_WEBHOOK_URL must be a valid HTTPS URL.");
    return NextResponse.json({ error: "Activity collection is temporarily unavailable." }, { status: 500 });
  }

  if (destination.protocol !== "https:" || destination.username || destination.password) {
    console.error("ACTIVITY_WEBHOOK_URL must be an HTTPS URL without embedded credentials.");
    return NextResponse.json({ error: "Activity collection is temporarily unavailable." }, { status: 500 });
  }

  try {
    const webhookResponse = await fetch(destination, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ACTIVITY_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.ACTIVITY_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify({
        visitorId,
        event,
        path,
        occurredAt: new Date().toISOString(),
        source: "clevira-web",
      }),
      signal: AbortSignal.timeout(4000),
      cache: "no-store",
    });

    if (!webhookResponse.ok) {
      console.error(`Activity webhook returned HTTP ${webhookResponse.status}.`);
      return NextResponse.json({ error: "Activity collection is temporarily unavailable." }, { status: 502 });
    }
  } catch {
    console.error("Activity webhook request failed.");
    return NextResponse.json({ error: "Activity collection is temporarily unavailable." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
