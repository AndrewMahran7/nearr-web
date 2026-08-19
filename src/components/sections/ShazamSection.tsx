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
            body="Some places never get named — no caption, no location tag, nothing in the comments. Nearr looks at what's actually there: what's visible, what's said, what's written, and any location clues buried in the post — then surfaces every credible match, even if a video shows more than one place. Try a few scenarios below."
          />
        </div>

        <ShazamDemo />

        <p className="max-w-xl text-center text-sm leading-relaxed text-cream-on-dark-soft">
          For harder videos, Nearr follows every available clue and surfaces
          its best leads.
        </p>
      </Container>
    </section>
  );
}
