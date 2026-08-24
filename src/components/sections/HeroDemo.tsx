"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { VayrinAvatar } from "@/components/ui/VayrinAvatar";

const STEPS = [
  { label: "A place in a Reel", key: "video" },
  { label: "Shared to Nearr", key: "share" },
  { label: "Vayrin is looking…", key: "analyzing" },
  { label: "Mad Yolks — saved to your map", key: "result" },
] as const;

const STEP_MS = 2800;

export function HeroDemo() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion.current) return;

    if (paused) return;
    const id = window.setInterval(() => {
      setStep((current) => (current + 1) % STEPS.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      className="relative mx-auto flex w-full max-w-sm flex-col items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Status pill */}
      <div
        className="relative z-10 mb-5 min-h-[2.25rem] rounded-full border border-border bg-paper px-4 py-2 text-center text-sm font-medium text-ink shadow-soft"
      >
        {STEPS[step].label}
      </div>

      <div className="relative aspect-[9/18.5] w-[280px] sm:w-[300px]">
        {/* Saved badge, step 3 only */}
        <div
          aria-hidden={step !== 3}
          className={`absolute -right-6 top-[12%] z-20 flex items-center gap-1.5 rounded-full bg-success px-3 py-1.5 text-xs font-semibold text-cream shadow-soft transition-all duration-500 ${
            step === 3
              ? "translate-y-0 rotate-3 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0"
          }`}
        >
          <CheckIcon className="h-3.5 w-3.5" />
          Saved
        </div>

        {/* Device stage */}
        <div className="h-full w-full overflow-hidden rounded-[2.25rem] border border-border bg-paper p-2 shadow-card">
          <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-near-black">
            <VideoPanel active={step === 0} />
            <SharePanel active={step === 1} />
            <AnalyzingPanel active={step === 2} />
            <ResultPanel active={step === 3} />
          </div>
        </div>
      </div>

      {/* Step dots */}
      <div className="mt-3 flex items-center" role="group" aria-label="Demo steps">
        {STEPS.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setStep(i)}
            aria-label={`Show step: ${s.label}`}
            aria-pressed={i === step}
            className="flex h-11 min-w-11 items-center justify-center rounded-full"
          >
            <span
              aria-hidden="true"
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? "w-6 bg-orange" : "w-1.5 bg-border"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function Panel({
  active,
  className = "",
  children,
}: {
  active: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute inset-0 flex flex-col transition-opacity duration-500 ${
        active ? "opacity-100" : "pointer-events-none opacity-0"
      } ${className}`}
      aria-hidden={!active}
    >
      {children}
    </div>
  );
}

function VideoPanel({ active }: { active: boolean }) {
  return (
    <Panel active={active}>
      <div className="relative flex h-full flex-col justify-end">
        <Image
          src="/images/demos/mad-yolks.webp"
          alt=""
          fill
          priority
          sizes="300px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10" />
        <div className="absolute left-1/2 top-[38%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          <PlayIcon className="ml-1 h-6 w-6 text-white" />
        </div>
        <div className="relative flex flex-col gap-1.5 p-4 text-white">
          <p className="text-xs font-medium text-white/70">Public Instagram post</p>
          <p className="text-sm leading-snug font-medium">
            Breakfast sandwiches in Santa Cruz
          </p>
        </div>
        <div className="absolute right-3 bottom-20 flex flex-col items-center gap-1 text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <ShareIcon className="h-4 w-4" />
          </span>
          <span className="text-[10px] font-medium">Share</span>
        </div>
      </div>
    </Panel>
  );
}

function SharePanel({ active }: { active: boolean }) {
  return (
    <Panel active={active} className="justify-end bg-near-black">
      <div className="rounded-t-[1.5rem] bg-[#1c1c1e] p-4 pb-6">
        <div className="mx-auto mb-4 h-1 w-9 rounded-full bg-white/20" />
        <p className="mb-4 text-center text-xs font-medium text-white/70">
          Share
        </p>
        <div className="flex items-center justify-between px-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className="h-11 w-11 rounded-full bg-white/10" />
              <span className="h-1.5 w-8 rounded-full bg-white/10" />
            </div>
          ))}
          <div className="flex flex-col items-center gap-1.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-orange shadow-[0_0_0_3px_rgba(255,106,26,0.35)]">
              <Image
                src="/brand/app-icon-256.png"
                alt=""
                width={44}
                height={44}
                className="h-full w-full rounded-[13px] object-cover"
              />
            </span>
            <span className="text-[10px] font-semibold text-white">
              Nearr
            </span>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function AnalyzingPanel({ active }: { active: boolean }) {
  return (
    <Panel
      active={active}
      className="items-center justify-center gap-4 bg-near-black px-8 text-center"
    >
      <VayrinAvatar
        state="searching"
        className="h-12 w-12 animate-pulse drop-shadow-lg"
      />
      <p className="text-sm font-medium text-cream-on-dark">
        I&apos;m looking&hellip;
      </p>
      <p className="text-xs leading-relaxed text-cream-on-dark-soft">
        This usually takes a few seconds.
      </p>
    </Panel>
  );
}

function ResultPanel({ active }: { active: boolean }) {
  return (
    <Panel active={active} className="justify-end bg-near-black">
      <div className="relative h-[62%] w-full">
        <Image
          src="/images/demos/mad-yolks.webp"
          alt=""
          fill
          sizes="300px"
          loading="lazy"
          className="object-cover"
        />
        <VayrinAvatar
          state="found"
          className="absolute right-3 bottom-3 h-10 w-10 drop-shadow-lg"
        />
      </div>
      <div className="flex-1 rounded-t-[1.5rem] bg-paper p-4">
        <span className="mb-2 inline-flex w-fit items-center rounded-full bg-orange/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-orange-deep uppercase">
          Food &amp; drink
        </span>
        <p className="text-base font-semibold text-ink">Mad Yolks</p>
        <p className="mt-0.5 text-xs text-ink-muted">
          Santa Cruz, California
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-success">
          <CheckIcon className="h-3.5 w-3.5" />
          Saved to your map
        </div>
      </div>
    </Panel>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3v12" />
      <path d="M7 8l5-5 5 5" />
      <path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
    </svg>
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
