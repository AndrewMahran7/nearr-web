"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { track, ANALYTICS_EVENTS } from "@/lib/analytics";

export function CreatorBanner({ creator }: { creator: string }) {
  useEffect(() => {
    track(ANALYTICS_EVENTS.CREATOR_LANDING_VIEWED, { creator });
  }, [creator]);

  return (
    <div className="border-b border-border bg-cream-elevated py-2.5 text-center text-sm font-medium text-ink-soft">
      <Container>
        via <span className="text-ink">@{creator}</span>
      </Container>
    </div>
  );
}
