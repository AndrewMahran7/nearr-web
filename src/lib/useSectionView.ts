"use client";

import { useEffect, useRef } from "react";
import { track, type AnalyticsEvent } from "./analytics";

/** Fires an analytics event once, the first time the section scrolls into view. */
export function useSectionView<T extends HTMLElement>(event: AnalyticsEvent) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track(event);
          observer.unobserve(node);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [event]);

  return ref;
}
