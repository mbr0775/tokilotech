/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  ExternalLink,
  Github,
  ImageIcon,
  Layers3,
  Sparkles,
  UserRound,
} from "lucide-react";
import { supabasePublic } from "../../../lib/supabasePublicClient";
import { SHOWCASE_SELECT, isShowcaseId, showcaseToProject, type ShowcaseRow } from "../../../lib/project-showcase";
import ProjectGallery from "./ProjectGallery";

export const dynamic = "force-dynamic";

type ProjectDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { slug } = await params;

  if (!isShowcaseId(slug)) notFound();

  const { data, error } = await supabasePublic
    .from("project_showcase")
    .select(SHOWCASE_SELECT)
    .eq("id", slug)
    .eq("is_active", true)
    .single();

  if (error) {
    if (error.code === "PGRST116") notFound();
    throw new Error("Unable to load the project showcase.");
  }
  if (!data) notFound();

  const project = showcaseToProject(data as unknown as ShowcaseRow);
  const sortedMedia = [...(project.project_media || [])].sort(
    (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
  );
  const coverImage = project.cover_url || sortedMedia[0]?.media_url || "";
  const galleryMedia = [...sortedMedia];

  if (
    coverImage &&
    !galleryMedia.some((media) => media.media_url === coverImage)
  ) {
    galleryMedia.unshift({
      id: `cover-${project.id}`,
      media_url: coverImage,
      media_type: "image",
      alt_text: `${project.title} cover`,
      sort_order: -1,
    });
  }

  const publishedDate = project.created_at
    ? new Intl.DateTimeFormat("en", {
        month: "short",
        year: "numeric",
      }).format(new Date(project.created_at))
    : "Recently";

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-950 transition-colors dark:bg-[#080c14] dark:text-white">
      <section className="relative isolate px-4 pb-14 pt-5 sm:px-6 lg:px-8 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(36,55,90,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(36,55,90,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
        <div className="pointer-events-none absolute -right-44 top-10 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#91BF48]/10 blur-[120px]" />
        <div className="pointer-events-none absolute -left-44 bottom-0 -z-10 h-[32rem] w-[32rem] rounded-full bg-[#24375a]/15 blur-[120px]" />

        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-4 py-3">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2.5 text-sm font-black text-slate-700 shadow-sm backdrop-blur-xl transition hover:-translate-x-1 hover:border-[#24375a] hover:text-[#24375a] dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300 dark:hover:border-[#91BF48] dark:hover:text-[#a8d663]"
            >
              <ArrowLeft size={17} />
              All projects
            </Link>

            <span className="hidden text-xs font-bold uppercase tracking-[0.18em] text-slate-400 sm:block">
              Tokilo Technologies / Case Study
            </span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#91BF48]/15 px-4 py-2 text-xs font-black uppercase tracking-[0.17em] text-[#4b7a16] dark:text-[#a8d663]">
                  {project.category}
                </span>
                {project.is_featured && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.17em] text-slate-600 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
                    <Sparkles size={13} /> Featured work
                  </span>
                )}
              </div>

              <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
                {project.title}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
                {project.description ||
                  "Project details and case study information will be available soon."}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#24375a] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#24375a]/20 transition hover:-translate-y-0.5 hover:bg-[#304976]"
                  >
                    View live project <ExternalLink size={17} />
                  </a>
                )}

                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-6 py-3.5 text-sm font-black text-slate-800 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#91BF48] hover:text-[#4b7a16] dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:text-[#a8d663]"
                  >
                    View source <Github size={17} />
                  </a>
                )}
              </div>
            </div>

            <aside className="rounded-[1.75rem] border border-white/80 bg-white/80 p-5 shadow-[0_25px_70px_-38px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045] lg:sticky lg:top-6">
              <p className="px-1 text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                Project overview
              </p>

              <dl className="mt-4 divide-y divide-slate-200/80 dark:divide-white/10">
                <div className="flex items-center gap-4 py-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#24375a]/10 text-[#24375a] dark:bg-white/10 dark:text-white">
                    <UserRound size={18} />
                  </span>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                      Client
                    </dt>
                    <dd className="mt-1 font-black">
                      {project.client_name || "Confidential client"}
                    </dd>
                  </div>
                </div>

                <div className="flex items-center gap-4 py-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#24375a]/10 text-[#24375a] dark:bg-white/10 dark:text-white">
                    <Layers3 size={18} />
                  </span>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                      Gallery
                    </dt>
                    <dd className="mt-1 font-black">
                      {galleryMedia.length} media item
                      {galleryMedia.length === 1 ? "" : "s"}
                    </dd>
                  </div>
                </div>

                <div className="flex items-center gap-4 py-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#24375a]/10 text-[#24375a] dark:bg-white/10 dark:text-white">
                    <CalendarDays size={18} />
                  </span>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                      Published
                    </dt>
                    <dd className="mt-1 font-black">{publishedDate}</dd>
                  </div>
                </div>
              </dl>
            </aside>
          </div>

          <div className="group relative mt-10 overflow-hidden rounded-[2rem] border border-white/80 bg-slate-200 shadow-[0_35px_100px_-45px_rgba(15,23,42,0.6)] dark:border-white/10 dark:bg-white/5 lg:mt-14">
            <div className="aspect-[16/9] min-h-[280px] max-h-[720px] w-full">
              {coverImage ? (
                <img
                  src={coverImage}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-full min-h-[360px] items-center justify-center text-slate-400">
                  <ImageIcon size={56} />
                </div>
              )}
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
            {coverImage && (
              <a
                href={coverImage}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/50 px-4 py-2.5 text-xs font-black text-white backdrop-blur-xl transition hover:bg-white hover:text-slate-950"
              >
                Open cover <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_0.65fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#4b7a16] dark:text-[#a8d663]">
                Visual walkthrough
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-5xl">
                Explore the project experience.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400 lg:justify-self-end">
              Browse the uploaded screens, mockups and videos. Use the
              thumbnails, arrow keys or full-screen viewer for a closer look.
            </p>
          </div>

          <ProjectGallery media={galleryMedia} projectTitle={project.title} />

          <div className="mt-14 overflow-hidden rounded-[2rem] bg-[#24375a] p-7 text-white shadow-[0_30px_80px_-40px_rgba(36,55,90,0.9)] sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#a8d663]">
                  Build with Tokilo
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-[-0.03em] sm:text-4xl">
                  Ready to create your next digital product?
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
                  Tell us about your idea, business goal or workflow challenge.
                  We&apos;ll help shape the right solution.
                </p>
              </div>
              <Link
                href="/shedule_contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#91BF48] px-6 py-4 text-sm font-black text-[#172033] transition hover:-translate-y-0.5 hover:bg-[#a8d663]"
              >
                Start your project <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
