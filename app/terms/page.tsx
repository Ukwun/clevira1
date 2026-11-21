import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { PUBLIC_PRIVACY_EMAIL } from "@/lib/contact";
import { createWhatsappHref } from "@/lib/whatsapp";
import { formatNaira, PRODUCT_OFFERS } from "@/lib/offer";

export const metadata: Metadata = {
  title: "Order terms | Clevira",
  description: "Clevira package prices, delivery, order confirmation, and health information terms.",
};

const whatsappHref = createWhatsappHref("Hello, I have a question about Clevira.");

export default function TermsPage() {
  return (
    <>
      <div className="announcement">
        <span className="announcement-dot" aria-hidden="true" />
        Clevira order terms
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
        <h1>Order terms</h1>
        <p className="legal-updated">Last updated: 21 November 2026</p>

        <h2>Packages and prices</h2>
        <ul>
          {PRODUCT_OFFERS.map((offer) => (
            <li key={offer.id}>
              {offer.label} ({offer.paidBottles + offer.freeBottles}{" "}
              {offer.paidBottles + offer.freeBottles === 1 ? "bottle" : "bottles"} total):{" "}
              {formatNaira(offer.priceNgn)}
            </li>
          ))}
        </ul>
        <p>All listed packages include FREE nationwide delivery.</p>

        <h2>Placing and confirming an order</h2>
        <p>
          Choosing Continue to WhatsApp opens a message with your selected
          package and contact and delivery details for you to review. The request
          is sent only if you tap Send in WhatsApp. It is not an order
          confirmation. Our team will confirm package availability, delivery
          arrangements, and payment instructions in the conversation. This
          website does not take payment.
        </p>
        <p>
          Please provide accurate contact and delivery information. To change or
          cancel an order request, contact us before the order is confirmed.
        </p>

        <h2>Health information</h2>
        <p>
          Website content is general information, not medical advice, diagnosis,
          or treatment. Clevira is not represented here as a cure for any
          condition. Follow the product&apos;s official label and consult a
          qualified healthcare professional for personal health decisions,
          especially for severe, worsening, or persistent symptoms.
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
