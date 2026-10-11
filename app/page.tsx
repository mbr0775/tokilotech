// app/page.tsx
import type { Metadata } from "next";
import HomeScreen from "./homescreen/homescreen";
import About from "./about/about";
import Stakeholders from "./stackholder/stackholder";
import Services from "./services/services";
import Projects from "./projects/projects";
import Contact from "./contact/contact";
import BuildExperience from "./motion/BuildExperience";
import PublicShell from "./ui/PublicShell";
import { getPublicProjects } from "../lib/public-projects";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Web Development, Mobile Apps & AI | Tokilo Technologies",
  description:
    "Tokilo Technologies builds fast websites, mobile apps and practical AI solutions for startups and growing businesses. Explore our services and start your project.",
  alternates: { canonical: "/" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.tokilotech.com/#organization",
      name: "Tokilo Technologies",
      url: "https://www.tokilotech.com",
      logo: "https://www.tokilotech.com/tokilotechlogo.png",
      email: "mubassirnasar@gmail.com",
      telephone: "+94705373833",
      parentOrganization: { "@type": "Organization", name: "MBR Group" },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.tokilotech.com/#website",
      name: "Tokilo Technologies",
      url: "https://www.tokilotech.com",
      publisher: { "@id": "https://www.tokilotech.com/#organization" },
    },
  ],
};

export default async function Page() {
  const initial = await getPublicProjects();
  return (
    <PublicShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <HomeScreen />
      <About />
      <Projects
        initialProjects={initial.projects}
        initialError={initial.error}
      />
      <Services />
      <BuildExperience />
      <Stakeholders />
      <Contact />
    </PublicShell>
  );
}
