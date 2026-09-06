import Image from "next/image";
import { Container } from "@/components/ui/Container";

const CATEGORIES = [
  "Restaurants",
  "Hikes",
  "Stays",
  "Beaches",
  "Waterfalls",
  "Landmarks",
  "Hidden spots",
] as const;

export function MapMemorySection() {
  return (
    <section id="map" className="scroll-mt-24 overflow-hidden bg-cream py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <div className="order-2 mx-auto w-full max-w-[540px] lg:order-1">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-near-black shadow-card">
            <Image
              src="/images/product/map-ui.png"
              alt="The Nearr global map showing saved places across the world"
              width={1100}
              height={1880}
              sizes="(max-width: 1023px) calc(100vw - 40px), 540px"
              loading="lazy"
              className="h-auto w-full"
            />
            <div className="absolute top-5 right-5 rounded-full border border-white/15 bg-near-black/85 px-3 py-2 text-xs font-bold text-cream backdrop-blur">
              Your world, saved
            </div>
          </div>
        </div>

        <div className="order-1 flex flex-col items-start gap-6 lg:order-2">
          <span className="text-xs font-bold tracking-[0.16em] text-orange-deep uppercase">
            One home for every find
          </span>
          <h2 className="font-display text-4xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
            Every place you save, on one map.
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
            The places you discover online become something useful: a map you
            can search, filter, revisit, and take with you.
          </p>
          <div className="flex flex-wrap gap-2" aria-label="Saved place categories">
            {CATEGORIES.map((category) => (
              <span
                key={category}
                className="rounded-full border border-border bg-paper px-3 py-2 text-xs font-semibold text-ink-soft shadow-soft"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
