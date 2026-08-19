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
    <LegalLayout title="Terms of Service" effectiveDate="May 2, 2026" draft>
      <LegalSection title="1. Overview">
        <p>
          Nearr is a mobile app that helps users save places they discover
          online — restaurants, hikes, beaches, hotels, and other real-world
          places — organize them on a map, and optionally receive nearby
          reminders if those permissions are enabled.
        </p>
        <p>
          Nearr is still an early-stage product. Features may change, break,
          or be removed.
        </p>
      </LegalSection>

      <LegalSection title="2. Accounts">
        <p>
          You are responsible for maintaining access to your account and
          device.
        </p>
        <p>
          You must provide accurate account information and use Nearr only
          in compliance with applicable law.
        </p>
      </LegalSection>

      <LegalSection title="3. What Nearr does">
        <p>
          Nearr lets users save places from links, social content, and
          manual search.
        </p>
        <p>
          Nearr may use automated extraction to identify possible places
          from links or source content.
        </p>
        <p>
          Nearr may show saved places on a map and may send nearby reminders
          if notifications and location permissions are enabled.
        </p>
      </LegalSection>

      <LegalSection title="4. Important limitations">
        <p>Place extraction may be incomplete, ambiguous, or wrong.</p>
        <p>
          Nearby reminders may be delayed, inaccurate, or not delivered at
          all. They depend on device settings, operating system behavior,
          permissions, connectivity, and third-party services.
        </p>
        <p>
          Nearr should not be relied on for safety-critical, emergency,
          navigation, medical, or time-sensitive purposes.
        </p>
      </LegalSection>

      <LegalSection title="5. Third-party services">
        <p>
          Nearr may interact with or link to third-party services such as
          Instagram, TikTok, Google Maps, Apple Maps, Supabase, and email
          providers such as Resend or SMTP services.
        </p>
        <p>
          Nearr is not affiliated with, endorsed by, or sponsored by
          Instagram, TikTok, Google, Apple, Supabase, Resend, or any
          restaurant, venue, or business shown in the app.
        </p>
      </LegalSection>

      <LegalSection title="6. User data and conduct">
        <p>
          Users may save links, source URLs, notes, and places in Nearr.
        </p>
        <p>
          Users must not use Nearr for illegal, harmful, abusive,
          fraudulent, or infringing activity.
        </p>
      </LegalSection>

      <LegalSection title="7. Location and notifications">
        <p>
          Users control notification and location permissions in device
          settings.
        </p>
        <p>
          Nearby reminders require notification permission and location
          access, including background or Always access on some devices.
        </p>
      </LegalSection>

      <LegalSection title="8. Suspension or termination">
        <p>
          Nearr may suspend, limit, or terminate access if the service is
          being misused, used illegally, or creating material risk to the
          product or other users.
        </p>
      </LegalSection>

      <LegalSection title="9. Limitation of liability">
        <p>
          Nearr is provided on an as-is and as-available basis to the
          maximum extent allowed by law.
        </p>
        <p>
          To the fullest extent permitted by law, Nearr and its operators
          will not be liable for indirect, incidental, special,
          consequential, exemplary, or punitive damages, or for lost data,
          lost profits, or missed opportunities arising from the use of the
          app.
        </p>
      </LegalSection>

      <LegalSection title="10. Changes">
        <p>
          Nearr may update these Terms over time. The current version date
          should be shown in the app or related materials.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact">
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
