import type { Metadata } from "next";
import PublicShell from "../ui/PublicShell";
import PageHero from "../ui/PageHero";
import Projects from "./projects";
import { getPublicProjects } from "../../lib/public-projects";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Projects & Digital Product Portfolio | Tokilo Technologies",
  description:
    "Explore Tokilo Technologies' published websites, applications and digital products. View project details, product screens and live experiences.",
  alternates: { canonical: "/projects" },
};
export default async function ProjectsPage() {
  const initial = await getPublicProjects();
  return (
    <PublicShell>
      <PageHero
        eyebrow="03 / Selected work"
        title="Ideas made"
        accent="real."
        description="A closer look at the digital products we build. Explore the interfaces, details, and thinking behind our published work."
        action="Browse projects"
        href="#projects"
      />
      <Projects
        initialProjects={initial.projects}
        initialError={initial.error}
      />
    </PublicShell>
  );
}
