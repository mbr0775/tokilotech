/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, ImageIcon } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import ProjectGallery from "./ProjectGallery";

type ProjectMedia = {
  id: string;
  media_url: string;
  media_type: "image" | "video" | "mockup";
  alt_text: string | null;
  sort_order: number | null;
};

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  client_name: string | null;
  description: string | null;
  live_url: string | null;
  github_url: string | null;
  cover_url: string | null;
  is_published: boolean;
  project_media?: ProjectMedia[];
};

type ProjectDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("projects")
    .select("*, project_media(*)")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !data) {
    notFound();
  }

  const project = data as Project;

  const sortedMedia = [...(project.project_media || [])].sort(
    (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
  );

  const coverImage = project.cover_url || sortedMedia[0]?.media_url || "";

  return (
    <main className="min-h-screen bg-white text-slate-950 dark:bg-gray-950 dark:text-white">
      {/* Project Hero */}
      <section className="relative overflow-hidden px-4 pb-12 pt-6 sm:px-6 lg:px-8 lg:pb-16">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute right-10 top-20 h-64 w-64 rounded-full bg-[#24375a]/10 blur-3xl"></div>
          <div className="absolute bottom-10 left-0 h-64 w-64 rounded-full bg-[#91BF48]/10 blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <Link
            href="/#projects"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-[#24375a] hover:text-[#24375a] dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-[#91BF48] dark:hover:text-[#91BF48]"
          >
            <ArrowLeft size={17} />
            Back to Projects
          </Link>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            {/* Left Content Card */}
            <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/90 dark:shadow-black/20 sm:p-8">
              <span className="mb-5 inline-flex rounded-full bg-[#91BF48]/15 px-4 py-2 text-xs font-black uppercase tracking-widest text-[#4b7a16] dark:text-[#91BF48]">
                {project.category}
              </span>

              <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>

              <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-gray-400 sm:text-lg">
                {project.description || "Project details will be updated soon."}
              </p>

              {project.client_name && (
                <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-gray-400">
                    Client
                  </p>
                  <p className="mt-1 text-xl font-black">
                    {project.client_name}
                  </p>
                </div>
              )}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#24375a] to-[#4a5f8a] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#24375a]/20 transition hover:scale-105"
                  >
                    Visit Live Project
                    <ExternalLink size={17} />
                  </a>
                )}

                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-black text-slate-800 transition hover:border-[#91BF48] hover:text-[#91BF48] dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  >
                    GitHub
                    <Github size={17} />
                  </a>
                )}
              </div>
            </div>

            {/* Right Image Card */}
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-2xl shadow-slate-300/50 dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/30">
              {coverImage ? (
                <div>
                  <a href={coverImage} target="_blank" rel="noreferrer">
                    <img
                      src={coverImage}
                      alt={project.title}
                      className="h-[280px] w-full bg-slate-100 object-contain p-3 transition hover:scale-[1.02] dark:bg-gray-900 sm:h-[360px] lg:h-[430px]"
                    />
                  </a>

                  <div className="border-t border-slate-200 bg-white p-4 text-center dark:border-gray-800 dark:bg-gray-950">
                    <a
                      href={coverImage}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-xs font-black text-slate-700 transition hover:border-[#24375a] hover:text-[#24375a] dark:border-gray-700 dark:text-gray-300 dark:hover:border-[#91BF48] dark:hover:text-[#91BF48]"
                    >
                      View Full Image
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex h-[280px] items-center justify-center sm:h-[360px] lg:h-[430px]">
                  <ImageIcon size={50} className="text-slate-400" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-[#91BF48]">
                Project Gallery
              </p>

              <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                Screenshots, Mockups & Videos
              </h2>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-slate-500 dark:text-gray-400">
              Explore uploaded project visuals, mockups, screenshots, and demo
              videos. Click any image to view it fully.
              <span className="mt-2 block text-xs font-bold text-[#91BF48]">
                Use the arrow buttons to view next or previous image.
              </span>
            </p>
          </div>

          <ProjectGallery media={sortedMedia} projectTitle={project.title} />
        </div>
      </section>
    </main>
  );
}