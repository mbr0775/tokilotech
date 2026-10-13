import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { supabasePublic } from "../../../lib/supabasePublicClient";
import {
  SHOWCASE_SELECT,
  isShowcaseId,
  showcaseToProject,
  type ShowcaseRow,
} from "../../../lib/project-showcase";
import PublicShell from "../../ui/PublicShell";
import Contact from "../../contact/contact";
import ProjectGallery from "./ProjectGallery";
import styles from "./detail.module.css";
import ui from "../../design.module.css";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
const loadProject = cache(async (slug: string) => {
  if (!isShowcaseId(slug)) return null;
  const { data, error } = await supabasePublic
    .from("project_showcase")
    .select(SHOWCASE_SELECT)
    .eq("id", slug)
    .eq("is_active", true)
    .single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error("Unable to load the project showcase.");
  }
  return data ? showcaseToProject(data as unknown as ShowcaseRow) : null;
});
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await loadProject(slug);
  if (!project)
    return {
      title: "Project Not Found | Tokilo Technologies",
      robots: { index: false },
    };
  return {
    title: `${project.title} | Tokilo Technologies Project`,
    description:
      project.description?.slice(0, 160) ||
      `Explore ${project.title}, a ${project.category} project by Tokilo Technologies.`,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: project.title,
      description: project.description?.slice(0, 160),
      ...(project.cover_url
        ? { images: [{ url: project.cover_url, alt: project.title }] }
        : {}),
    },
  };
}
export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params;
  const project = await loadProject(slug);
  if (!project) notFound();
  const sortedMedia = [...(project.project_media || [])].sort(
    (a, b) => (a.sort_order || 0) - (b.sort_order || 0),
  );
  const cover = project.cover_url || sortedMedia[0]?.media_url || "";
  const gallery = [...sortedMedia];
  if (cover && !gallery.some((m) => m.media_url === cover))
    gallery.unshift({
      id: `cover-${project.id}`,
      media_url: cover,
      media_type: "image",
      alt_text: `${project.title} cover`,
      sort_order: -1,
    });
  const date = project.created_at
    ? new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(
        new Date(project.created_at),
      )
    : null;
  return (
    <PublicShell>
      <section className={styles.section}>
        <Link href="/projects" className={ui.textLink}>
          <ArrowLeft size={16} />
          All projects
        </Link>
        <div className={styles.layout}>
          <div className={styles.summary}>
            <span className={styles.eyebrow}>
              Case study / {project.category}
            </span>
            <h1>{project.title}</h1>
            <p className={styles.description}>
              {project.description ||
                "Explore the uploaded screens and product details."}
            </p>
            {(project.live_url || project.github_url) && (
              <div className={styles.links}>
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className={ui.pill}
                  >
                    <ExternalLink size={17} />
                    View live project
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className={ui.pill}
                  >
                    <Github size={17} />
                    View source
                  </a>
                )}
              </div>
            )}
            <dl className={styles.facts}>
              {project.client_name && (
                <div>
                  <dt>Client</dt>
                  <dd>{project.client_name}</dd>
                </div>
              )}
              <div>
                <dt>Discipline</dt>
                <dd>{project.category}</dd>
              </div>
              {date && (
                <div>
                  <dt>Published</dt>
                  <dd>{date}</dd>
                </div>
              )}
              <div>
                <dt>Inside the project</dt>
                <dd>
                  {gallery.length} media item{gallery.length === 1 ? "" : "s"}
                </dd>
              </div>
            </dl>
          </div>

          <div className={styles.gallery}>
            <h2>Project gallery</h2>
            <ProjectGallery media={gallery} projectTitle={project.title} />
          </div>
        </div>
      </section>
      <Contact />
    </PublicShell>
  );
}
