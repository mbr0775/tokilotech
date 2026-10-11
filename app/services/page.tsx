import type { Metadata } from "next";
import PublicShell from "../ui/PublicShell";
import PageHero from "../ui/PageHero";
import Services from "./services";
import BuildExperience from "../motion/BuildExperience";
import Contact from "../contact/contact";
export const metadata: Metadata = {
  title: "Web, Mobile & AI Development Services | Tokilo Technologies",
  description:
    "Explore Tokilo's web application, mobile app, backend, analytics, automation and AI development services. Discuss the right solution for your business.",
  alternates: { canonical: "/services" },
};
export default function ServicesPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="02 / Our capabilities"
        title="Built around"
        accent="your next move."
        description="From the first screen to the systems behind it, we create connected software that helps your business work better."
        action="Explore capabilities"
        href="#services"
      />
      <Services />
      <BuildExperience />
      <Contact />
    </PublicShell>
  );
}
