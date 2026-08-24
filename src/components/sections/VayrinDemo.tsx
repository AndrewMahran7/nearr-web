"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { VayrinAvatar } from "@/components/ui/VayrinAvatar";
import { track, ANALYTICS_EVENTS } from "@/lib/analytics";

type Scenario = {
  id: string;
  chip: string;
  place: string;
  location: string;
  category: string;
  image: string;
  alt: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "mad-yolks",
    chip: "Mad Yolks",
    place: "Mad Yolks",
    location: "Santa Cruz, California",
    category: "Breakfast restaurant",
    image: "/images/demos/mad-yolks.webp",
    alt: "Frame from a public Instagram video showing a Mad Yolks breakfast sandwich",
  },
  {
    id: "seabright-deli",
    chip: "Seabright Deli",
    place: "Seabright Deli",
    location: "Santa Cruz, California",
    category: "Sandwich shop",
    image: "/images/demos/seabright-deli.webp",
    alt: "Frame from a public Instagram video filmed inside Seabright Deli",
  },
  {
    id: "baqba",
    chip: "Baqba",
    place: "Baqba Mexican Grill",
    location: "Montclair, California",
    category: "Mexican restaurant",
    image: "/images/demos/baqba-mexican-grill.webp",
    alt: "Frame from a public Instagram video showing a burrito at Baqba Mexican Grill",
  },
  {
    id: "famous-daves",
    chip: "Famous Dave's",
    place: "Famous Dave’s Bar-B-Que",
    location: "Long Beach, California",
    category: "Barbecue restaurant",
    image: "/images/demos/famous-daves-long-beach.webp",
    alt: "Frame from a public Instagram video showing barbecue nachos at Famous Dave's",
  },
  {
    id: "aptos-bbq",
    chip: "Aptos St. BBQ",
    place: "Aptos St. BBQ",
    location: "Aptos, California",
    category: "Barbecue restaurant",
    image: "/images/demos/aptos-st-bbq.webp",
    alt: "Frame from a public Instagram video showing a barbecue spread at Aptos St. BBQ",
  },
];

export function VayrinDemo() {
  const [activeId, setActiveId] = useState(SCENARIOS[0].id);
  const [phase, setPhase] = useState<"looking" | "found">("looking");
  const active =
    SCENARIOS.find((scenario) => scenario.id === activeId) ?? SCENARIOS[0];

  useEffect(() => {
    if (phase !== "looking") return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const id = window.setTimeout(
      () => setPhase("found"),
      reducedMotion ? 0 : 900,
    );
    return () => window.clearTimeout(id);
  }, [phase]);

  function selectScenario(scenario: Scenario) {
    setActiveId(scenario.id);
    setPhase("looking");
    track(ANALYTICS_EVENTS.VAYRIN_DEMO_INTERACTED, {
      scenario: scenario.id,
    });
  }

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div
        className="flex max-w-3xl flex-wrap justify-center gap-2"
        role="group"
        aria-label="Real place examples"
      >
        {SCENARIOS.map((scenario) => (
          <button
            key={scenario.id}
            type="button"
            aria-pressed={scenario.id === activeId}
            onClick={() => selectScenario(scenario)}
            className={`min-h-11 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${
              scenario.id === activeId
                ? "border-orange bg-orange text-near-black"
                : "border-near-black-border text-cream-on-dark-soft hover:border-cream-on-dark-soft/60 hover:text-cream-on-dark"
            }`}
          >
            {scenario.chip}
          </button>
        ))}
      </div>

      <div className="grid w-full max-w-4xl overflow-hidden rounded-[1.75rem] border border-near-black-border bg-near-black-elevated sm:grid-cols-[0.9fr_1.1fr]">
        <div className="relative aspect-[3/4] min-h-[360px] overflow-hidden bg-near-black sm:aspect-auto">
          {SCENARIOS.map((scenario) => {
            const isActive = scenario.id === activeId;
            return (
              <Image
                key={scenario.id}
                src={scenario.image}
                alt={isActive ? scenario.alt : ""}
                aria-hidden={!isActive}
                fill
                sizes="(max-width: 639px) calc(100vw - 48px), 390px"
                loading="lazy"
                className={`object-cover transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
            );
          })}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20" />
          <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            Source video
          </span>
          <VayrinAvatar
            state={phase === "looking" ? "searching" : "found"}
            className={`absolute right-4 bottom-4 h-12 w-12 drop-shadow-lg ${
              phase === "looking" ? "animate-pulse" : ""
            }`}
          />
        </div>

        <div className="flex min-h-[330px] flex-col justify-center p-7 sm:p-10">
          <p className="text-xs font-semibold tracking-[0.14em] text-orange-bright uppercase">
            Public Instagram video
          </p>

          <div className="mt-7" aria-live="polite">
            {phase === "looking" ? (
              <div className="flex items-center gap-3">
                <span
                  className="relative flex h-5 w-5 items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="absolute h-full w-full animate-spin rounded-full border-2 border-orange/25 border-t-orange" />
                </span>
                <div>
                  <p className="text-base font-semibold text-cream-on-dark">
                    I&apos;m looking&hellip;
                  </p>
                  <p className="mt-1 text-sm text-cream-on-dark-soft">
                    This usually takes a few seconds.
                  </p>
                </div>
              </div>
            ) : (
              <div className="animate-fade-up">
                <p className="text-sm font-semibold text-orange-bright">
                  Found it.
                </p>
                <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-cream-on-dark">
                  {active.place}
                </h3>
                <p className="mt-2 text-base text-cream-on-dark-soft">
                  {active.location}
                </p>
                <p className="mt-6 inline-flex rounded-full border border-near-black-border px-3 py-1.5 text-xs font-medium text-cream-on-dark-soft">
                  {active.category}
                </p>
                <p className="mt-6 flex items-center gap-2 text-sm font-medium text-cream-on-dark">
                  <CheckIcon className="h-4 w-4 text-success" />
                  Found from the video.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
