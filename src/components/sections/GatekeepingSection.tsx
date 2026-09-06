import { Container } from "@/components/ui/Container";

const COMMENTS = [
  { text: "where is this?", className: "sm:-rotate-2" },
  { text: "location?", className: "sm:translate-y-8 sm:rotate-2" },
  { text: "drop the spot 🙏", className: "sm:-translate-y-1 sm:rotate-1" },
  { text: "what beach is this?", className: "sm:translate-y-10 sm:-rotate-2" },
  { text: "gatekeeping as usual…", className: "sm:translate-y-1 sm:rotate-2" },
];

export function GatekeepingSection() {
  return (
    <section className="overflow-hidden bg-cream py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div className="comment-cloud grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" aria-label="Common comments asking for a video's location">
          {COMMENTS.map((comment) => (
            <div
              key={comment.text}
              className={`rounded-2xl border border-border bg-paper p-4 shadow-soft ${comment.className}`}
            >
              <div className="mb-3 flex items-center gap-2" aria-hidden="true">
                <span className="h-7 w-7 rounded-full bg-gradient-to-br from-[#d9d4cd] to-[#8e8982]" />
                <span className="h-2 w-14 rounded-full bg-border" />
              </div>
              <p className="text-sm font-semibold text-ink sm:text-base">
                {comment.text}
              </p>
              <p className="mt-2 text-xs text-ink-muted">Reply</p>
            </div>
          ))}
          <div className="col-span-2 flex items-center justify-center gap-3 rounded-2xl border border-orange/30 bg-orange/10 px-5 py-4 text-sm font-bold text-ink sm:col-span-1 sm:translate-y-12">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange text-near-black" aria-hidden="true">✓</span>
            Nearr found it
          </div>
        </div>

        <div className="flex flex-col items-start gap-5">
          <span className="text-xs font-bold tracking-[0.16em] text-orange-deep uppercase">
            The comment problem
          </span>
          <h2 className="font-display text-4xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
            Stop digging through the comments.
          </h2>
          <p className="text-lg leading-relaxed text-ink-soft">
            Great places show up in videos every day. Then comes the scrolling,
            screenshots, searching—or giving up. Share the post to Nearr and
            let it do the searching for you.
          </p>
        </div>
      </Container>
    </section>
  );
}
