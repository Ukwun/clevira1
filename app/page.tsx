import { ArrowDown, ArrowRight, Check, CircleHelp, Leaf, MessageCircle, ShieldCheck, Sprout, Truck } from "lucide-react";
import Image from "next/image";
import { LeadForm } from "@/components/lead-form";
import { SiteHeader } from "@/components/site-header";
import { createWhatsappHref } from "@/lib/whatsapp";
import Link from "next/link";

const whatsappHref = createWhatsappHref("Hello, I need clearer information about bacterial infection symptoms and available next steps.");
const faqs = [
  { question: "What should I do if symptoms keep returning?", answer: "Do not keep guessing or repeatedly self-treating. Persistent, worsening or unusual symptoms deserve assessment by a qualified healthcare professional." },
  { question: "Can a herbal product cure a bacterial infection?", answer: "No product should be presented as a guaranteed cure without appropriate evidence and authorization. The cause and severity of an infection matter, so seek professional advice for personal medical decisions." },
  { question: "What information should I check before taking anything?", answer: "Look for the complete ingredient list, directions, warnings, manufacturer details and applicable registration information. If any are missing, ask before using the product." },
  { question: "What happens when I choose Buy Now?", answer: "The form opens a prefilled WhatsApp message for you to review. Your request is sent to our team only after you tap Send in WhatsApp. We will confirm availability, delivery, and payment instructions there. This website does not take payment." },
];
const introBackgroundImages = [
  "/images/discomfort-man.jpg",
  "/images/discomfort-woman.jpg",
  "/images/discomfort-man-2.jpg",
];

export default function Home() {
  return <>
    <div className="announcement"><span className="announcement-dot" aria-hidden="true" /> When symptoms keep interrupting your life, clarity matters <a href="#about" className="announcement-link">Find a clearer next step <ArrowRight size={13} aria-hidden="true" /></a></div>
    <SiteHeader whatsappHref={whatsappHref} />
    <main className="min-h-screen">
      <section className="hero section-shell" id="home">
        <div className="hero-copy"><p className="eyebrow"><span /> WHEN YOUR BODY NEEDS ANSWERS</p><h1>Don&apos;t ignore<span>what your body is telling you.</span></h1><p className="hero-description">Repeated discomfort, worry about infection and not knowing what to trust can leave you feeling stuck. Get clearer information, understand your options and take the next step with confidence.</p></div>
        <figure className="hero-visual"><div className="hero-orbit hero-orbit-one" aria-hidden="true" /><div className="hero-orbit hero-orbit-two" aria-hidden="true" /><div className="hero-botanical hero-botanical-one" aria-hidden="true" /><div className="hero-botanical hero-botanical-two" aria-hidden="true" /><div className="hero-image-frame"><div className="hero-photo-wrap"><Image src="/images/clevira-bottle.png" alt="Clevira Herbal Capsules bottle" fill sizes="(max-width: 720px) 90vw, (max-width: 1200px) 46vw, 560px" loading="eager" className="hero-product-image" /></div></div></figure>
        <div className="hero-actions"><a className="button button-primary" href="#register" data-track="cta_buy_now">BUY NOW <ArrowRight size={17} aria-hidden="true" /></a><a className="button button-secondary" href={whatsappHref} target="_blank" rel="noreferrer" data-track="cta_whatsapp"><MessageCircle size={17} aria-hidden="true" /> TALK TO OUR TEAM</a></div><p className="hero-footnote"><ShieldCheck size={15} aria-hidden="true" /> No pressure. No miracle promises. Just clearer next steps.</p><a className="scroll-cue" href="#about" aria-label="Scroll to learn more"><ArrowDown size={16} aria-hidden="true" /></a>
      </section>
      <section className="intro-section" id="about">
        <div className="intro-media-background" aria-hidden="true">
          <div className="intro-backdrop intro-backdrop-image-1" />
          <div className="intro-backdrop intro-backdrop-image-2" />
          <div className="intro-backdrop intro-backdrop-image-3" />
          <video
            className="intro-backdrop intro-backdrop-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={introBackgroundImages[0]}
          >
            <source src="/images/discomfort-loop.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="section-shell intro-grid">
          <div className="intro-overline"><span className="eyebrow">01 / A CLEARER PERSPECTIVE</span><div className="intro-icon"><Leaf size={21} aria-hidden="true" /></div></div>
          <div className="intro-content"><h2>When discomfort returns,<br /><em>you deserve clarity.</em></h2><p>Understanding what you&apos;re dealing with is an important first step.</p><p>Bacteria come in different forms and classifications. Understanding the differences can help you become more informed about bacterial infections and the importance of getting appropriate medical guidance.</p><Link className="text-link" href="/bacteria">Understand the problem first <ArrowRight size={16} aria-hidden="true" /></Link></div>
          <div className="intro-aside"><span className="aside-number">01</span><span className="aside-copy">Information for real<br />health decisions.</span></div>
        </div>
      </section>
      <section className="trust-section"><div className="section-shell trust-grid"><div className="trust-mark"><ShieldCheck size={25} aria-hidden="true" /></div><div><p className="eyebrow">RESPONSIBLE INFORMATION</p><h2>Accountability starts<br /><em>with transparency.</em></h2></div><div className="trust-copy"><p>When you are worried about a possible bacterial infection, clear information matters. <strong>Trendora Global Ltd.</strong> is committed to sharing product information responsibly.</p><p>No herbal product should be presented as a guaranteed cure. Symptoms that are severe, spreading or persistent need qualified care.</p><a className="text-link" href="#faq">Read the common questions <ArrowRight size={16} aria-hidden="true" /></a></div></div></section>
      <section className="register-section" id="register"><div className="section-shell register-grid"><div className="register-copy"><p className="eyebrow"><span /> CLEVIRA PACKAGES</p><h2>Choose your<br /><em>package.</em></h2><p>Select a package to see the price and total bottles included.</p><div className="register-points"><span><Check size={15} aria-hidden="true" /> Clear package and price information</span><span><Check size={15} aria-hidden="true" /> FREE nationwide delivery</span></div><a className="register-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer" data-track="register_whatsapp"><MessageCircle size={17} aria-hidden="true" /> Questions? Chat on WhatsApp <ArrowRight size={16} aria-hidden="true" /></a></div><div className="form-card"><div className="form-card-heading"><span className="form-step">YOUR ORDER</span><span className="form-icon"><Leaf size={19} aria-hidden="true" /></span></div><h3>Buy Clevira.</h3><div className="delivery-note"><Truck size={16} aria-hidden="true" /><span>FREE Nationwide Delivery</span></div><p>Choose a package, add your delivery details and send an order request to our team.</p><LeadForm /></div></div></section>
      <section className="faq-section section-shell" id="faq"><div className="faq-heading"><p className="eyebrow"><span /> 03 / GOOD TO KNOW</p><h2>A few things<br /><em>you might wonder.</em></h2><div className="faq-heading-note"><CircleHelp size={18} aria-hidden="true" /><span>Still have a question?<br /><a href={whatsappHref} target="_blank" rel="noreferrer" data-track="faq_whatsapp">Talk to our team</a></span></div></div><div className="faq-list">{faqs.map((faq, index) => <details className="faq-item" key={faq.question}><summary data-track="faq_toggle"><span className="faq-index">0{index + 1}</span><span>{faq.question}</span><span className="faq-toggle" aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div></section>
    </main>
    <footer className="site-footer" id="footer"><div className="section-shell footer-main"><div className="footer-brand"><a className="brand footer-logo" href="#home"><span className="brand-symbol"><Sprout size={18} aria-hidden="true" /></span><span className="brand-name">CLEVIRA<span>HERBAL WELLNESS</span></span></a><p>Clearer information.<br />A more confident next step.</p></div><div className="footer-company"><span className="footer-label">A PRODUCT BY</span><strong>Trendora Global Ltd.</strong><span>Clevira Herbal Capsules.</span></div><nav className="footer-links" aria-label="Legal"><span className="footer-label">INFORMATION</span><Link href="/privacy">Privacy notice</Link><Link href="/terms">Order terms</Link><a href="#faq">Frequently asked questions</a></nav><div className="footer-contact"><span className="footer-label">SAY HELLO</span><a href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={16} aria-hidden="true" /> WhatsApp</a><a className="footer-cta" href="#register">Buy Clevira <ArrowRight size={15} aria-hidden="true" /></a></div></div><div className="section-shell footer-bottom"><span>© {new Date().getFullYear()} Trendora Global Ltd. All rights reserved.</span><span>Made with care, shared with clarity.</span></div></footer>
  </>;
}
