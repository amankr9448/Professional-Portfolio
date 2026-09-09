"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps children in a div that fades/slides in once it scrolls into view.
 * Pure IntersectionObserver + CSS transition (see .reveal in globals.css) --
 * deliberately not a library, to keep this static site's JS footprint small.
 */
export default function Reveal({
  children,
  delayMs = 0,
  className = "",
}: {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => el.classList.add("in-view"), delayMs);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
