import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const FOOTER_LINKS = [
  { href: "/support", label: "Support" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-cream-elevated">
      <Container className="flex flex-col gap-8 py-12 sm:py-16">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
          <div className="flex max-w-xs flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <Image
                src="/brand/app-icon-256.png"
                alt=""
                width={30}
                height={30}
                className="rounded-[8px]"
              />
              <span className="font-display text-lg font-bold tracking-tight text-ink">
                Nearr
              </span>
            </div>
            <p className="text-sm leading-relaxed text-ink-soft">
              The places you find online, saved to a map you&apos;ll actually
              use.
            </p>
          </div>

          <nav className="flex gap-8">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-border pt-6 text-xs leading-relaxed text-ink-muted">
          <p>&copy; {year} Nearr. All rights reserved.</p>
          <p>
            Nearr is not affiliated with, endorsed by, or sponsored by
            Instagram, TikTok, Meta Platforms, or ByteDance. Instagram and
            TikTok are trademarks of their respective owners.
          </p>
        </div>
      </Container>
    </footer>
  );
}
