import { Container } from "@/components/ui/Container";
import { AppStoreButton } from "@/components/ui/AppStoreButton";
import { HeroDemo } from "./HeroDemo";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-10%] right-[-10%] h-[420px] w-[420px] rounded-full opacity-40 blur-3xl sm:h-[560px] sm:w-[560px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-orange-bright) 0%, transparent 70%)",
        }}
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange/25 bg-orange/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-orange-deep uppercase">
            Shazam for places
          </span>

          <h1 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-ink sm:text-5xl md:text-6xl">
            Find the places you see online.
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            Share a video from Instagram, TikTok, or Facebook. Nearr follows
            the clues and finds the place — even when the creator never says
            where it is — then saves it to your map.
          </p>

          <div className="mt-2 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <AppStoreButton source="hero" />
            <p className="text-sm text-ink-muted">
              For iPhone. Free on the App Store.
            </p>
          </div>
        </div>

        <HeroDemo />
      </Container>
    </section>
  );
}
