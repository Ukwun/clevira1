"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ScrollRevealProps = { children: ReactNode; className?: string };

export function ScrollReveal({ children, className = "" }: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    element.classList.add("is-ready");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add("is-visible");
        observer.unobserve(element);
      }
    }, { threshold: 0.18, rootMargin: "0px 0px -8%" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={elementRef} className={`scroll-reveal ${className}`}>{children}</div>;
}
