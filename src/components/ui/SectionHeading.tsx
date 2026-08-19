export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  tone = "light",
}: {
  eyebrow: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const alignClass = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  const eyebrowTone =
    tone === "dark"
      ? "text-orange-bright bg-[color-mix(in_oklab,var(--color-orange)_16%,transparent)]"
      : "text-orange-deep bg-orange/10";
  const bodyTone = tone === "dark" ? "text-cream-on-dark-soft" : "text-ink-soft";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignClass}`}>
      <span
        className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${eyebrowTone}`}
      >
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {body ? (
        <p className={`text-base leading-relaxed sm:text-lg ${bodyTone}`}>{body}</p>
      ) : null}
    </div>
  );
}
