"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReveal } from "@/lib/useReveal";
import { useSectionView } from "@/lib/useSectionView";
import { ANALYTICS_EVENTS } from "@/lib/analytics";

const CARDS = [
  {
    group: "Food & drink",
    name: "Late-night ramen",
    image: "/images/marketing/category-food-drink.webp",
    alt: "Bowl of ramen with pork, eggs, and scallions",
  },
  {
    group: "Outdoors",
    name: "Mountain ridge lookout",
    image: "/images/marketing/category-outdoors.webp",
    alt: "Mountain ridge overlooking a lake at sunset",
  },
  {
    group: "Stays",
    name: "Clifftop coastal stay",
    image: "/images/marketing/category-stays.webp",
    alt: "White clifftop villa overlooking the sea",
  },
  {
    group: "Things to do",
    name: "Lantern-lit night market",
    image: "/images/marketing/category-things-to-do.webp",
    alt: "Night market lined with colorful lanterns",
  },
];

export function MapMemorySection() {
  const revealRef = useReveal<HTMLDivElement>();
  const viewRef = useSectionView<HTMLElement>(ANALYTICS_EVENTS.MAP_SECTION_VIEWED);

  return (
    <section
      id="map"
      ref={viewRef}
      className="scroll-mt-24 bg-cream-elevated py-20 sm:py-28"
    >
      <Container className="flex flex-col gap-14">
        <SectionHeading
          align="center"
          eyebrow="Your map"
          title="Your saved places, on one map."
          body="Food, coffee, hikes, beaches, hotels — the real-world places you found online, ready when you want to go."
        />

        <div ref={revealRef} className="reveal flex flex-col gap-6">
          <div className="overflow-hidden rounded-[1.75rem] border border-border bg-cream shadow-card">
            <Image
              src="/images/marketing/map-of-places-hero.webp"
              alt="Map filled with colorful saved place pins"
              width={1600}
              height={900}
              sizes="(max-width: 1279px) calc(100vw - 48px), 1200px"
              loading="lazy"
              className="h-auto w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {CARDS.map((card) => (
              <div
                key={card.name}
                className="overflow-hidden rounded-2xl border border-border bg-paper shadow-soft"
              >
                <div className="relative aspect-[8/5] w-full overflow-hidden bg-cream-elevated">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 639px) calc(50vw - 40px), (max-width: 1023px) calc(50vw - 48px), 276px"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
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
