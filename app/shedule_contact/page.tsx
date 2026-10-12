import type { Metadata } from "next";
import PublicShell from "../ui/PublicShell";
import PageHero from "../ui/PageHero";
import ConsultationForm from "./ConsultationForm";
export const metadata: Metadata = {
  title: "Contact & Project Consultation | Tokilo Technologies",
  description:
    "Discuss your website, mobile app, AI or software project with Tokilo Technologies. Share your requirements and request a consultation.",
  alternates: { canonical: "/shedule_contact" },
};
export default function ContactPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="04 / Make the first move"
        title="Let's build"
        accent="what's next."
        description="An idea, a business challenge, or a fresh start. Every great product begins with a conversation."
        action="Tell us about your project"
        href="#consultation"
      />
      <div id="consultation" data-video-background="growth">
        <ConsultationForm />
      </div>
    </PublicShell>
  );
}
