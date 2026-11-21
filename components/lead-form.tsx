"use client";

import { useState, type FormEvent } from "react";
import {
  formatNaira,
  getProductOffer,
  PRODUCT_OFFERS,
  type ProductOfferId,
} from "@/lib/offer";
import { createWhatsappHref } from "@/lib/whatsapp";

type SubmissionState =
  | { status: "idle" }
  | { status: "handoff"; whatsappHref: string }
  | { status: "error"; message: string };

export function LeadForm() {
  const [state, setState] = useState<SubmissionState>({ status: "idle" });
  const [offerId, setOfferId] = useState<ProductOfferId | "">("");
  const selectedOffer = getProductOffer(offerId);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      whatsappPhone: String(formData.get("whatsappPhone") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      streetAddress: String(formData.get("streetAddress") ?? "").trim(),
      city: String(formData.get("city") ?? "").trim(),
      state: String(formData.get("state") ?? "").trim(),
      offerId: String(formData.get("offerId") ?? ""),
      consent: formData.get("consent") === "on",
    };

    const phoneDigits = payload.whatsappPhone.replace(/\D/g, "").length;
    if (!/^[+()\d\s.-]{7,30}$/.test(payload.whatsappPhone) || phoneDigits < 7 || phoneDigits > 15) {
      setState({ status: "error", message: "Enter a valid WhatsApp phone number." });
      return;
    }

    const offer = getProductOffer(payload.offerId);
    if (!offer) {
      setState({ status: "error", message: "Choose a package before continuing." });
      return;
    }

    const bottleCount = offer.paidBottles + offer.freeBottles;
    const whatsappHref = createWhatsappHref([
      "Hello Clevira, I’d like to place an order request.",
      "",
      `Name: ${payload.name}`,
      `WhatsApp number: ${payload.whatsappPhone}`,
      `Email: ${payload.email}`,
      `Package: ${offer.label} (${bottleCount} ${bottleCount === 1 ? "bottle" : "bottles"})`,
      `Price: ${formatNaira(offer.priceNgn)}`,
      "Delivery: FREE nationwide",
      `Delivery address: ${payload.streetAddress}, ${payload.city}, ${payload.state}`,
      "",
      "Please confirm availability, delivery, and payment instructions. I understand this website has not taken payment.",
    ].join("\n"));

    setState({ status: "handoff", whatsappHref });
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      className="lead-form"
      data-track="order_whatsapp_handoff"
      onSubmit={handleSubmit}
      onChange={() => {
        if (state.status === "handoff") setState({ status: "idle" });
      }}
    >
      <fieldset className="offer-choices">
        <legend>Choose a package</legend>
        <div className="offer-options">
          {PRODUCT_OFFERS.map((offer) => (
            <label
              className={`offer-option${offerId === offer.id ? " offer-option-selected" : ""}`}
              key={offer.id}
              data-track="offer_select"
            >
              <input
                type="radio"
                name="offerId"
                value={offer.id}
                checked={offerId === offer.id}
                onChange={(event) => {
                  const nextOffer = getProductOffer(event.currentTarget.value);
                  if (nextOffer) {
                    setOfferId(nextOffer.id);
                    setState({ status: "idle" });
                  }
                }}
                required
              />
              <span className="offer-option-details">
                <span className="offer-option-label">{offer.label}</span>
                <span className="offer-option-count">
                  {offer.paidBottles + offer.freeBottles}{" "}
                  {offer.paidBottles + offer.freeBottles === 1 ? "bottle" : "bottles"} total
                </span>
              </span>
              <strong className="offer-option-price">{formatNaira(offer.priceNgn)}</strong>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="price-summary" aria-live="polite">
        <span>Selected package price</span>
        <strong>{selectedOffer ? formatNaira(selectedOffer.priceNgn) : "Choose a package"}</strong>
      </div>

      <div className="delivery-fields">
        <div className="delivery-field">
          <label htmlFor="order-name">Full name</label>
          <input id="order-name" name="name" autoComplete="name" maxLength={100} required />
        </div>
        <div className="delivery-field">
          <label htmlFor="order-phone">WhatsApp phone number</label>
          <input
            id="order-phone"
            name="whatsappPhone"
            type="tel"
            autoComplete="tel"
            placeholder="+234 800 000 0000"
            maxLength={30}
            required
          />
        </div>
        <div className="delivery-field delivery-field-wide">
          <label htmlFor="order-email">Email address</label>
          <input
            id="order-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            maxLength={254}
            required
          />
        </div>
        <div className="delivery-field delivery-field-wide">
          <label htmlFor="order-street">Street address</label>
          <input id="order-street" name="streetAddress" autoComplete="street-address" maxLength={250} required />
        </div>
        <div className="delivery-field">
          <label htmlFor="order-city">City</label>
          <input id="order-city" name="city" autoComplete="address-level2" maxLength={100} required />
        </div>
        <div className="delivery-field">
          <label htmlFor="order-state">State</label>
          <input id="order-state" name="state" autoComplete="address-level1" maxLength={100} required />
        </div>
      </div>

      <label className="consent-label">
        <input name="consent" type="checkbox" required />
        <span className="consent-check" aria-hidden="true" />
        <span>
          I agree that Trendora Global Ltd. may use these details to process this order request.
        </span>
      </label>

      <p className="form-privacy">
        Your details are added to a WhatsApp message only when you continue. You review it and tap Send there. Read the{" "}
        <a href="/privacy">privacy notice</a>.
      </p>

      <button
        className="button button-primary form-submit"
        type="submit"
      >
        Continue to WhatsApp
        <span aria-hidden="true">↗</span>
      </button>
      <div className="form-feedback" aria-live="polite" role="status">
        {state.status === "handoff" && (
          <p className="form-success">
            Your order details are ready for WhatsApp. Review the message and tap Send to place your request. If WhatsApp did not open,{" "}
            <a href={state.whatsappHref} target="_blank" rel="noreferrer">continue to WhatsApp</a>. No order is sent and no payment is taken until you choose what to do in WhatsApp.
          </p>
        )}
        {state.status === "error" && (
          <p className="form-error">{state.message}</p>
        )}
      </div>
    </form>
  );
}
