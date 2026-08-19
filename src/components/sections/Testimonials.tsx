import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export type Testimonial = {
  quote: string;
  name: string;
  handle?: string;
};

/**
 * No real testimonials exist yet — Nearr is pre-launch. Add entries here
 * only once you have explicit, in-writing approval from the person quoted
 * to use their words in marketing. Until this array has entries, the
 * section renders nothing (see README.md → "Adding testimonials").
 */
const TESTIMONIALS: Testimonial[] = [];

export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          align="center"
          eyebrow="From people using Nearr"
          title="What people are saving."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-paper p-6 shadow-soft"
            >
              <blockquote className="text-sm leading-relaxed text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="text-sm font-medium text-ink-soft">
                {t.name}
                {t.handle ? (
                  <span className="text-ink-muted"> &middot; {t.handle}</span>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
