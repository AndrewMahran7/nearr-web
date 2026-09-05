"use client";

export default function PublicPlaceError({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-orange/15 text-3xl text-orange" aria-hidden="true">
        &bull;
      </div>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">This place is temporarily unavailable</h1>
      <p className="mt-3 text-base leading-relaxed text-ink-soft">Nearr could not load the place right now. The link is safe to keep—please try again.</p>
      <button type="button" onClick={reset} className="mt-7 min-h-12 rounded-2xl bg-ink px-6 py-3 font-semibold text-cream">
        Try again
      </button>
    </main>
  );
}
