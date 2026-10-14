import PublicShell from "../ui/PublicShell";
import PageHero from "../ui/PageHero";
import LegalContent from "../ui/LegalContent";
export const metadata = {
  title: "Privacy Policy | Tokilo Technologies",
  description:
    "Tokilo Technologies Privacy Policy explains how we collect, use, protect, and manage your information.",
  alternates: { canonical: "/privacy-policy" },
};
export default function PolicyPage() {
  const sections = [
    {
      icon: "👤",
      title: "Information We Collect",
      content:
        "Tokilo Business Hub collects the account information you provide, including your name, email address, company and phone details. Google sign-in provides your Google account identity, email and profile information. Project requests and support conversations may contain business details and images you choose to upload. We also process your likes, online presence, notification read status and device push registration tokens. We do not request access to your contacts, location, SMS or call history.",
    },

    {
      icon: "⚙️",
      title: "How We Use Your Information",
      content:
        "We use account information to sign you in and manage your account; requests and messages to deliver services and customer support; presence and read receipts to support communication; and push registration tokens to deliver notifications. This app does not include advertising or an advertising analytics SDK.",
    },

    {
      icon: "🔒",
      title: "Data Storage & Security",
      content:
        "Account information and application records are stored in the shared Tokilo Supabase project. App requests use encrypted HTTPS connections. Access to private account records and chat attachments requires authentication and is governed by database and storage permissions. Keep your credentials private and contact us if you suspect unauthorized access.",
    },

    {
      icon: "☁️",
      title: "Third-Party Services",
      content:
        "Supabase processes authentication, database and storage information on our behalf. Resend delivers account confirmation and password-reset emails and processes the recipient email address and delivery information. Google supports Google sign-in, and Firebase Cloud Messaging processes device registration and notification delivery information. These providers may process data outside your country. Other customers are not intended recipients of your private project requests or support conversations.",
    },

    {
      icon: "🗑️",
      title: "Account Deletion",
      content:
        "Request permanent deletion from Profile → Delete account in Tokilo Business Hub, or use the account-deletion page linked below without reinstalling the app. Deletion covers your account and associated personal records, requests, support messages and chat attachments. Records are kept while needed to provide the service; if a specific record must be retained for a legal obligation, we explain the reason when processing your request.",
    },

    {
      icon: "👶",
      title: "Children's Privacy",
      content:
        "Tokilo Business Hub is designed for adult business users and is not intended for children. Contact us if you believe a child has submitted personal information through the service.",
    },

    {
      title: "Your choices",
      content: "You can decline notifications in your device settings, choose which images to share through the system photo picker, and request access, correction or deletion of your account information through Tokilo support. Google account access can also be managed through your Google account settings.",
    },
    {
      icon: "🔄",
      title: "Policy Updates",
      content:
        "We may update this Privacy Policy when necessary. Any changes will be published on this page with an updated revision date.",
    },
  ];

  return (
    <PublicShell>
      <PageHero
        showFilm={false}
        eyebrow="Tokilo / Policies"
        title="Privacy Policy"
        accent="Clear by design."
        description="Your privacy and business data security are important to us. Learn how Tokilo collects, uses, and protects your information."
        action="Read the policy"
        href="#policy-0"
      />
      <LegalContent sections={sections} privacy={true} />
    </PublicShell>
  );
}
