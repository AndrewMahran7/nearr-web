import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center py-20 sm:py-28">
      <Container className="flex max-w-lg flex-col items-start gap-5">
        <p className="text-sm font-semibold tracking-wide text-orange-deep uppercase">
          404
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          This place isn&apos;t here.
        </h1>
        <p className="max-w-md text-base leading-relaxed text-ink-soft">
          The page may have moved, or the link may be incomplete.
        </p>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-cream shadow-soft transition-transform hover:-translate-y-0.5"
        >
          Back home
        </Link>
      </Container>
    </div>
  );
}
