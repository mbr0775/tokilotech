"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowRight, ExternalLink, Filter, ImageIcon, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type ProjectCategory =
  | "All"
  | "Website"
  | "Mobile App"
  | "AI Solution"
  | "Dashboard"
  | "Branding"
  | "Mockup";

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
  category: Exclude<ProjectCategory, "All">;
  client_name: string | null;
  description: string | null;
  live_url: string | null;
  github_url: string | null;
  cover_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  project_media?: ProjectMedia[];
};

const projectCategories: ProjectCategory[] = [
  "All",
  "Website",
  "Mobile App",
  "AI Solution",
  "Dashboard",
  "Branding",
  "Mockup",
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("projects")
        .select("*, project_media(*)")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Project loading error:", error.message);
        setProjects([]);
      } else {
        setProjects((data as Project[]) || []);
      }

      setLoading(false);
    };

    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-white px-4 py-20 text-slate-950 transition-colors duration-300 dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 dark:text-white md:px-8 lg:px-16"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 h-72 w-72 rounded-full bg-[#24375a]/10 blur-3xl dark:bg-[#24375a]/20"></div>
        <div className="absolute bottom-1/4 left-1/4 h-72 w-72 rounded-full bg-[#91BF48]/10 blur-3xl dark:bg-[#91BF48]/10"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#24375a]/20 bg-slate-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#91BF48] shadow-sm dark:border-[#24375a]/50 dark:bg-[#24375a]/20">
            <Filter size={14} />
            Project Showcase
          </span>

          <h2 className="mb-5 text-4xl font-black md:text-6xl">
            Our{" "}
            <span className="bg-gradient-to-r from-[#24375a] to-[#91BF48] bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-base leading-relaxed text-slate-600 dark:text-gray-400 md:text-xl">
            View our websites, mobile apps, AI dashboards, mockups, and client
            project showcases uploaded from the admin panel.
          </p>
        </div>

        <div className="mb-10 overflow-x-auto pb-3">
          <div className="flex min-w-max items-center justify-center gap-3">
            {projectCategories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#24375a] to-[#4a5f8a] text-white shadow-lg shadow-[#24375a]/20"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-[#24375a] hover:text-[#24375a] dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-[#91BF48] dark:hover:text-[#91BF48]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <Loader2 className="mr-3 animate-spin text-[#91BF48]" size={24} />
            <span className="font-bold">Loading projects...</span>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center dark:border-gray-700 dark:bg-gray-900">
            <ImageIcon className="mx-auto mb-4 text-[#91BF48]" size={44} />
            <h3 className="text-2xl font-black">No projects found</h3>
            <p className="mt-2 text-slate-600 dark:text-gray-400">
              Upload projects from the admin panel or select another category.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto pb-6">
              <div className="flex gap-6">
                {filteredProjects.map((project) => {
                  const sortedMedia = [...(project.project_media || [])].sort(
                    (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
                  );

                  const coverImage =
                    project.cover_url || sortedMedia[0]?.media_url || "";

                  return (
                    <article
                      key={project.id}
                      className="group min-w-[85%] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:border-[#24375a]/40 hover:shadow-2xl dark:border-gray-800 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:hover:border-[#24375a] sm:min-w-[420px] lg:min-w-[440px]"
                    >
                      <Link href={`/projects/${project.slug}`}>
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-gray-800">
                          {coverImage ? (
                            <img
                              src={coverImage}
                              alt={project.title}
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <ImageIcon className="text-slate-400" size={46} />
                            </div>
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80"></div>

                          <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-black text-[#24375a] backdrop-blur-md dark:bg-gray-950/90 dark:text-[#91BF48]">
                            {project.category}
                          </div>

                          <div className="absolute bottom-5 left-5 right-5">
                            <h3 className="text-2xl font-black text-white">
                              {project.title}
                            </h3>

                            {project.client_name && (
                              <p className="mt-1 text-sm font-medium text-white/80">
                                {project.client_name}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>

                      <div className="p-6">
                        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-gray-400">
                          {project.description || "Project details will be updated soon."}
                        </p>

                        <div className="flex flex-col gap-3 sm:flex-row">
                          <Link
                            href={`/projects/${project.slug}`}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#24375a] to-[#4a5f8a] px-5 py-3 text-sm font-bold text-white transition hover:scale-105"
                          >
                            View Details <ArrowRight size={16} />
                          </Link>

                          {project.live_url && (
                            <a
                              href={project.live_url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-[#91BF48] hover:text-[#91BF48] dark:border-gray-700 dark:text-white"
                            >
                              Live Project <ExternalLink size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <p className="mt-2 text-center text-sm font-semibold text-slate-500 dark:text-gray-400">
              Scroll sideways to view more projects.
            </p>
          </>
        )}
      </div>
    </section>
  );
}