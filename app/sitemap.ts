import type { MetadataRoute } from "next";
import { getPublicProjects } from "../lib/public-projects";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.tokilotech.com";
  const { projects } = await getPublicProjects();
  const paths = [
    "",
    "/about",
    "/services",
    "/projects",
    "/shedule_contact",
    "/privacy-policy",
    "/delete-account",
    "/terms-and-conditions",
  ];
  return [
    ...paths.map((path) => ({
      url: `${base}${path}`,
      changeFrequency: (path === "" || path === "/projects"
        ? "weekly"
        : "monthly") as "weekly" | "monthly",
      priority: path === "" ? 1 : 0.7,
    })),
    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      ...(project.created_at
        ? { lastModified: new Date(project.created_at) }
        : {}),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
