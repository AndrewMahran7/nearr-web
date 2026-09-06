import { Container } from "@/components/ui/Container";
import { AppStoreButton } from "@/components/ui/AppStoreButton";

export function FinalCta() {
  return (
    <section className="pb-24 sm:pb-32">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-near-black px-6 py-16 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[-30%] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, var(--color-orange) 0%, transparent 70%)",
            }}
          />
          <div className="relative flex flex-col items-center gap-6">
            <p className="text-xs font-bold tracking-[0.16em] text-orange-bright uppercase">
              Your next place is already in your feed
            </p>
            <h2 className="font-display max-w-2xl text-4xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance text-cream-on-dark sm:text-5xl">
              Find it now. Remember it when you&apos;re near.
            </h2>
            <p className="max-w-md text-base leading-relaxed text-cream-on-dark-soft">
              Send the video to Nearr and turn the place behind it into
              somewhere you can actually go.
            </p>
            <AppStoreButton source="final_cta" tone="accent" />
          </div>
        </div>
      </Container>
    </section>
  );
}
