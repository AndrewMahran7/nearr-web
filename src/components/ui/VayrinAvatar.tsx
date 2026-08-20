/**
 * Vayrin — Nearr's place-finding companion.
 *
 * This is a lightweight vector stand-in for the character, matching how
 * the approved reference boards themselves use a simplified round
 * face-avatar (chat bubbles, expression rows, notification cards) rather
 * than the full illustrated body everywhere. Final character artwork is
 * out of scope for this pass — see README.md → "Vayrin asset manifest".
 *
 * Colorway: off-white shell, near-black face, Nearr-orange discovery
 * mark — the reference's "Orange Core" direction, chosen because it's
 * already Nearr's shipping accent color rather than the alternate
 * purple exploration.
 */
export type VayrinState = "neutral" | "searching" | "found";

export function VayrinAvatar({
  state = "neutral",
  className = "",
}: {
  state?: VayrinState;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="var(--color-paper)"
        stroke="var(--color-border)"
        strokeWidth="2"
      />
      <ellipse cx="50" cy="54" rx="26" ry="20" fill="var(--color-near-black)" />

      {state === "neutral" && (
        <>
          <rect x="34" y="46" width="8" height="18" rx="4" fill="#fff" />
          <rect x="58" y="46" width="8" height="18" rx="4" fill="#fff" />
        </>
      )}

      {state === "searching" && (
        <>
          <rect x="32" y="51" width="14" height="7" rx="3.5" fill="#fff" />
          <rect x="54" y="51" width="14" height="7" rx="3.5" fill="#fff" />
        </>
      )}

      {state === "found" && (
        <>
          <path
            d="M32 58 Q38 48 44 58"
            stroke="#fff"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M56 58 Q62 48 68 58"
            stroke="#fff"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </>
      )}

      <path
        d="M78 68 C79.5 74 84 78.5 90 80 C84 81.5 79.5 86 78 92 C76.5 86 72 81.5 66 80 C72 78.5 76.5 74 78 68 Z"
        fill="var(--color-orange)"
      />
    </svg>
  );
}
