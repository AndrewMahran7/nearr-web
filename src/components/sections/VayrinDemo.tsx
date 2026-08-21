"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { VayrinAvatar } from "@/components/ui/VayrinAvatar";
import { track, ANALYTICS_EVENTS } from "@/lib/analytics";

type Clue = "visual" | "caption" | "audio" | "location";

type Scenario = {
  id: string;
  chip: string;
  category: string;
  clues: Clue[];
  image: string;
  alt: string;
  objectPosition?: string;
} & (
  | { place: string; note: string; multiPlaces?: undefined }
  | { multiPlaces: string[]; place?: undefined; note?: undefined }
);

const SCENARIOS: Scenario[] = [
  {
    id: "cliff",
    chip: "Hidden cliff jump",
    category: "Outdoors · Cliff jump",
    place: "A sandstone lake cove",
    note: "The cliff and water are visible on screen",
    clues: ["visual", "audio"],
    image: "/images/marketing/vayrin-hidden-cliff-jump.webp",
    alt: "Cliff jump over a sandstone lake cove",
    objectPosition: "50% 56%",
  },
  {
    id: "beach",
    chip: "Unnamed beach",
    category: "Outdoors · Beach",
    place: "A secluded beach cove",
    note: "The beach is not named in the post",
    clues: ["visual", "caption"],
    image: "/images/marketing/vayrin-unnamed-beach.webp",
    alt: "Secluded tropical beach surrounded by rocky greenery",
    objectPosition: "58% 55%",
  },
  {
    id: "restaurant",
    chip: "Restaurant, no name",
    category: "Food & drink · Restaurant",
    place: "A neighborhood restaurant",
    note: "The restaurant is not named on screen",
    clues: ["visual", "audio"],
    image: "/images/marketing/vayrin-restaurant-no-name.webp",
    alt: "Candlelit restaurant with dinner served at an outdoor table",
    objectPosition: "67% 58%",
  },
  {
    id: "hotel",
    chip: "Hotel in the background",
    category: "Stays · Hotel",
    place: "A coastal resort hotel",
    note: "The hotel appears behind the pool",
    clues: ["visual", "location"],
    image: "/images/marketing/vayrin-hotel-background.webp",
    alt: "Coastal resort hotel behind an infinity pool at sunset",
    objectPosition: "50% 48%",
  },
  {
    id: "travel",
    chip: "Travel destination",
    category: "Travel · City",
    place: "A clifftop coastal town",
    note: "The coastline is the main location clue",
    clues: ["caption", "audio", "location"],
    image: "/images/marketing/vayrin-travel-destination.webp",
    alt: "Clifftop coastal town overlooking the sea at sunset",
    objectPosition: "66% 52%",
  },
  {
    id: "itinerary",
    chip: "Weekend recap",
    category: "Trip itinerary",
    multiPlaces: [
      "Coastal surf lookout",
      "Ramen stop",
      "Mountain sunset trail",
      "Campfire dinner",
    ],
    clues: ["visual", "caption", "audio"],
    image: "/images/marketing/vayrin-weekend-recap.webp",
    alt: "Weekend recap collage with surfing, ramen, a mountain hike, and dinners with friends",
  },
];

const CLUE_LABEL: Record<Clue, string> = {
  visual: "Visual clue",
  caption: "Caption clue",
  audio: "Audio clue",
  location: "Location clue",
};

export function VayrinDemo() {
  const [activeId, setActiveId] = useState(SCENARIOS[0].id);
  const [trackedId, setTrackedId] = useState(activeId);
  const [phase, setPhase] = useState<"analyzing" | "result">("analyzing");
  const active = SCENARIOS.find((s) => s.id === activeId) ?? SCENARIOS[0];

  // Reset to "analyzing" as soon as the selected scenario changes. Adjusting
  // state during render (rather than in an effect) avoids an extra
  // effect-triggered render pass for what's just a derived reset.
  if (activeId !== trackedId) {
    setTrackedId(activeId);
    setPhase("analyzing");
  }

  useEffect(() => {
    if (phase !== "analyzing") return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const id = window.setTimeout(
      () => setPhase("result"),
      reducedMotion ? 0 : 1300,
    );
    return () => window.clearTimeout(id);
  }, [phase]);

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        className="flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Example scenarios"
      >
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={s.id === activeId}
            onClick={() => {
              setActiveId(s.id);
              track(ANALYTICS_EVENTS.VAYRIN_DEMO_INTERACTED, { scenario: s.id });
            }}
            className={`min-h-11 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
              s.id === activeId
                ? "border-orange bg-orange text-near-black"
                : "border-near-black-border bg-transparent text-cream-on-dark-soft hover:border-cream-on-dark-soft/60 hover:text-cream-on-dark"
            }`}
          >
            {s.chip}
          </button>
        ))}
      </div>

      <div className="grid w-full max-w-3xl gap-6 rounded-[1.75rem] border border-near-black-border bg-near-black-elevated p-5 sm:grid-cols-[1fr_1.1fr] sm:p-8">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-near-black sm:aspect-auto sm:h-full">
          {SCENARIOS.map((scenario) => {
            const isActive = scenario.id === activeId;
            return (
              <Image
                key={scenario.id}
                src={scenario.image}
                alt={isActive ? scenario.alt : ""}
                aria-hidden={!isActive}
                fill
                sizes="(max-width: 639px) calc(100vw - 80px), 340px"
                loading="lazy"
                className={`object-cover transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                style={{ objectPosition: scenario.objectPosition ?? "center" }}
              />
            );
          })}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          <VayrinAvatar
            state={phase === "analyzing" ? "searching" : "found"}
            className={`absolute right-3 bottom-3 h-11 w-11 drop-shadow-lg transition-transform duration-300 ${
              phase === "analyzing" ? "animate-pulse" : ""
            }`}
          />
        </div>

        <div className="flex flex-col justify-center gap-5">
          <div className="flex flex-wrap gap-2">
            {(["visual", "caption", "audio", "location"] as Clue[]).map(
              (clue) => {
                const isActive = active.clues.includes(clue);
                return (
                  <span
                    key={clue}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-500 ${
                      isActive
                        ? "border-orange/40 bg-orange/15 text-orange-bright"
                        : "border-near-black-border text-cream-on-dark-soft/70"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isActive ? "bg-orange" : "bg-cream-on-dark-soft/30"
                      }`}
                    />
                    {CLUE_LABEL[clue]}
                  </span>
                );
              },
            )}
          </div>

          <div className="min-h-[92px]" aria-live="polite">
            {phase === "analyzing" ? (
              <div className="flex items-center gap-3">
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <span className="absolute h-full w-full animate-spin rounded-full border-2 border-orange/25 border-t-orange" />
                </span>
                <p className="text-sm font-medium text-cream-on-dark-soft">
                  Vayrin is looking&hellip;
                </p>
              </div>
            ) : active.multiPlaces ? (
              <div className="animate-fade-up">
                <p className="text-xs font-semibold tracking-wide text-orange-bright uppercase">
                  Vayrin found {active.multiPlaces.length} places
                </p>
                <ul className="mt-2.5 flex flex-col gap-1.5">
                  {active.multiPlaces.map((place) => (
                    <li
                      key={place}
                      className="flex items-center gap-2 text-sm text-cream-on-dark"
                    >
                      <CheckIcon className="h-3.5 w-3.5 shrink-0 text-success" />
                      {place}
                    </li>
                  ))}
                </ul>
                <span className="mt-3 inline-flex w-fit items-center rounded-full bg-orange px-4 py-2 text-xs font-semibold text-near-black">
                  Save all to map
                </span>
              </div>
            ) : (
              <div className="animate-fade-up">
                <p className="text-xs font-semibold tracking-wide text-orange-bright uppercase">
                  Likely match
                </p>
                <p className="mt-1.5 text-lg font-semibold text-cream-on-dark">
                  {active.place}
                </p>
                <p className="mt-1 text-sm text-cream-on-dark-soft">
                  {active.category} &middot; {active.note}
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
