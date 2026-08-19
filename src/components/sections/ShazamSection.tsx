"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShazamDemo } from "./ShazamDemo";
import { useSectionView } from "@/lib/useSectionView";
import { useReveal } from "@/lib/useReveal";
import { ANALYTICS_EVENTS } from "@/lib/analytics";

export function ShazamSection() {
  const viewRef = useSectionView<HTMLElement>(ANALYTICS_EVENTS.SHAZAM_SECTION_VIEWED);
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="shazam"
      ref={viewRef}
      className="bg-near-black py-20 text-cream-on-dark sm:py-28"
    >
      <Container className="flex flex-col items-center gap-14">
        <div ref={revealRef} className="reveal">
          <SectionHeading
            align="center"
            tone="dark"
            eyebrow="Shazam for places"
            title="Don't know where it is? Send Nearr the video."
            body="Some places never get named — no caption, no location tag, nothing in the comments. Nearr looks at what's actually in the video: what's visible, what's said, what's written. Try a few scenarios below."
          />
        </div>

        <ShazamDemo />

        <p className="max-w-xl text-center text-sm leading-relaxed text-cream-on-dark-soft">
          Nearr won&apos;t catch everything — some places are too obscure, or
          the video just doesn&apos;t have enough to go on. But when
          there&apos;s something to work with, it finds the leads.
        </p>
      </Container>
    </section>
  );
}
