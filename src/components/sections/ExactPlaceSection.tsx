import Image from "next/image";
import { Container } from "@/components/ui/Container";

const EXAMPLES = [
  "Cliff jumps",
  "Waterfalls",
  "Hidden beaches",
  "Remote hikes",
  "Landmarks",
  "Restaurants",
  "Stays",
] as const;

export function ExactPlaceSection() {
  return (
    <section className="topo-dark overflow-hidden bg-near-black py-20 text-cream-on-dark sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
        <div className="flex flex-col items-start gap-6">
          <span className="text-xs font-bold tracking-[0.16em] text-orange-bright uppercase">
            The hard part, handled
          </span>
          <h2 className="font-display text-4xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance sm:text-5xl md:text-6xl">
            Nearr finds the exact place.
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-cream-on-dark-soft">
            Even when the caption does not name it. Nearr analyzes the video,
            source context, and location evidence to identify the likely
            real-world destination.
          </p>
          <div className="flex flex-wrap gap-2" aria-label="Types of places Nearr can identify">
            {EXAMPLES.map((example) => (
              <span
                key={example}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-cream-on-dark-soft"
              >
                {example}
              </span>
            ))}
          </div>
          <div className="mt-2 grid gap-3 border-l-2 border-orange pl-5 text-sm leading-relaxed text-cream-on-dark-soft">
            <p className="font-semibold text-cream-on-dark">
              Even when the video doesn&apos;t tell you where it is.
            </p>
            <p>
              Nearr finds the best match and saves it so you can keep moving.
            </p>
          </div>
        </div>

        <figure className="mx-auto w-full max-w-[500px]">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-near-black-elevated shadow-[0_32px_90px_-36px_rgba(255,106,26,.6)]">
            <Image
              src="/images/product/exact-place-ui.png"
              alt="A difficult cliff-jumping video identified as Uluwatu Clifftop in Bali"
              width={1120}
              height={1950}
              sizes="(max-width: 1023px) calc(100vw - 40px), 500px"
              loading="lazy"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-4 text-center text-xs leading-relaxed text-cream-on-dark-soft">
            A cliff-jumping video becomes a named, mappable destination.
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
