import { ArrowDown, ArrowRight, Check, Leaf, MessageCircle, ShieldCheck, Sprout, Truck } from "lucide-react";
import Image from "next/image";
import { LeadForm } from "@/components/lead-form";
import { SiteHeader } from "@/components/site-header";
import { ScrollReveal } from "@/components/scroll-reveal";
import { StickyOrderButton } from "@/components/sticky-order-button";
import { createWhatsappHref } from "@/lib/whatsapp";
import Link from "next/link";

const whatsappHref = createWhatsappHref("Hello, I need clearer information about bacterial infection symptoms and available next steps.");
const orderWhatsappHref = createWhatsappHref("Hello Clevira, I would like to place an order request. Please send me the available packages, price, delivery information, and payment instructions.");
const introBackgroundImages = [
  "/images/discomfort-man.jpg",
  "/images/discomfort-woman.jpg",
  "/images/discomfort-man-2.jpg",
];
const healthExampleImages = [
  { src: "/images/health-example-oral.jpg", alt: "Close-up of a tongue with a visible coating", width: 768, height: 998 },
  { src: "/images/health-example-skin.jpg", alt: "Close-up of skin with visible spots", width: 677, height: 1200 },
  { src: "/images/health-example-arm.jpg", alt: "Person gently holding their arm", width: 275, height: 183 },
  { src: "/images/health-example-textured-skin.jpg", alt: "Close-up of skin with a textured appearance", width: 480, height: 359 },
  { src: "/images/health-example-collage.png", alt: "Collage of close-up photos of skin and body areas", width: 574, height: 491 },
  { src: "/images/health-example-discomfort.jpg", alt: "Person sitting while holding their lower back", width: 612, height: 408 },
  { src: "/images/health-example-legs.jpeg", alt: "Close-up of legs with visible skin discoloration", width: 768, height: 960 },
];
export default function Home() {
  return <>
    <div className="announcement"><span className="announcement-dot" aria-hidden="true" /> When symptoms keep interrupting your life, clarity matters <a href="#about" className="announcement-link">Find a clearer next step <ArrowRight size={13} aria-hidden="true" /></a></div>
    <SiteHeader whatsappHref={whatsappHref} />
    <main className="min-h-screen">
      <section className="hero section-shell" id="home">
        <div className="hero-copy"><p className="eyebrow"><span /> THE FINAL ANSWER IS HERE</p><h1>STRUGGLING WITH WARTS,<span>GONORRHOEA, CHLAMYDIA, STAPHYLOCOCCUS, HERPES, SYPHILIS OR URINARY TRACT INFECTIONS?</span></h1><p className="hero-description">Are you not tired of Doctors and people pushing you from one solution to another?. Symptoms can have different causes, so Stop wasting money on Antibiotics they won’t cure your infection and permanently get rid of embarassing infections.</p><div className="regulatory-badge"><ShieldCheck size={18} aria-hidden="true" /><strong>100% NAFDAC APPROVED</strong></div></div>
        <figure className="hero-visual"><div className="hero-orbit hero-orbit-one" aria-hidden="true" /><div className="hero-orbit hero-orbit-two" aria-hidden="true" /><div className="hero-botanical hero-botanical-one" aria-hidden="true" /><div className="hero-botanical hero-botanical-two" aria-hidden="true" /><div className="hero-image-frame"><div className="hero-photo-wrap"><Image src="/images/clevira-bottle.png" alt="Clevira Herbal Capsules bottle" fill sizes="(max-width: 720px) 90vw, (max-width: 1200px) 46vw, 560px" loading="eager" className="hero-product-image" /></div></div></figure>
        <div className="hero-actions"><a className="button button-primary" href="#register" data-track="cta_buy_now">SEE PACKAGES <ArrowRight size={17} aria-hidden="true" /></a><a className="button button-secondary" href={whatsappHref} target="_blank" rel="noreferrer" data-track="cta_whatsapp"><MessageCircle size={17} aria-hidden="true" /> TALK TO OUR TEAM</a></div><p className="hero-footnote"><ShieldCheck size={15} aria-hidden="true" /> Don&apos;t waste money guessing. Get the facts before you decide.</p><a className="scroll-cue" href="#about" aria-label="Scroll to learn more"><ArrowDown size={16} aria-hidden="true" /></a>
      </section>
      <section className="patient-story-section" id="patient-story">
        <div className="section-shell patient-story-grid">
          <figure className="patient-story-media">
            <Image src="/images/patient-story.jpg" alt="Mr. Chidi Ndibuisi holding Clevira Herbal Capsules" fill sizes="(max-width: 720px) 100vw, 46vw" className="patient-story-image" />
            <figcaption>Mr. Chidi Ndibuisi</figcaption>
          </figure>
          <article className="patient-story-copy">
            <p className="eyebrow"><span /> MR. CHIDI NDIBUISI&apos;S STORY</p>
            <h2>I was tired of pretending<br /><em>everything was fine.</em></h2>
            <p className="patient-story-lead">For months, I didn&apos;t feel like myself—and the worst part was acting normal when I felt anything but.</p>
            <p>It wasn&apos;t just the physical discomfort showing up at the worst possible times. It was the mental weight sitting behind my eyes every single day. The quiet dread when symptoms flared up again. The embarrassment of having a problem that felt too personal, too awkward, or too messy to bring up casually.</p>
            <p>You start changing small habits without even realizing it. You get quiet in rooms where you used to laugh easily. When someone close asks, &quot;Are you okay?&quot; you say, &quot;Yeah, just tired,&quot; because explaining what&apos;s really going on feels exhausting.</p>
            <p>Like a lot of people, I tried patching things up on the fly—a quick fix here, a random suggestion there, money spent out of frustration and hope. Guessing with your body is draining. Every unknown symptom makes your mind race to the worst conclusion.</p>
            <p className="patient-story-highlight">That was how I came across <strong>Clevira Herbal Capsules</strong>. Instead of treating it like a one-day gamble, I committed to taking it consistently as herbal support while paying closer attention to my body and daily habits. Over time, the constant cycle of nagging discomfort and second-guessing finally started to ease up. For the first time in months, I wasn&apos;t walking around on edge, snapping at people I care about, or hiding behind excuses just to get through the day.</p>
            <p>Nobody should have to carry quiet discomfort in secrecy or feel ashamed asking real questions about their health. You don&apos;t need shame or endless guesswork—you need clarity, consistency, and support that helps you make a more informed next step.</p>
            <div className="patient-story-footer"><span>Shared by Mr. Chidi Ndibuisi</span><div className="patient-story-actions"><a className="button button-primary patient-story-order" href={orderWhatsappHref} target="_blank" rel="noreferrer" data-track="cta_buy_now">ORDER NOW <ArrowRight size={16} aria-hidden="true" /></a><a className="text-link" href="#register">Explore Clevira <ArrowRight size={16} aria-hidden="true" /></a></div></div>
          </article>
        </div>
      </section>
      <span id="patient-story-end" className="scroll-marker" aria-hidden="true" />
      <section className="symptom-cycle-section" id="symptoms">
        <div className="section-shell">
          <div className="symptom-cycle-heading">
            <div><p className="eyebrow"><span /> 02 / SYMPTOM &amp; CYCLE RECOGNITION</p><h2>DON&apos;T WAIT UNTIL<br /><em>YOUR INFECTIONS GET TO THIS LEVEL.</em></h2></div>
            <p>It&apos;s not only the symptom. It&apos;s the interruptions, the worry, and the exhausting effort of trying one temporary fix after another while life keeps moving around you. These signs can have different causes, so noticing patterns is a reason to seek clear medical guidance.</p>
          </div>
          <figure className="symptom-feature-media">
            <Image src="/images/symptom-itching-irritation.jpg" alt="Guide to intimate health and private-part itching and discomfort" fill sizes="(max-width: 720px) 100vw, 1192px" className="symptom-feature-image" />
            <figcaption>Itching and irritation can be difficult to talk about. Understanding the signals is a useful first step.</figcaption>
          </figure>
          <div className="symptom-image-grid">
            <ScrollReveal><figure className="symptom-image-card"><Image src="/images/symptom-discharge.jpg" alt="Illustrated guide showing unusual discharge symptoms" fill sizes="(max-width: 720px) 100vw, 1192px" className="symptom-card-image" /><figcaption><strong>Unusual discharge?</strong><span>Changes in color or texture, unusual odor, discomfort, or recurring shifts are worth paying attention to.</span></figcaption></figure></ScrollReveal>
            <ScrollReveal><figure className="symptom-image-card"><Image src="/images/symptom-pelvic-ache.jpg" alt="Illustrated guide showing recurring lower pelvic ache" fill sizes="(max-width: 720px) 100vw, 1192px" className="symptom-card-image" /><figcaption><strong>Why does that ache keep coming back?</strong><span>Lower abdominal ache, pelvic pressure, discomfort during daily routines, and recurring flare-ups deserve clarity.</span></figcaption></figure></ScrollReveal>
            <ScrollReveal><figure className="symptom-image-card"><Image src="/images/symptom-conception-cycle.jpg" alt="Illustrated guide about difficulty conceiving, cycle changes, and underlying discomfort" fill sizes="(max-width: 720px) 100vw, 1192px" className="symptom-card-image" /><figcaption><strong>Waiting and wondering?</strong><span>Difficulty conceiving, shifting cycles, underlying discomfort, and emotional strain deserve compassionate, qualified support.</span></figcaption></figure></ScrollReveal>
            <ScrollReveal><figure className="symptom-image-card"><Image src="/images/symptom-urine-changes.jpg" alt="Illustrated guide about changes in urine appearance and urinary urgency" fill sizes="(max-width: 720px) 100vw, 1192px" className="symptom-card-image" /><figcaption><strong>When urine looks different</strong><span>Cloudiness, unusual color, smell changes, frequent urination, or sudden urgency are signals worth checking.</span></figcaption></figure></ScrollReveal>
          </div>
          <div className="cycle-strip"><div className="cycle-label"><span>THE CYCLE</span><strong>Temporary relief<br />isn&apos;t the same as clarity.</strong></div><div className="cycle-steps"><span>Discomfort</span><i aria-hidden="true">→</i><span>Quick fix</span><i aria-hidden="true">→</i><span>Short relief</span><i aria-hidden="true">→</i><span>Flare-up again</span><i aria-hidden="true">↺</i></div></div>
        </div>
      </section>
      <section className="health-gallery-section" aria-labelledby="health-gallery-heading">
        <div className="section-shell">
          <div className="health-gallery-heading">
            <div>
              <p className="eyebrow"><span /> DON’T WAIT UNTIL YOUR INFECTIONS GET TO THIS LEVEL</p>
              <h2 id="health-gallery-heading"><span aria-hidden="true">⏳</span> Don&apos;t ignore visible changes</h2>
            </div>
          </div>
          <div className="health-gallery-grid">
            {healthExampleImages.map((image) => (
              <figure className="health-gallery-item" key={image.src}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 720px) 50vw, (max-width: 1000px) 50vw, 33vw"
                  className="health-gallery-image"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="testimonials-section" id="testimonials">
        <div className="section-shell">
          <div className="testimonials-heading"><div><p className="eyebrow"><span /> 03 / CUSTOMER EXPERIENCES</p><h2>When someone finally says,<br /><em>&quot;I feel like myself again.&quot;</em></h2></div></div>
          <div className="testimonial-stack">
            <ScrollReveal><figure className="testimonial-card"><Image src="/images/testimonial-kunle.jpg" alt="WhatsApp conversation from a customer named Kunle about his Clevira experience" fill sizes="(max-width: 720px) 100vw, 920px" className="testimonial-image" /></figure></ScrollReveal>
            <ScrollReveal><figure className="testimonial-card"><Image src="/images/testimonial-tunde.jpg" alt="WhatsApp conversation from a customer named Tunde about her Clevira experience" fill sizes="(max-width: 720px) 100vw, 920px" className="testimonial-image" /></figure></ScrollReveal>
            <ScrollReveal><figure className="testimonial-card"><Image src="/images/testimonial-lab-history.jpg" alt="WhatsApp conversation showing a customer's earlier test result and treatment history" fill sizes="(max-width: 720px) 100vw, 920px" className="testimonial-image" /></figure></ScrollReveal>
            <ScrollReveal><figure className="testimonial-card"><Image src="/images/testimonial-omolara.jpg" alt="WhatsApp conversation from a customer named Omolara about her Clevira experience" fill sizes="(max-width: 720px) 100vw, 920px" className="testimonial-image" /></figure></ScrollReveal>
            <ScrollReveal><figure className="testimonial-card"><Image src="/images/testimonial-tinu.jpg" alt="WhatsApp conversation from Madam Tinu sharing a personal health update" fill sizes="(max-width: 720px) 100vw, 920px" className="testimonial-image" /></figure></ScrollReveal>
            <ScrollReveal><figure className="testimonial-card"><Image src="/images/testimonial-tobi.jpg" alt="WhatsApp conversation from a customer named Tobi about his Clevira experience" fill sizes="(max-width: 720px) 100vw, 920px" className="testimonial-image" /></figure></ScrollReveal>
            <ScrollReveal><figure className="testimonial-card"><Image src="/images/testimonial-lab-followup.jpg" alt="WhatsApp conversation showing a customer's follow-up test result" fill sizes="(max-width: 720px) 100vw, 920px" className="testimonial-image" /></figure></ScrollReveal>
          </div>
        </div>
      </section>
      <section className="transparency-section" id="ingredients">
        <div className="section-shell">
          <div className="transparency-heading"><div><p className="eyebrow"><span /> 04 / MEET CLEVIRA</p><h2>Meet Clevira<br /><em>Herbal Capsules.</em></h2><p className="product-intro-copy">A considered herbal capsule experience built around consistency, clear product information, and a daily routine you can understand.</p></div></div>
          <figure className="product-intro-showcase"><Image src="/images/clevira-bottle.png" alt="Clevira Herbal Capsules bottle" fill sizes="(max-width: 720px) 90vw, 620px" className="product-intro-image" /></figure>
          <article className="infection-truth-panel">
            <div className="infection-truth-heading">
              <p className="eyebrow"><span /> WHAT PERSISTENT SYMPTOMS CAN MEAN</p>
              <h3>The truth about<br /><em>chronic infection symptoms.</em></h3>
              <figure className="infection-truth-media">
                <Image src="/images/male-figure-with-throat-pain.jpg" alt="Illustration of a man experiencing throat pain with a microorganism in the background" fill sizes="(max-width: 720px) 100vw, 720px" className="infection-truth-image" />
              </figure>
            </div>
            <div className="infection-truth-copy">
                <p className="infection-truth-lead">Many infections start with signs that are easy to dismiss—a change in discharge, irritation, urinary discomfort, a recurring ache, or a skin change that keeps returning.</p>
                <p>When symptoms are left unchecked, the underlying problem can worsen or spread. But symptoms alone cannot prove what is causing them: infections, irritation, allergies, and other health conditions can look similar. Testing and qualified medical guidance help you choose the right next step.</p>
                <h4>Why antibiotics and creams may not solve recurring symptoms long-term:</h4>
                <div className="infection-truth-points">
                  <div><strong>The treatment must match the cause</strong><span>Antibiotics work against certain bacterial infections, not viral or fungal conditions, and creams are not appropriate for every symptom.</span></div>
                  <div><strong>Symptoms can return</strong><span>If the diagnosis is unclear or treatment is not completed as directed, symptoms may continue or recur.</span></div>
                  <div><strong>Unnecessary treatment has risks</strong><span>Medicines can cause side effects, and antibiotics can temporarily alter normal gut bacteria.</span></div>
                  <div><strong>Resistance makes care harder</strong><span>Inappropriate antibiotic use can contribute to resistant bacteria, which is why recurring symptoms deserve reassessment.</span></div>
                </div>
                <p className="infection-truth-closing"><strong>That&apos;s why recurring symptoms can feel like years of cycling through appointments, prescriptions, and uncertainty.</strong> Clear testing and appropriate care can help replace false hope and guesswork with a more informed next step.</p>
            </div>
          </article>
        </div>
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
      <section className="register-section" id="register"><div className="section-shell register-grid"><div className="register-copy"><p className="eyebrow"><span /> CLEVIRA PACKAGES</p><h2>Choose your<br /><em>package.</em></h2><p>Select a package to see the price and total bottles included.</p><div className="register-points"><span><Check size={15} aria-hidden="true" /> Clear package and price information</span><span><Check size={15} aria-hidden="true" /> FREE nationwide delivery</span></div><a className="register-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer" data-track="register_whatsapp"><MessageCircle size={17} aria-hidden="true" /> Questions? Chat on WhatsApp <ArrowRight size={16} aria-hidden="true" /></a></div><div className="form-card"><div className="form-card-heading"><span className="form-step">YOUR ORDER</span><span className="form-icon"><Leaf size={19} aria-hidden="true" /></span></div><h3>Buy Clevira.</h3><div className="delivery-note"><Truck size={16} aria-hidden="true" /><span>FREE Nationwide Delivery</span></div><p>Choose a package, add your delivery details and send an order request to our team.</p><LeadForm /></div></div></section>
    </main>
    <StickyOrderButton href={orderWhatsappHref} />
    <footer className="site-footer" id="footer"><div className="section-shell footer-main"><div className="footer-brand"><a className="brand footer-logo" href="#home"><span className="brand-symbol"><Sprout size={18} aria-hidden="true" /></span><span className="brand-name">CLEVIRA<span>HERBAL WELLNESS</span></span></a><p>Clearer information.<br />A more confident next step.</p></div><div className="footer-company"><span className="footer-label">A PRODUCT BY</span><strong>Trendora Global Ltd.</strong><span>Clevira Herbal Capsules.</span></div><nav className="footer-links" aria-label="Legal"><span className="footer-label">INFORMATION</span><Link href="/privacy">Privacy notice</Link><Link href="/terms">Order terms</Link><a href="#faq">Frequently asked questions</a></nav><div className="footer-contact"><span className="footer-label">SAY HELLO</span><a href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={16} aria-hidden="true" /> WhatsApp</a><a className="footer-cta" href="#register">Buy Clevira <ArrowRight size={15} aria-hidden="true" /></a></div></div><div className="section-shell footer-bottom"><span>© {new Date().getFullYear()} Trendora Global Ltd. All rights reserved.</span><span>Made with care, shared with clarity.</span></div></footer>
  </>;
}
