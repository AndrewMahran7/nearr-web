import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/legal/LegalLayout";
import { SUPPORT_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Nearr.",
};

const contactEmail = SUPPORT_EMAIL;

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" effectiveDate="August 19, 2026">
      <LegalSection title="1. Overview">
        <p>
          Nearr is a mobile app that helps you save real-world places you
          discover online — restaurants, hikes, beaches, hotels, and other
          places — identify places shown in videos and posts even when they
          aren&apos;t named, organize them on a map, and optionally receive
          nearby reminders.
        </p>
      </LegalSection>

      <LegalSection title="2. Accounts">
        <p>
          You&apos;re responsible for maintaining access to your account and
          device, and for providing accurate account information. You must
          use Nearr in compliance with applicable law.
        </p>
      </LegalSection>

      <LegalSection title="3. What Nearr does">
        <p>
          Nearr lets you save places from links, shared social content, and
          manual search.
        </p>
        <p>
          When you share a video or post, Nearr may use automated analysis —
          including visual, audio, caption/text, and location clues — to
          identify the real-world place or places it shows. A single video
          or post may correspond to more than one place; where that
          happens, Nearr may surface more than one candidate location.
        </p>
        <p>
          Nearr may show saved places on a map and send nearby reminders if
          notifications and location permissions are enabled.
        </p>
      </LegalSection>

      <LegalSection title="4. Automated identification and its limits">
        <p>
          Place identification is automated and may be incomplete,
          ambiguous, or wrong — especially for videos with few or unclear
          clues. Where a match isn&apos;t certain, Nearr may present its
          best available leads rather than a single definitive answer.
          Verify important details, like an address, hours, or whether a
          place is currently open, before relying on them.
        </p>
        <p>
          Nearby reminders may be delayed, inaccurate, or not delivered at
          all, depending on device settings, operating system behavior,
          permissions, connectivity, and third-party services.
        </p>
        <p>
          Nearr should not be relied on for safety-critical, emergency,
          navigation, medical, or time-sensitive purposes.
        </p>
      </LegalSection>

      <LegalSection title="5. Third-party services and content">
        <p>
          Nearr may interact with or link to third-party services, including
          Instagram, TikTok, Facebook, Google Maps, Apple Maps, Supabase,
          and email or hosting providers. Place details, addresses, hours,
          and directions may come from third-party data providers and may
          be inaccurate or outdated.
        </p>
        <p>
          Nearr is not affiliated with, endorsed by, or sponsored by
          Instagram, TikTok, Facebook, Meta, Google, Apple, or any
          restaurant, venue, or business shown in the app. All trademarks
          belong to their respective owners.
        </p>
        <p>
          You may only share or save content you have the right to access
          and share. Saving content to Nearr doesn&apos;t give you or Nearr
          any ownership over that content — it remains the property of
          whoever created or posted it.
        </p>
      </LegalSection>

      <LegalSection title="6. User conduct">
        <p>
          You must not use Nearr for illegal, harmful, abusive, fraudulent,
          or infringing activity.
        </p>
      </LegalSection>

      <LegalSection title="7. Location and notifications">
        <p>
          You control notification and location permissions through your
          device settings. Nearby reminders require notification permission
          and location access, including background access on some
          devices.
        </p>
      </LegalSection>

      <LegalSection title="8. Suspension or termination">
        <p>
          Nearr may suspend, limit, or terminate access if the service is
          being misused, used illegally, or creating material risk to the
          product or other users.
        </p>
      </LegalSection>

      <LegalSection title="9. Changes to the service">
        <p>
          Nearr may add, modify, or remove features over time, and the
          service may occasionally be unavailable.
        </p>
      </LegalSection>

      <LegalSection title="10. Limitation of liability">
        <p>
          Nearr is provided on an as-is and as-available basis to the
          maximum extent permitted by law. To the fullest extent permitted
          by law, Nearr and its operators are not liable for indirect,
          incidental, special, consequential, exemplary, or punitive
          damages, or for lost data, lost profits, or missed opportunities
          arising from use of the app.
        </p>
      </LegalSection>

      <LegalSection title="11. Changes to these terms">
        <p>
          Nearr may update these Terms over time. The current
          version&apos;s effective date is shown above.
        </p>
      </LegalSection>

      <LegalSection title="12. Contact">
        <p>
          Questions about these Terms can be sent to{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="text-orange-deep underline underline-offset-2"
          >
            {contactEmail}
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
