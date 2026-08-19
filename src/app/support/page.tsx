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
              A place wasn&apos;t identified correctly
            </h3>
            <p>
              Nearr analyzes the video or post you share — what&apos;s
              visible, what&apos;s said, what&apos;s written, and any
              location clues available — to identify the real-world place
              or places it shows. Some videos show more than one place;
              when that happens, Nearr may surface more than one match.
              Some videos don&apos;t have enough to go on, or the wrong
              place gets picked.
            </p>
            <p>
              If this happens, you can choose a different place manually,
              or contact support with the link so we can review it.
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
              You can delete your account directly from within Nearr. If
              you run into trouble doing that, or have another
              privacy-related request, email{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="text-orange-deep underline underline-offset-2"
              >
                {contactEmail}
              </a>{" "}
              and we&apos;ll help.
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection title="Privacy">
        <p>
          Nearr only uses your information to provide the app&apos;s core
          features, including identifying and saving places, showing them
          on your map, and helping with nearby reminders. For more details,
          see the{" "}
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
