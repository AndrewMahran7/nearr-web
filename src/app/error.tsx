"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center py-20 sm:py-28">
      <Container className="flex max-w-lg flex-col items-start gap-5">
        <p className="text-sm font-semibold tracking-wide text-orange-deep uppercase">
          Something went wrong
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Nearr couldn&apos;t load this page.
        </h1>
        <p className="max-w-md text-base leading-relaxed text-ink-soft">
          Try again, or return home if the problem continues.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="min-h-11 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-cream shadow-soft"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-xl border border-border bg-paper px-5 py-3 text-sm font-semibold text-ink shadow-soft"
          >
            Back home
          </Link>
        </div>
      </Container>
    </div>
  );
}
