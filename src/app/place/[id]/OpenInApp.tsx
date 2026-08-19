"use client";

import { useEffect } from "react";

/**
 * Best-effort deep-link attempt: `nearr://place/<id>` (scheme confirmed in
 * the Nearr app's app.config.js). If the app is installed and has the place
 * screen wired to this scheme, iOS hands off to it. If not, this silently
 * no-ops and the static fallback content below stays what the visitor sees.
 * No network/backend call — safe to ship without place-fetching infra.
 */
export function OpenInApp({ id }: { id: string }) {
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
    if (!isIOS) return;
    window.location.href = `nearr://place/${encodeURIComponent(id)}`;
  }, [id]);

  return null;
}
