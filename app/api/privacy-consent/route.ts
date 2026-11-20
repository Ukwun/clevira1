import {
  ANALYTICS_CONSENT_COOKIE,
  ANALYTICS_CONSENT_MAX_AGE_SECONDS,
} from "@/lib/analytics";
import { NextResponse } from "next/server";

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
      return NextResponse.json({ error: "Cross-origin privacy requests are not accepted." }, { status: 403 });
    }
  }

  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return NextResponse.json({ error: "Use a JSON request body." }, { status: 415 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid choice." }, { status: 400 });
  }

  if (
    typeof payload !== "object" ||
    payload === null ||
    !("consent" in payload) ||
    (payload.consent !== "granted" && payload.consent !== "denied")
  ) {
    return NextResponse.json({ error: "Choose whether to allow optional analytics." }, { status: 400 });
  }

  const consent = payload.consent;
  const response = NextResponse.json({ consent });
  if (consent === "granted") {
    response.cookies.set(ANALYTICS_CONSENT_COOKIE, "granted", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: ANALYTICS_CONSENT_MAX_AGE_SECONDS,
    });
  } else {
    response.cookies.delete(ANALYTICS_CONSENT_COOKIE);
  }

  response.headers.set("Cache-Control", "no-store");
  return response;
}
