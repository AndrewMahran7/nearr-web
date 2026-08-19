"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReveal } from "@/lib/useReveal";

export function ProblemSection() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section className="overflow-hidden py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          align="center"
          eyebrow="Before Nearr"
          title="You already found it. You just can't find it again."
          body="It's saved somewhere — you just don't remember where."
        />

        <div
          ref={revealRef}
          className="reveal grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]"
        >
          {/* Messy "before" collage */}
          <div className="relative mx-auto h-[280px] w-full max-w-sm sm:h-[260px]">
            <ScatterCard className="top-0 left-2 -rotate-6" tone="paper">
              <p className="text-xs font-semibold text-ink-muted">
                Screenshots
              </p>
              <p className="text-2xl font-semibold text-ink">2,314</p>
            </ScatterCard>

            <ScatterCard className="top-6 right-0 rotate-3" tone="paper">
              <p className="mb-1.5 text-xs font-semibold text-ink-muted">
                Notes
              </p>
              <div className="flex flex-col gap-1">
                <span className="h-1.5 w-24 rounded-full bg-border" />
                <span className="h-1.5 w-20 rounded-full bg-border" />
                <span className="h-1.5 w-16 rounded-full bg-border" />
              </div>
            </ScatterCard>

            <ScatterCard className="bottom-4 left-6 rotate-2" tone="dark">
              <p className="text-xs leading-snug text-cream-on-dark-soft">
                &ldquo;here 📍 lol&rdquo;
              </p>
            </ScatterCard>

            <ScatterCard className="right-4 bottom-0 -rotate-3" tone="paper">
              <p className="text-xs leading-snug text-ink-soft">
                &ldquo;wait where is this??&rdquo;
              </p>
            </ScatterCard>
          </div>

          <div className="hidden text-ink-muted lg:block" aria-hidden="true">
            <ArrowIcon className="h-6 w-6" />
          </div>

          {/* Clean "after" card */}
          <div className="mx-auto flex w-full max-w-sm items-center gap-3 rounded-2xl border border-orange/25 bg-paper p-5 shadow-card">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange-deep">
              <PinIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">One Nearr map</p>
              <p className="text-sm text-ink-soft">
                Everything you&apos;ve found, in one place.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ScatterCard({
  children,
  className = "",
  tone = "paper",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "paper" | "dark";
}) {
  const toneClass =
    tone === "dark"
      ? "border-near-black-border bg-near-black"
      : "border-border bg-paper";
  return (
    <div
      className={`absolute w-40 rounded-xl border p-3.5 shadow-soft ${toneClass} ${className}`}
    >
      {children}
    </div>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 21s7-6.7 7-12a7 7 0 0 0-14 0c0 5.3 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}
