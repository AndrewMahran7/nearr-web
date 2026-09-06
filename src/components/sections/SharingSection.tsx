import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function SharingSection() {
  return (
    <section className="overflow-hidden bg-paper py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="flex flex-col items-start gap-5">
          <span className="text-xs font-bold tracking-[0.16em] text-orange-deep uppercase">
            Nearr to Nearr
          </span>
          <h2 className="font-display text-4xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
            Share the place, not just the post.
          </h2>
          <p className="text-lg leading-relaxed text-ink-soft">
            Send a Nearr place link to a friend. They can see the place on the
            web, open it in Nearr, and save it to their own map.
          </p>
          <p className="mt-2 flex items-start gap-3 rounded-2xl bg-cream px-4 py-3 text-sm leading-relaxed text-ink-soft">
            <span className="mt-0.5 text-orange-deep" aria-hidden="true">●</span>
            Nearr only uses the content you share to identify and save the place.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -top-5 right-6 rounded-2xl border border-border bg-paper px-4 py-3 text-sm font-semibold text-ink shadow-card sm:right-10">
            You have to see this place.
          </div>
          <div className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-cream shadow-card">
            <div className="relative h-56 overflow-hidden bg-near-black sm:h-64">
              <div className="topo-dark absolute inset-0 opacity-80" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_45%,rgba(255,106,26,.28),transparent_32%)]" />
              <div className="absolute top-1/2 left-[58%] -translate-x-1/2 -translate-y-1/2">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-orange/40 bg-near-black-elevated shadow-card">
                  <Image src="/brand/app-icon-256.png" alt="" width={46} height={46} className="rounded-xl" />
                </span>
              </div>
              <div className="absolute right-5 bottom-5 left-5">
                <span className="text-xs font-bold tracking-[0.16em] text-orange-bright uppercase">Nearr place</span>
                <h3 className="mt-2 font-display text-3xl font-semibold text-cream">Hidden Falls</h3>
                <p className="mt-1 text-sm text-cream-on-dark-soft">Waterfall · Saint Mary, Montana</p>
              </div>
            </div>
            <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
              <div className="rounded-xl bg-ink px-4 py-3 text-center text-sm font-semibold text-cream">
                Open in Nearr
              </div>
              <div className="rounded-xl bg-orange px-4 py-3 text-center text-sm font-semibold text-near-black">
                Save to my map
              </div>
              <p className="text-center text-xs text-ink-muted sm:col-span-2">
                nearrapp.com/p/place-link
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
