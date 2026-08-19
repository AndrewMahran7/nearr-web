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
    <LegalLayout title="Privacy Policy" effectiveDate="August 19, 2026">
      <LegalSection title="1. Overview">
        <p>
          Nearr helps people save real-world places they discover online,
          see them on a map, and get reminded when they&apos;re nearby. This
          policy explains what information Nearr collects, how it&apos;s
          used, and the choices you have.
        </p>
      </LegalSection>

      <LegalSection title="2. Information you provide">
        <p>Nearr may collect information you provide directly, including:</p>
        <ul className="list-disc pl-5">
          <li>account information, such as your email address</li>
          <li>notes you add to saved places</li>
          <li>saved places and the links or content you shared to create them</li>
          <li>messages you send to support</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Information Nearr generates">
        <p>As you use Nearr, the app may generate and store:</p>
        <ul className="list-disc pl-5">
          <li>save and share events (what you saved, and when)</li>
          <li>
            recognition results — the place or places Nearr identified from
            shared content
          </li>
          <li>
            reminder and notification settings, and whether reminders were
            delivered
          </li>
          <li>
            app diagnostics and lightweight product analytics used to debug
            issues and improve reliability
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Shared social content">
        <p>
          When you share a video or post to Nearr — from Instagram, TikTok,
          Facebook, or elsewhere — Nearr may process information from that
          content to identify the real-world place or places it shows,
          including:
        </p>
        <ul className="list-disc pl-5">
          <li>the source URL</li>
          <li>the caption or description</li>
          <li>available location metadata</li>
          <li>the video or media itself</li>
          <li>audio from the video, including transcription</li>
          <li>text visible in the video&apos;s frames</li>
          <li>representative frames or images extracted from the video</li>
          <li>clues derived from any of the above</li>
        </ul>
        <p>
          Nearr uses this information only to identify and save the
          place(s) shown. Sharing content to Nearr doesn&apos;t give Nearr
          ownership over that content, and Nearr isn&apos;t the source of
          it — it belongs to whoever posted it.
        </p>
      </LegalSection>

      <LegalSection title="5. Automated and AI-assisted processing">
        <p>
          Nearr uses automated systems, which may include AI/machine-learning
          service providers, to analyze shared media and identify likely
          real-world places. This processing may not always be accurate —
          see the Terms of Service for more on that.
        </p>
        <p>
          Which providers power this analysis may change over time as the
          product evolves; this policy will be updated to reflect material
          changes.
        </p>
      </LegalSection>

      <LegalSection title="6. Location data">
        <p>
          Nearr uses location, where permitted, to reason about the places
          you&apos;ve saved and to power nearby reminders — for example, to
          check whether you&apos;re near a place you saved.
        </p>
        <p>
          Location access is controlled through iOS permissions. You can
          change or revoke location access at any time in Settings; if you
          do, nearby reminders may not work correctly.
        </p>
      </LegalSection>

      <LegalSection title="7. Notifications">
        <p>
          If enabled, Nearr may send nearby reminders and other service
          notifications. Delivery depends on your device, operating system,
          connectivity, and provider behavior, and isn&apos;t guaranteed.
        </p>
      </LegalSection>

      <LegalSection title="8. Website attribution">
        <p>
          The Nearr website may track how visitors arrive — for example,
          from a creator&apos;s link or a campaign — using UTM parameters, a
          creator identifier, a video/campaign identifier, or similar
          referral data included in the URL. This information may be stored
          in a first-party browser cookie for up to 90 days so it can be
          measured and, where relevant, connected to your later actions on
          the site (like tapping the App Store link).
        </p>
        <p>
          This attribution data is separate from the account and product
          data described above, and is used for measuring how people find
          Nearr — not to identify you personally.
        </p>
      </LegalSection>

      <LegalSection title="9. Service providers">
        <p>
          Nearr works with service providers to operate the app and
          website, which may include:
        </p>
        <ul className="list-disc pl-5">
          <li>
            Supabase, for backend services, authentication, and database
            storage
          </li>
          <li>Railway or other cloud infrastructure providers, for hosting backend services</li>
          <li>AI/model providers, to help analyze shared content and identify places</li>
          <li>
            Google Maps or Places APIs, and Apple Maps, to display maps,
            place details, and directions
          </li>
          <li>email delivery providers, to send sign-in and service emails</li>
          <li>
            analytics and diagnostic providers, to help understand and
            improve product reliability
          </li>
        </ul>
        <p>Nearr shares data with these providers only as needed to operate the product.</p>
      </LegalSection>

      <LegalSection title="10. Sharing and disclosure">
        <p>
          Nearr does not sell personal data. Nearr shares data only with the
          service providers described above, or when required by law, legal
          process, or to protect users, the service, or Nearr&apos;s legal
          rights.
        </p>
      </LegalSection>

      <LegalSection title="11. Retention">
        <p>
          Nearr retains information for as long as needed to provide the
          service, comply with legal obligations, resolve disputes, prevent
          abuse, and maintain reasonable operational and security records.
          When information is no longer needed for these purposes,
          it&apos;s deleted or anonymized.
        </p>
      </LegalSection>

      <LegalSection title="12. Account and data deletion">
        <p>
          You can delete your account directly from within the Nearr app.
          Deleting your account removes your saved places, notes, and
          account information, subject to the retention needs described
          above.
        </p>
        <p>
          If you have trouble deleting your account in-app, or have another
          privacy-related request, contact{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="text-orange-deep underline underline-offset-2"
          >
            {contactEmail}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="13. Children">
        <p>
          Nearr is not intended for children under 13, and Nearr does not
          knowingly collect information from children under 13.
        </p>
      </LegalSection>

      <LegalSection title="14. Security">
        <p>
          Nearr uses reasonable administrative, technical, and
          organizational safeguards to protect your information. No system
          is completely secure, and Nearr can&apos;t guarantee absolute
          security.
        </p>
      </LegalSection>

      <LegalSection title="15. Changes">
        <p>
          This policy may be updated from time to time. Material changes
          will be reflected here with an updated effective date.
        </p>
      </LegalSection>

      <LegalSection title="16. Contact">
        <p>
          Questions about this policy or your information can be sent to{" "}
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
