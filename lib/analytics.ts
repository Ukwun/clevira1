export const ANALYTICS_CONSENT_COOKIE = "clevira-analytics-consent";
export const ANALYTICS_CONSENT_KEY = "clevira_analytics_consent";
export const ANALYTICS_CONSENT_TIMESTAMP_KEY = "clevira_analytics_consent_at";
export const ANALYTICS_VISITOR_KEY = "clevira_visitor_id";
export const ANALYTICS_CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

const analyticsEvents = new Set([
  "page_view",
  "cta_register",
  "cta_whatsapp",
  "register_whatsapp",
  "faq_whatsapp",
  "faq_toggle",
  "offer_submit",
]);

export type AnalyticsEvent =
  | "page_view"
  | "cta_register"
  | "cta_whatsapp"
  | "register_whatsapp"
  | "faq_whatsapp"
  | "faq_toggle"
  | "offer_submit";

export function isAnalyticsEvent(value: unknown): value is AnalyticsEvent {
  return typeof value === "string" && analyticsEvents.has(value);
}
