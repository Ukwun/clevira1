import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { PUBLIC_PRIVACY_EMAIL } from "@/lib/contact";
import { createWhatsappHref } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Privacy notice | Clevira",
  description: "How Clevira handles order details and optional website activity analytics.",
};

const whatsappHref = createWhatsappHref("Hello, I have a question about Clevira.");

export default function PrivacyPage() {
  return (
    <>
      <div className="announcement">
        <span className="announcement-dot" aria-hidden="true" />
        Privacy and order information
        <Link href="/#home" className="announcement-link">
          Back to Clevira <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>
      <SiteHeader whatsappHref={whatsappHref} homeHref="/" />
      <main className="legal-page section-shell">
        <Link className="bacteria-back-link" href="/#footer">
          <ArrowLeft size={15} aria-hidden="true" /> Back to Clevira
        </Link>
        <p className="eyebrow"><span /> TRENDORA GLOBAL LTD.</p>
        <h1>Privacy notice</h1>
        <p className="legal-updated">Last updated: 21 November 2026</p>

        <h2>Who we are</h2>
        <p>
          Clevira Herbal Capsules are offered by Trendora Global Ltd. For privacy
          questions or requests to access, correct, or delete your details, email{" "}
          <a href={`mailto:${PUBLIC_PRIVACY_EMAIL}`}>{PUBLIC_PRIVACY_EMAIL}</a>.
        </p>

        <h2>Information used for an order</h2>
        <p>
          If you choose to continue from the order form, your name, WhatsApp
          number, email address, delivery address, and selected package are
          included in a prefilled WhatsApp message. The website does not receive
          or send those details to our team. Review the message and tap Send in
          WhatsApp if you want to submit your request. Do not include health or
          payment-card information.
        </p>

        <h2>How your order information is handled</h2>
        <p>
          If you tap Send, WhatsApp delivers your message to Trendora Global
          Ltd. at the Clevira support number. WhatsApp processes the message
          under its own privacy terms, and copies may remain in your WhatsApp
          account and our business account. We use sent order details to respond
          to your request and coordinate delivery. The website does not store
          order details, create customer accounts, or take payment.
        </p>

        <h2>Optional activity analytics</h2>
        <p>
          Activity analytics are inactive unless we configure a collection
          service. If enabled and you consent, this site saves a random browser
          identifier and your choice in your browser, then sends the identifier,
          homepage views, selected interactions, valid order-form handoffs to
          WhatsApp, event type, and time to that service. These events are not
          joined to your order details and do not include form fields or symptom
          information. The website does not keep a separate activity-history
          database; the configured service may process or retain events under
          its own terms.
        </p>
        <p>
          Your analytics choice expires after 180 days. Changing it to “Continue
          without analytics” stops future activity collection from that browser
          and removes its saved browser identifier and consent cookie. Clearing
          browser storage also removes the local identifier. These actions do not
          delete events already sent to the collection service. To request
          deletion of those events, contact us at{" "}
          <a href={`mailto:${PUBLIC_PRIVACY_EMAIL}`}>{PUBLIC_PRIVACY_EMAIL}</a>;
          because the identifier is random and not linked to your order, we may
          need that browser identifier to locate the records. The collection
          service’s own retention practices may also apply.
        </p>

        <h2>Your choices and requests</h2>
        <p>
          You can choose not to submit an order or not to allow optional
          analytics. To ask for a copy, correction, or deletion of order details,
          contact us at{" "}
          <a href={`mailto:${PUBLIC_PRIVACY_EMAIL}`}>{PUBLIC_PRIVACY_EMAIL}</a>.
          We will respond and delete copies in our control where we are not
          required to retain them.
        </p>

        <h2>Contact</h2>
        <p>
          Trendora Global Ltd.
          <br />
          <a href={`mailto:${PUBLIC_PRIVACY_EMAIL}`}>{PUBLIC_PRIVACY_EMAIL}</a>
        </p>
      </main>
      <footer className="site-footer">
        <div className="section-shell footer-bottom">
          <span>© {new Date().getFullYear()} Trendora Global Ltd.</span>
          <Link href="/#home">Clevira home</Link>
        </div>
      </footer>
    </>
  );
}
