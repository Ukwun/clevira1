import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { createWhatsappHref } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Understanding bacteria | Clevira",
  description:
    "Learn how bacteria can be described by shape and laboratory classification. This general information is not a diagnosis or treatment recommendation.",
};

const whatsappHref = createWhatsappHref(
  "Hello, I would like to know more about Clevira.",
);

export default function BacteriaPage() {
  return (
    <>
      <div className="announcement">
        <span className="announcement-dot" aria-hidden="true" />
        Clear information for more confident next steps
        <Link href="/#about" className="announcement-link">
          Back to our approach <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>
      <SiteHeader whatsappHref={whatsappHref} homeHref="/" />
      <main>
        <section className="bacteria-section bacteria-page-section">
          <div className="section-shell">
            <Link className="bacteria-back-link" href="/#about">
              <ArrowLeft size={15} aria-hidden="true" />
              Back to understanding
            </Link>
            <div className="bacteria-heading">
              <div>
                <p className="eyebrow"><span /> BACTERIA BASICS</p>
                <h1>Different ways to<br /><em>describe bacteria.</em></h1>
              </div>
              <p>
                Bacteria can be described by different features. These general
                classifications can help explain how bacteria are grouped, but
                they cannot diagnose an infection. A bacterium can fit more
                than one description.
              </p>
            </div>
            <div className="bacteria-grid">
              <article className="bacteria-card">
                <span className="bacteria-card-number">01</span>
                <h2>Cocci</h2>
                <p>
                  Round or spherical bacteria. They may appear singly or in
                  pairs, chains, or clusters.
                </p>
              </article>
              <article className="bacteria-card">
                <span className="bacteria-card-number">02</span>
                <h2>Bacilli</h2>
                <p>
                  Rod-shaped bacteria. Their size and arrangement can vary
                  between species.
                </p>
              </article>
              <article className="bacteria-card">
                <span className="bacteria-card-number">03</span>
                <h2>Spiral forms</h2>
                <p>
                  Curved or helical bacteria. Their shape is one feature used
                  to describe them.
                </p>
              </article>
              <article className="bacteria-card">
                <span className="bacteria-card-number">04</span>
                <h2>Gram-positive</h2>
                <p>
                  Bacteria that retain a particular dye in a laboratory Gram
                  stain, reflecting aspects of their cell-wall structure.
                </p>
              </article>
              <article className="bacteria-card">
                <span className="bacteria-card-number">05</span>
                <h2>Gram-negative</h2>
                <p>
                  Bacteria that respond differently to Gram staining and have
                  an additional outer membrane.
                </p>
              </article>
            </div>
            <div className="bacteria-note">
              <p>
                These categories provide general background, not a diagnosis
                or treatment recommendation. A qualified healthcare
                professional can assess symptoms and provide appropriate
                guidance. Learn a little about each one, and speak with our
                team if you want to know more about Clevira.
              </p>
              <a
                className="text-link"
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                data-track="cta_whatsapp"
              >
                <MessageCircle size={16} aria-hidden="true" />
                Speak with our team
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
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
