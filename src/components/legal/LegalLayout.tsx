import { Container } from "@/components/ui/Container";

export function LegalLayout({
  title,
  effectiveDate,
  draft,
  children,
}: {
  title: string;
  effectiveDate?: string;
  draft?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        {effectiveDate ? (
          <p className="mt-2 text-sm text-ink-muted">
            Effective date: {effectiveDate}
          </p>
        ) : null}

        {draft ? (
          <div className="mt-6 rounded-2xl border border-orange/25 bg-orange/10 px-5 py-4 text-sm leading-relaxed text-orange-deep">
            <strong className="font-semibold">
              Draft — pending legal review.
            </strong>{" "}
            This page reflects Nearr&apos;s current product behavior but has
            not yet been reviewed by a lawyer. Don&apos;t treat it as final
            legal advice; it will be updated before Nearr is broadly
            available.
          </div>
        ) : null}

        <div className="prose-legal mt-10 flex flex-col gap-8">
          {children}
        </div>
      </Container>
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2.5">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <div className="flex flex-col gap-2.5 text-sm leading-relaxed text-ink-soft">
        {children}
      </div>
    </section>
  );
}
