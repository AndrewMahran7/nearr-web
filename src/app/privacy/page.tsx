import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/legal/LegalLayout";
import { SUPPORT_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Nearr collects, uses, and protects your information.",
};

const contactEmail = SUPPORT_EMAIL;

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" effectiveDate="May 2, 2026" draft>
      <LegalSection title="1. Overview">
        <p>
          Nearr collects and uses a limited amount of information so the app
          can authenticate accounts, save places, display them on a map, and
          optionally send nearby reminders.
        </p>
      </LegalSection>

      <LegalSection title="2. What Nearr collects">
        <p>Nearr may collect:</p>
        <ul className="list-disc pl-5">
          <li>account information such as email address</li>
          <li>saved places</li>
          <li>source URLs</li>
          <li>notes users add</li>
          <li>reminder and notification settings</li>
          <li>location permission status</li>
          <li>
            current or approximate location when needed for nearby reminders
          </li>
          <li>
            lightweight product analytics events and app diagnostics used to
            debug and improve the product
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. How data is used">
        <p>
          Nearr uses data for account authentication, saving and organizing
          places, showing the map and list, powering nearby reminders, and
          improving reliability.
        </p>
        <p>Nearr does not sell personal data.</p>
      </LegalSection>

      <LegalSection title="4. Location data">
        <p>
          Nearr uses location to check whether a user is near places they
          saved so the app can support nearby reminders.
        </p>
        <p>
          Users can disable location access in device settings at any time.
          If they do, nearby reminders may not work.
        </p>
      </LegalSection>

      <LegalSection title="5. Notifications">
        <p>
          If enabled, Nearr may send nearby reminders and test notifications.
          Delivery depends on device, operating system, and provider
          behavior and is not guaranteed.
        </p>
      </LegalSection>

      <LegalSection title="6. Service providers and linked services">
        <p>
          Nearr may use Supabase for backend services, authentication, and
          database storage.
        </p>
        <p>
          Nearr may use Resend or another SMTP/email provider to send
          sign-in emails or service messages.
        </p>
        <p>
          Nearr may use Google Maps or Places APIs and Apple or Google
          mapping services to display maps, place details, or directions
          links.
        </p>
        <p>
          Instagram and TikTok links may be stored as source URLs when users
          save content from those services.
        </p>
        <p>
          If enabled in a native iOS build, Nearr may also process shared
          URLs from the iOS share sheet and hand those URLs into the app or
          related backend services.
        </p>
      </LegalSection>

      <LegalSection title="7. Sharing and disclosure">
        <p>
          Nearr shares data only with service providers needed to operate
          the app or when required by law, legal process, or to protect
          users, the service, or legal rights.
        </p>
      </LegalSection>

      <LegalSection title="8. Retention and deletion">
        <p>
          Users can delete saved places inside the app. Some backup,
          operational, or log data may persist for a limited time.
        </p>
        <p>
          For account deletion or privacy requests, contact{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="text-orange-deep underline underline-offset-2"
          >
            {contactEmail}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="9. Children">
        <p>Nearr is not intended for children under 13.</p>
      </LegalSection>

      <LegalSection title="10. Security">
        <p>
          Nearr uses reasonable administrative, technical, and
          organizational safeguards, but no system is completely secure.
        </p>
      </LegalSection>

      <LegalSection title="11. Changes">
        <p>This policy may be updated over time.</p>
      </LegalSection>

      <LegalSection title="12. Contact">
        <p>
          Questions about privacy can be sent to{" "}
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
