"use client";

import { Menu, MessageCircle, Sprout, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type SiteHeaderProps = {
  whatsappHref: string;
  homeHref?: string;
};

export function SiteHeader({ whatsappHref, homeHref = "" }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const sectionHref = (section: string) => `${homeHref}#${section}`;

  return (
    <header className="site-header">
      <div className="section-shell header-inner">
        <a className="brand" href={sectionHref("home")} onClick={closeMenu} aria-label="Clevira home">
          <span className="brand-symbol"><Sprout size={19} aria-hidden="true" /></span>
          <span className="brand-name">CLEVIRA<span>HERBAL WELLNESS</span></span>
        </a>
        <nav className={`main-nav${isOpen ? " nav-open" : ""}`} id="main-navigation" aria-label="Main navigation">
          <a href={sectionHref("about")} onClick={closeMenu}>Our approach</a>
          <Link href="/bacteria" onClick={closeMenu}>Bacteria basics</Link>
          <a href={sectionHref("faq")} onClick={closeMenu}>FAQs</a>
          <a className="nav-mobile-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer" onClick={closeMenu}>
            <MessageCircle size={16} aria-hidden="true" /> Chat on WhatsApp
          </a>
        </nav>
        <div className="header-actions">
          <a className="header-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer">
            <MessageCircle size={16} aria-hidden="true" /> WhatsApp
          </a>
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}
