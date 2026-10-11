import PublicShell from "../ui/PublicShell";
import PageHero from "../ui/PageHero";
import LegalContent from "../ui/LegalContent";
export const metadata = {
  title: "Terms & Conditions | Tokilo Technologies",
  description:
    "Tokilo Technologies Terms and Conditions for using Tokilo Business Hub.",
  alternates: { canonical: "/terms-and-conditions" },
};
export default function PolicyPage() {
  const sections = [
    {
      icon: "📋",
      title: "Acceptance of Terms",
      content:
        "By accessing or using Tokilo Business Hub, you agree to comply with these Terms and Conditions. If you do not agree with these terms, please do not use our services.",
    },

    {
      icon: "🚀",
      title: "About Tokilo Business Hub",
      content:
        "Tokilo Business Hub is a business operating ecosystem designed to help organizations manage workflows, projects, communication, and business operations.",
    },

    {
      icon: "👤",
      title: "User Accounts",
      content:
        "Users are responsible for maintaining the confidentiality of their account information and ensuring that provided information is accurate and up to date.",
    },

    {
      icon: "🏢",
      title: "Business Data",
      content:
        "Users remain responsible for the business information they submit through Tokilo. Users should only upload information that they have the right to use.",
    },

    {
      icon: "🔐",
      title: "Account Security",
      content:
        "Users must protect their login credentials and immediately notify Tokilo Technologies if they suspect unauthorized access to their account.",
    },

    {
      icon: "🗑️",
      title: "Account Termination",
      content:
        "Users may delete their account through the Tokilo application. Tokilo Technologies may restrict access when required to protect platform security or comply with legal obligations.",
    },

    {
      icon: "⚖️",
      title: "Limitation of Liability",
      content:
        "Tokilo Technologies provides the platform on an as-available basis and does not guarantee that the service will always be uninterrupted or error-free.",
    },

    {
      icon: "🔄",
      title: "Changes to Terms",
      content:
        "Tokilo Technologies may update these Terms and Conditions when improvements, legal requirements, or service changes occur.",
    },
  ];

  return (
    <PublicShell>
      <PageHero
        eyebrow="Tokilo / Policies"
        title="Terms & Conditions"
        accent="A shared understanding."
        description="The terms and conditions for accessing and using Tokilo Business Hub."
        action="Read the policy"
        href="#policy-0"
      />
      <LegalContent sections={sections} privacy={false} />
    </PublicShell>
  );
}
