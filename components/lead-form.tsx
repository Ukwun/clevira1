"use client";

import { useState, type FormEvent } from "react";
import { formatNaira, MAX_REQUESTED_QUANTITY } from "@/lib/offer";

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

type LeadFormProps = {
  unitPriceNgn: number | null;
};

export function LeadForm({ unitPriceNgn }: LeadFormProps) {
  const [state, setState] = useState<SubmissionState>({ status: "idle" });
  const [quantity, setQuantity] = useState("1");
  const numericQuantity = Number(quantity);
  const totalPrice =
    unitPriceNgn !== null &&
    Number.isInteger(numericQuantity) &&
    numericQuantity > 0 &&
    numericQuantity <= MAX_REQUESTED_QUANTITY
      ? unitPriceNgn * numericQuantity
      : null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      email: String(formData.get("email") ?? "").trim(),
      quantity: Number(formData.get("quantity")),
      consent: formData.get("consent") === "on",
      website: String(formData.get("website") ?? ""),
    };

    setState({ status: "submitting" });
    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result: { error?: string } = await response.json();

      if (!response.ok) {
        setState({
          status: "error",
          message:
            result.error ??
            "We couldn’t send your request just now. Please try again later.",
        });
        return;
      }

      form.reset();
      setQuantity("1");
      setState({ status: "success" });
    } catch {
      setState({
        status: "error",
        message: "We couldn’t reach the service. Check your connection and try again.",
      });
    }
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <label htmlFor="lead-quantity">How many units?</label>
      <input
        id="lead-quantity"
        name="quantity"
        type="number"
        inputMode="numeric"
        min="1"
        max={MAX_REQUESTED_QUANTITY}
        step="1"
        value={quantity}
        onChange={(event) => {
          setQuantity(event.target.value);
          setState({ status: "idle" });
        }}
        aria-describedby="quantity-hint"
        required
      />
      <span className="input-hint" id="quantity-hint">
        {unitPriceNgn === null
          ? "Current pricing is being finalized. No price will be assumed."
          : `Unit price: ${formatNaira(unitPriceNgn)}`}
      </span>

      <div className="price-summary" aria-live="polite">
        <span>Total price</span>
        <strong>
          {totalPrice === null
            ? "To be confirmed"
            : formatNaira(totalPrice)}
        </strong>
      </div>
      {unitPriceNgn === null && (
        <p className="price-note">
          You can request details now; we’ll confirm the price before any purchase.
        </p>
      )}

      <label htmlFor="lead-email">Email address</label>
      <input
        id="lead-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        maxLength={254}
        required
      />

      <label className="consent-label">
        <input name="consent" type="checkbox" required />
        <span className="consent-check" aria-hidden="true" />
        <span>
          I agree to be contacted by email about this request and understand I can
          opt out at any time.
        </span>
      </label>

      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="lead-website">Leave this field empty</label>
        <input
          id="lead-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        className="button button-primary form-submit"
        type="submit"
        disabled={state.status === "submitting"}
        data-track="offer_submit"
      >
        {state.status === "submitting" ? "Sending…" : "Request product details"}
        <span aria-hidden="true">↗</span>
      </button>
      <p className="form-privacy">
        This is an information request, not an order or payment. Review our{" "}
        <a href="#privacy">privacy information</a>.
      </p>
      <div className="form-feedback" aria-live="polite" role="status">
        {state.status === "success" && (
          <p className="form-success">
            Your request was sent. We’ll email you with the requested product and
            price information.
          </p>
        )}
        {state.status === "error" && (
          <p className="form-error">{state.message}</p>
        )}
      </div>
    </form>
  );
}
