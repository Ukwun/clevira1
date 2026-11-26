"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

type StickyOrderButtonProps = { href: string };

export function StickyOrderButton({ href }: StickyOrderButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const story = document.getElementById("patient-story");
    const storyEnd = document.getElementById("patient-story-end");
    if (!story || !storyEnd) return;

    let frame = 0;
    const updateVisibility = () => {
      frame = 0;
      const endPosition = storyEnd.getBoundingClientRect().top;
      const storyBottom = story.getBoundingClientRect().bottom;
      setIsVisible(endPosition <= 0 || storyBottom <= 0);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const observer = new IntersectionObserver(updateVisibility, { threshold: [0, 1] });
    observer.observe(storyEnd);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <a
      className={`sticky-order-button${isVisible ? " is-visible" : ""}`}
      href={href}
      target="_blank"
      rel="noreferrer"
      data-track="cta_buy_now"
      aria-label="Order Clevira now"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <MessageCircle size={18} aria-hidden="true" />
      <span>ORDER NOW</span>
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}
