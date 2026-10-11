import type { Metadata } from "next";
import PublicShell from "../ui/PublicShell";
import PageHero from "../ui/PageHero";
import About from "./about";
import Stakeholders from "../stackholder/stackholder";
import BuildExperience from "../motion/BuildExperience";
export const metadata: Metadata = {
  title: "About Tokilo Technologies | Software & AI Company",
  description:
    "Meet Tokilo Technologies, an MBR Group company creating websites, mobile apps and practical AI solutions with product thinking and dependable engineering.",
  alternates: { canonical: "/about" },
};
export default function AboutPage() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="01 / The studio"
        title="Small beginnings."
        accent="Big possibilities."
        description="We bring design, engineering, and practical AI together to turn business challenges into useful digital experiences."
        action="Explore our work"
        href="/projects"
      />
      <About />
      <BuildExperience />
      <Stakeholders />
    </PublicShell>
  );
}
