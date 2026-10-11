import type { Metadata } from "next";
import PublicShell from "./ui/PublicShell";
import PageHero from "./ui/PageHero";
export const metadata: Metadata = {
  title: "Page Not Found | Tokilo Technologies",
  robots: { index: false },
};
export default function NotFound() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="404 / A different direction"
        title="A little lost?"
        accent="Let's find your way."
        description="The page you're looking for doesn't exist or has moved. Explore Tokilo's services, work, and digital possibilities from the home page."
        action="Back to home"
        href="/"
      />
    </PublicShell>
  );
}
