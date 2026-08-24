"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReveal } from "@/lib/useReveal";

export function NearbyReminderSection() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section id="nearby" className="scroll-mt-24 py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <SectionHeading
          eyebrow="Right place, right time"
          title="Save it now. Remember it when it matters."
          body="Nearr can remind you when you're near a place you saved, so the spot you found weeks ago becomes somewhere you actually go."
        />

        <div ref={revealRef} className="reveal flex justify-center lg:justify-end">
          <div className="w-full max-w-sm rounded-[1.5rem] border border-border bg-paper p-4 shadow-card">
            <div className="flex items-start gap-3">
              <Image
                src="/brand/app-icon-256.png"
                alt=""
                width={40}
                height={40}
                className="rounded-[10px]"
              />
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wide text-ink-muted uppercase">
                    Nearr
                  </span>
                  <span className="text-xs text-ink-muted">now</span>
                </div>
                <p className="text-sm font-semibold text-ink">
                  You&apos;re near Mad Yolks
                </p>
                <p className="text-sm leading-snug text-ink-soft">
                  You saved this from an Instagram video.
                </p>
              </div>
            </div>
            <div
              className="mt-5 grid grid-cols-4 gap-2 text-center text-xs font-semibold text-ink-muted"
              aria-label="Saved place journey"
            >
              {["Save", "Map", "Nearby", "Go"].map((label, index) => (
                <div key={label} className="flex min-w-0 flex-col items-center gap-2">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${
                      index === 3
                        ? "bg-orange text-near-black"
                        : "bg-orange/10 text-orange-deep"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
