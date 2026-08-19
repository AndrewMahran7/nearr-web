import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/legal/LegalLayout";
import { SUPPORT_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with Nearr — contact info and answers to common questions.",
};

const contactEmail = SUPPORT_EMAIL;

export default function SupportPage() {
  return (
    <LegalLayout title="Support">
      <LegalSection title="Contact">
        <p>
          For support, feedback, bug reports, or questions, email:
        </p>
        <p>
          <a
            href={`mailto:${contactEmail}`}
            className="text-lg font-semibold text-orange-deep"
          >
            {contactEmail}
          </a>
        </p>
        <p>We try to respond as quickly as possible.</p>
      </LegalSection>

      <LegalSection title="What to include">
        <p>
          When contacting support, please include as much detail as you
          can:
        </p>
        <ul className="list-disc pl-5">
          <li>What you were trying to do</li>
          <li>What went wrong</li>
          <li>The link you were trying to save, if relevant</li>
          <li>Your device model</li>
          <li>Your iOS version</li>
          <li>Any screenshots or screen recordings that help explain the issue</li>
        </ul>
      </LegalSection>

      <LegalSection title="Common issues">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="mb-1 text-sm font-semibold text-ink">
              A place was not found correctly
            </h3>
            <p>
              Nearr uses information from shared links to help identify
              real-world places. Sometimes a post may not include enough
              information, or the wrong place may be detected.
            </p>
            <p>
              If this happens, you can choose a different place manually or
              contact support with the link so we can review it.
            </p>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-semibold text-ink">
              Notifications or nearby reminders are not working
            </h3>
            <p>
              Nearby reminders require notification permission and location
              permission. You can check these in your device settings:
            </p>
            <p className="font-medium text-ink">
              Settings → Nearr → Notifications
              <br />
              Settings → Nearr → Location
            </p>
            <p>
              If permissions are enabled and reminders still are not
              working, contact support.
            </p>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-semibold text-ink">
              I want to delete my account or data
            </h3>
            <p>
              Email{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="text-orange-deep underline underline-offset-2"
              >
                {contactEmail}
              </a>{" "}
              with your request, and we will help you delete your account or
              related data.
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection title="Privacy">
        <p>
          Nearr only uses your information to provide the app&apos;s core
          features, including saving places, showing them on your map, and
          helping with nearby reminders. For more details, see the{" "}
          <a
            href="/privacy"
            className="text-orange-deep underline underline-offset-2"
          >
            Privacy Policy
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
