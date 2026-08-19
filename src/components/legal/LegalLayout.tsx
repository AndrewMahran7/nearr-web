import { Container } from "@/components/ui/Container";

export function LegalLayout({
  title,
  effectiveDate,
  children,
}: {
  title: string;
  effectiveDate?: string;
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
