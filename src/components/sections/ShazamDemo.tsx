"use client";

import { useEffect, useState } from "react";

type Clue = "visual" | "caption" | "audio" | "location";

type Scenario = {
  id: string;
  chip: string;
  category: string;
  place: string;
  note: string;
  clues: Clue[];
  gradient: string;
  /** A second credible match, when one video/post shows more than one place. */
  alsoFound?: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "cliff",
    chip: "Hidden cliff jump",
    category: "Outdoors · Cliff jump",
    place: "Unnamed cliff, coastal trail",
    note: "No tags, no comments naming it",
    clues: ["visual", "audio"],
    gradient: "linear-gradient(160deg, #2b2622 0%, #6b5a45 40%, #a98a5c 70%, #e0c9a0 100%)",
  },
  {
    id: "beach",
    chip: "Unnamed beach",
    category: "Outdoors · Beach",
    place: "Hidden Cove Beach",
    note: "Not named in the caption",
    clues: ["visual", "caption"],
    gradient: "linear-gradient(160deg, #23343a 0%, #2f6b6b 40%, #5fa79a 70%, #cfe6c8 100%)",
  },
  {
    id: "restaurant",
    chip: "Restaurant, no name",
    category: "Food & drink · Restaurant",
    place: "Corner table spot, downtown",
    note: "Restaurant never named on screen",
    clues: ["visual", "audio"],
    gradient: "linear-gradient(160deg, #2e211a 0%, #6b3f2a 40%, #b06a3a 70%, #e8b478 100%)",
  },
  {
    id: "hotel",
    chip: "Hotel in the background",
    category: "Stays · Hotel",
    place: "Cliffside hotel, seen in the background",
    note: "Only on screen for 2 seconds",
    clues: ["visual", "location"],
    gradient: "linear-gradient(160deg, #1c2530 0%, #33465e 40%, #5d7a9c 70%, #cbdcec 100%)",
  },
  {
    id: "travel",
    chip: "Travel destination",
    category: "Travel · City",
    place: "Coastal town, somewhere south",
    note: "Caption just says “paradise”",
    clues: ["caption", "audio", "location"],
    gradient: "linear-gradient(160deg, #2e1f2a 0%, #6b3f5a 40%, #c96a86 70%, #f2c9b0 100%)",
    alsoFound: "Cliffside viewpoint just outside town",
  },
];

const CLUE_LABEL: Record<Clue, string> = {
  visual: "Visual clue",
  caption: "Caption clue",
  audio: "Audio clue",
  location: "Location clue",
};

export function ShazamDemo() {
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
        role="tablist"
        aria-label="Example scenarios"
      >
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={s.id === activeId}
            onClick={() => setActiveId(s.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
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
        <div
          className="aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-auto sm:h-full"
          style={{ background: active.gradient }}
        />

        <div className="flex flex-col justify-center gap-5">
          <div className="flex flex-wrap gap-2">
            {(["visual", "caption", "audio", "location"] as Clue[]).map((clue) => {
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
            })}
          </div>

          <div className="min-h-[92px]">
            {phase === "analyzing" ? (
              <div className="flex items-center gap-3">
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <span className="absolute h-full w-full animate-spin rounded-full border-2 border-orange/25 border-t-orange" />
                </span>
                <p className="text-sm font-medium text-cream-on-dark-soft">
                  Following the clues&hellip;
                </p>
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
                {active.alsoFound ? (
                  <p className="mt-3 text-sm text-cream-on-dark-soft">
                    <span className="font-medium text-cream-on-dark">
                      Also found:
                    </span>{" "}
                    {active.alsoFound}
                  </p>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
