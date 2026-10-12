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
        "When you use Tokilo Business Hub, we may collect account information such as your name, email address, company details, phone number, and business information that you provide through the application.",
    },

    {
      icon: "⚙️",
      title: "How We Use Your Information",
      content:
        "We use your information to provide Tokilo services, authenticate your account, manage business workflows, improve application performance, communicate important updates, and provide customer support.",
    },

    {
      icon: "🔒",
      title: "Data Storage & Security",
      content:
        "Tokilo uses secure cloud infrastructure and industry-standard security practices to protect user information from unauthorized access, misuse, or loss.",
    },

    {
      icon: "☁️",
      title: "Third-Party Services",
      content:
        "Tokilo uses trusted technology providers such as Supabase for authentication and database services and Firebase services for application notifications.",
    },

    {
      icon: "🗑️",
      title: "Account Deletion",
      content:
        "Users can permanently delete their Tokilo account directly from the application. Account deletion removes the associated user account according to our deletion process.",
    },

    {
      icon: "👶",
      title: "Children's Privacy",
      content:
        "Tokilo Business Hub is designed for business users and is not intended for children below the applicable legal age.",
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
