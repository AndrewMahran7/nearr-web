"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReveal } from "@/lib/useReveal";
import { useSectionView } from "@/lib/useSectionView";
import { ANALYTICS_EVENTS } from "@/lib/analytics";

const PINS = [
  { top: "22%", left: "18%", color: "var(--color-orange)" },
  { top: "38%", left: "62%", color: "#3f8f7a" },
  { top: "58%", left: "30%", color: "#3f8f7a" },
  { top: "68%", left: "72%", color: "#5d7a9c" },
  { top: "30%", left: "42%", color: "#c96a86" },
  { top: "78%", left: "48%", color: "var(--color-orange)" },
];

const CARDS = [
  {
    group: "Food & drink",
    name: "Corner ramen counter",
    gradient: "linear-gradient(160deg, #2e211a 0%, #6b3f2a 45%, #e8b478 100%)",
  },
  {
    group: "Outdoors",
    name: "Ridge trail lookout",
    gradient: "linear-gradient(160deg, #23343a 0%, #3f8f7a 45%, #cfe6c8 100%)",
  },
  {
    group: "Stays",
    name: "Cliffside boutique hotel",
    gradient: "linear-gradient(160deg, #1c2530 0%, #5d7a9c 45%, #cbdcec 100%)",
  },
  {
    group: "Things to do",
    name: "Night market strip",
    gradient: "linear-gradient(160deg, #2e1f2a 0%, #c96a86 45%, #f2c9b0 100%)",
  },
];

export function MapMemorySection() {
  const revealRef = useReveal<HTMLDivElement>();
  const viewRef = useSectionView<HTMLElement>(ANALYTICS_EVENTS.MAP_SECTION_VIEWED);

  return (
    <section id="map" ref={viewRef} className="bg-cream-elevated py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          align="center"
          eyebrow="Your map"
          title="Everything you save becomes a map of places you actually care about."
          body="Food, coffee, hikes, beaches, hotels, whatever you saved — not a database of bookmarks, a visual memory of the real world you've found online."
        />

        <div ref={revealRef} className="reveal flex flex-col gap-6">
          <div
            className="relative h-[280px] w-full overflow-hidden rounded-[1.75rem] border border-border shadow-card sm:h-[340px]"
            style={{
              background:
                "linear-gradient(135deg, #f3e7d6 0%, #eadcc4 40%, #dfd0b0 100%)",
            }}
            aria-hidden="true"
          >
            <svg
              className="absolute inset-0 h-full w-full opacity-[0.15]"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="map-grid"
                  width="36"
                  height="36"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M36 0H0V36"
                    fill="none"
                    stroke="var(--color-ink)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#map-grid)" />
            </svg>

            {PINS.map((pin, i) => (
              <span
                key={i}
                className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-paper shadow-soft"
                style={{ top: pin.top, left: pin.left, background: pin.color }}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {CARDS.map((card) => (
              <div
                key={card.name}
                className="overflow-hidden rounded-2xl border border-border bg-paper shadow-soft"
              >
                <div
                  className="h-24 w-full"
                  style={{ background: card.gradient }}
                />
                <div className="flex flex-col gap-1 p-4">
                  <span className="text-[11px] font-semibold tracking-wide text-orange-deep uppercase">
                    {card.group}
                  </span>
                  <span className="text-sm font-medium text-ink">
                    {card.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
