"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Adds `.is-visible` to the element once it scrolls into view, pairing with
 * the `.reveal` CSS primitive in globals.css.
 *
 * Content must never depend on JS running correctly to become visible, so
 * this hook — not CSS — is what puts the element into its "hidden, about
 * to animate in" state (`.reveal-armed`), and only once it has also armed
 * a fallback: reduced-motion users, and anyone whose IntersectionObserver
 * never fires for any reason, still see the content within 2s.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    node.classList.add("reveal-armed");

    const reveal = () => {
      node.classList.add("is-visible");
      observer.disconnect();
      window.clearTimeout(fallback);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { threshold },
    );
    observer.observe(node);

    // Safety net: if the observer never fires (fast-scroll edge cases,
    // an element taller than the viewport, etc.), don't leave real content
    // permanently invisible.
    const fallback = window.setTimeout(reveal, 2000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [threshold]);

  return ref;
}
