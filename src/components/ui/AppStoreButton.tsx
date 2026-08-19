"use client";

import { APP_STORE_URL } from "@/lib/config";
import { track, ANALYTICS_EVENTS } from "@/lib/analytics";
import { AppleGlyph } from "./AppleGlyph";

const TONES = {
  dark: {
    button: "bg-ink hover:bg-black",
    text: "text-cream",
    subtext: "text-cream/70",
  },
  accent: {
    button: "bg-orange hover:bg-orange-bright",
    text: "text-near-black",
    subtext: "text-near-black/90",
  },
} as const;

export function AppStoreButton({
  source,
  tone = "dark",
  className = "",
}: {
  /** Where on the page this CTA lives, for analytics (e.g. "hero", "final_cta"). */
  source: string;
  tone?: keyof typeof TONES;
  className?: string;
}) {
  const href = APP_STORE_URL ?? "#";
  const toneClasses = TONES[tone];

  return (
    <a
      href={href}
      onClick={(event) => {
        track(ANALYTICS_EVENTS.APP_STORE_CTA_CLICKED, { source });
        if (!APP_STORE_URL) event.preventDefault();
      }}
      aria-label="Download Nearr on the App Store"
      className={`group inline-flex items-center gap-3 rounded-2xl px-6 py-3.5 shadow-soft transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 ${toneClasses.button} ${toneClasses.text} ${className}`}
    >
      <AppleGlyph className="h-7 w-7 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={`text-[11px] tracking-wide ${toneClasses.subtext}`}>
          Download on the
        </span>
        <span className="text-xl font-semibold tracking-tight">
          App Store
        </span>
      </span>
    </a>
  );
}
