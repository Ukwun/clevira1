"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  ANALYTICS_CONSENT_KEY,
  ANALYTICS_CONSENT_MAX_AGE_SECONDS,
  ANALYTICS_CONSENT_TIMESTAMP_KEY,
  ANALYTICS_VISITOR_KEY,
  type AnalyticsEvent,
  isAnalyticsEvent,
} from "@/lib/analytics";

type ConsentChoice = "undecided" | "granted" | "denied";
const consentChangeEvent = "clevira-privacy-consent-change";

function readConsentChoice(): ConsentChoice {
  try {
    const choice = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    const savedAt = Number(window.localStorage.getItem(ANALYTICS_CONSENT_TIMESTAMP_KEY));
    const now = Date.now();
    const isCurrent =
      Number.isFinite(savedAt) &&
      savedAt <= now &&
      now - savedAt < ANALYTICS_CONSENT_MAX_AGE_SECONDS * 1000;

    if (isCurrent && (choice === "granted" || choice === "denied")) return choice;

    return "undecided";
  } catch (error) {
    console.warn("Privacy preferences are unavailable in this browser.", error);
    return "denied";
  }
}

function subscribeToConsent(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(consentChangeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(consentChangeEvent, onChange);
  };
}

function getConsentSnapshot() {
  return readConsentChoice();
}

function getServerConsentSnapshot(): ConsentChoice {
  return "undecided";
}

function notifyConsentChange() {
  window.dispatchEvent(new Event(consentChangeEvent));
}

function readOrCreateTrackedVisitorId() {
  if (typeof window === "undefined" || readConsentChoice() !== "granted") return undefined;

  try {
    const existing = window.localStorage.getItem(ANALYTICS_VISITOR_KEY);
    if (existing) return existing;
    const visitorId = window.crypto.randomUUID();
    window.localStorage.setItem(ANALYTICS_VISITOR_KEY, visitorId);
    return visitorId;
  } catch (error) {
    console.warn("Optional activity analytics are unavailable in this browser.", error);
    return undefined;
  }
}

export function ActivityTracker() {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const onOpenSettings = (event: MouseEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-open-privacy-settings]")) {
        setIsSettingsOpen(true);
      }
    };

    if (readConsentChoice() === "undecided") {
      try {
        window.localStorage.removeItem(ANALYTICS_CONSENT_KEY);
        window.localStorage.removeItem(ANALYTICS_CONSENT_TIMESTAMP_KEY);
        window.localStorage.removeItem(ANALYTICS_VISITOR_KEY);
      } catch (error) {
        console.warn("Expired privacy preferences could not be cleared.", error);
      }
    }

    document.addEventListener("click", onOpenSettings);
    return () => {
      document.removeEventListener("click", onOpenSettings);
    };
  }, []);

  useEffect(() => {
    if (consent !== "granted") return;
    const visitorId = readOrCreateTrackedVisitorId();
    if (!visitorId) return;

    const send = async (event: AnalyticsEvent) => {
      try {
        const response = await fetch("/api/activity", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId, event, path: window.location.pathname }),
          keepalive: true,
        });
        if (response.status === 503) {
          console.info("Optional activity analytics are opted in but not connected to a collection service.");
        } else if (!response.ok) {
          console.warn(`Optional activity event was not recorded (HTTP ${response.status}).`);
        }
      } catch (error) {
        console.warn("Optional activity event could not be sent.", error);
      }
    };

    const pageViewKey = `clevira_page_view:${visitorId}:${window.location.pathname}`;
    try {
      if (window.sessionStorage.getItem(pageViewKey) !== "sent") {
        window.sessionStorage.setItem(pageViewKey, "sent");
        void send("page_view");
      }
    } catch (error) {
      console.warn("Page-view de-duplication is unavailable in this browser.", error);
      void send("page_view");
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const eventName = target.closest<HTMLElement>("[data-track]")?.dataset.track;
      if (eventName !== "order_whatsapp_handoff" && isAnalyticsEvent(eventName)) {
        void send(eventName);
      }
    };
    const onSubmit = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLFormElement)) return;
      const eventName = target.dataset.track;
      if (isAnalyticsEvent(eventName)) void send(eventName);
    };

    document.addEventListener("click", onClick);
    document.addEventListener("submit", onSubmit);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("submit", onSubmit);
    };
  }, [consent]);

  async function saveConsent(choice: Exclude<ConsentChoice, "undecided">) {
    setIsSaving(true);
    setErrorMessage("");

    if (choice === "denied") {
      try {
        window.localStorage.setItem(ANALYTICS_CONSENT_TIMESTAMP_KEY, String(Date.now()));
        window.localStorage.setItem(ANALYTICS_CONSENT_KEY, choice);
        window.localStorage.removeItem(ANALYTICS_VISITOR_KEY);
      } catch (error) {
        console.warn("The opt-out could not be saved in browser storage.", error);
      }
      notifyConsentChange();
    }

    try {
      const response = await fetch("/api/privacy-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consent: choice }),
      });

      if (!response.ok) throw new Error(`Privacy preference endpoint returned HTTP ${response.status}.`);

      if (choice === "granted") {
        try {
          window.localStorage.setItem(ANALYTICS_CONSENT_TIMESTAMP_KEY, String(Date.now()));
          window.localStorage.setItem(ANALYTICS_CONSENT_KEY, choice);
        } catch (error) {
          await fetch("/api/privacy-consent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ consent: "denied" }),
          });
          throw error;
        }
        notifyConsentChange();
      }
      setIsSettingsOpen(false);
    } catch (error) {
      console.error("Privacy preference could not be saved.", error);
      setErrorMessage(
        choice === "denied"
          ? "Tracking is paused in this browser, but the opt-out could not be synchronized with the server. Please try again."
          : "We couldn’t save your choice. Optional analytics remain off; please try again.",
      );
      setIsSettingsOpen(true);
    } finally {
      setIsSaving(false);
    }
  }

  const shouldShowBanner = consent === "undecided" || isSettingsOpen;

  return (
    <>
      {shouldShowBanner && (
        <aside
          className="privacy-consent"
          id="privacy-consent"
          role="dialog"
          aria-labelledby="privacy-consent-title"
          aria-describedby="privacy-consent-description"
        >
          <div className="privacy-consent-heading">
            <p className="privacy-consent-label">YOUR PRIVACY CHOICE</p>
            {consent !== "undecided" && (
              <button
                className="privacy-consent-close"
                type="button"
                onClick={() => setIsSettingsOpen(false)}
              >
                Close
              </button>
            )}
          </div>
          <h2 id="privacy-consent-title">Optional, pseudonymous activity analytics</h2>
          <p id="privacy-consent-description">
            If you allow it, we save a random browser ID and share homepage views
            and selected button clicks with our analytics service. We do not
            track symptom details. This choice is separate from any WhatsApp
            conversation you start with us, can be changed at any time, and
            expires after 180 days.
          </p>
          <a className="privacy-consent-policy" href="/privacy">
            Review our privacy information
          </a>
          {errorMessage && (
            <p className="privacy-consent-error" role="alert">{errorMessage}</p>
          )}
          <div className="privacy-consent-actions">
            <button
              className="privacy-consent-reject"
              type="button"
              onClick={() => void saveConsent("denied")}
              disabled={isSaving}
            >
              Continue without analytics
            </button>
            <button
              className="privacy-consent-accept"
              type="button"
              onClick={() => void saveConsent("granted")}
              disabled={isSaving}
            >
              {isSaving ? "Saving…" : "Allow optional analytics"}
            </button>
          </div>
        </aside>
      )}
      {consent !== "undecided" && !isSettingsOpen && (
        <button
          className="privacy-settings-trigger"
          type="button"
          data-open-privacy-settings
          aria-expanded={isSettingsOpen}
          aria-controls="privacy-consent"
          onClick={() => setIsSettingsOpen(true)}
        >
          Privacy settings
        </button>
      )}
    </>
  );
}
