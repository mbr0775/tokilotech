"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import {
  ArrowUpRight,
  ExternalLink,
  FolderKanban,
  ImageIcon,
  Layers3,
  Search,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

import {
  SHOWCASE_SELECT,
  showcaseToProject,
  type Project,
  type ShowcaseRow,
} from "../../lib/project-showcase";

function ProjectSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div
      className={`overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.04] ${
        featured ? "md:col-span-2 lg:grid lg:grid-cols-[1.2fr_0.8fr]" : ""
      }`}
    >
      <div
        className={`animate-pulse bg-slate-200 dark:bg-white/10 ${
          featured ? "min-h-[320px]" : "aspect-[4/3]"
        }`}
      />
      <div className="space-y-4 p-6">
        <div className="h-5 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
        <div className="h-8 w-4/5 animate-pulse rounded-xl bg-slate-200 dark:bg-white/10" />
        <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-white/10" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-white/10" />
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      setLoading(true);
      setLoadError("");

      const { data, error } = await supabase
        .from("project_showcase")
        .select(SHOWCASE_SELECT)
        .eq("is_active", true)
        .order("sort_order")
        .order("created_at", { ascending: false });

      if (!isMounted) return;

      if (error) {
        setLoadError("We could not load the projects. Please try again.");
        setProjects([]);
      } else {
        setProjects((data as unknown as ShowcaseRow[]).map(showcaseToProject));
      }

      setLoading(false);
    };

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, [reload]);

  const projectCategories = useMemo(
    () => ["All", ...new Set(projects.map((project) => project.category))],
    [projects]
  );
  const categoryCounts = useMemo(
    () => Object.fromEntries(projectCategories.map((category) => [
      category,
      category === "All" ? projects.length : projects.filter((p) => p.category === category).length,
    ])),
    [projectCategories, projects]
  );

  const filteredProjects = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;

      const matchesSearch =
        normalizedQuery.length === 0 ||
        project.title.toLowerCase().includes(normalizedQuery) ||
        project.category.toLowerCase().includes(normalizedQuery) ||
        project.client_name?.toLowerCase().includes(normalizedQuery) ||
        project.description?.toLowerCase().includes(normalizedQuery);

      return matchesCategory && Boolean(matchesSearch);
    });
  }, [activeCategory, projects, searchQuery]);

  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden bg-[#f7f9fc] px-4 py-24 text-slate-950 transition-colors duration-300 dark:bg-[#080c14] dark:text-white sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(36,55,90,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(36,55,90,0.055)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_86%)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)]" />
      <div className="pointer-events-none absolute -right-32 top-10 -z-10 h-[32rem] w-[32rem] rounded-full bg-[#91BF48]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-36 bottom-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#24375a]/15 blur-[120px]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#24375a]/10 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#4b7a16] shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05] dark:text-[#a8d663]">
              <Sparkles size={14} />
              Selected Work
            </span>

            <h2 className="mt-6 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
              Digital products built to feel
              <span className="block bg-gradient-to-r from-[#24375a] via-[#496287] to-[#91BF48] bg-clip-text text-transparent dark:from-white dark:via-slate-300 dark:to-[#a8d663]">
                clear, useful and memorable.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
              Explore websites, mobile applications, dashboards, AI solutions,
              brand experiences and product mockups created for growing
              businesses.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-[310px]">
            <div className="rounded-3xl border border-white/80 bg-white/80 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05]">
              <p className="text-3xl font-black tracking-tight">{projects.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Projects
              </p>
            </div>
            <div className="rounded-3xl border border-white/80 bg-white/80 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05]">
              <p className="text-3xl font-black tracking-tight">
                {projects.filter((project) => project.is_featured).length}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Featured
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-[1.75rem] border border-white/80 bg-white/80 p-3 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045]">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div
              className="flex gap-2 overflow-x-auto pb-1 xl:pb-0"
              role="tablist"
              aria-label="Project categories"
            >
              {projectCategories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(category)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-2xl px-4 py-3 text-sm font-extrabold transition-all duration-300 ${
                      isActive
                        ? "bg-[#24375a] text-white shadow-lg shadow-[#24375a]/20 dark:bg-white dark:text-slate-950"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                    }`}
                  >
                    {category}
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] ${
                        isActive
                          ? "bg-white/15 text-white dark:bg-slate-950/10 dark:text-slate-800"
                          : "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-400"
                      }`}
                    >
                      {categoryCounts[category]}
                    </span>
                  </button>
                );
              })}
            </div>

            <label className="relative block xl:w-[290px]">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search projects..."
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#91BF48] focus:bg-white focus:ring-4 focus:ring-[#91BF48]/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:focus:bg-black/30"
              />
            </label>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 px-1">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
          {(activeCategory !== "All" || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="text-sm font-black text-[#4b7a16] transition hover:text-[#24375a] dark:text-[#a8d663] dark:hover:text-white"
            >
              Clear filters
            </button>
          )}
        </div>

        {loadError ? (
          <div role="alert" className="mt-8 rounded-2xl border border-red-200 bg-white p-8 text-center dark:border-red-900 dark:bg-white/5">
            <p>{loadError}</p>
            <button type="button" onClick={() => setReload((value) => value + 1)} className="mt-4 rounded-xl bg-[#91BF48] px-5 py-3 font-bold text-[#172033]">
              Try again
            </button>
          </div>
        ) : loading ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ProjectSkeleton featured />
            <ProjectSkeleton />
            <ProjectSkeleton />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center shadow-sm dark:border-white/15 dark:bg-white/[0.035]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#91BF48]/15 text-[#4b7a16] dark:text-[#a8d663]">
              <ImageIcon size={30} />
            </div>
            <h3 className="mt-5 text-2xl font-black">No matching projects</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
              Try a different category or search term to discover more work.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => {
              const sortedMedia = [...(project.project_media || [])].sort(
                (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
              );
              const coverImage =
                project.cover_url || sortedMedia[0]?.media_url || "";
              const isLeadCard = index === 0;

              return (
                <article
                  key={project.id}
                  className={`group relative isolate flex min-h-full overflow-hidden rounded-[1.75rem] border border-white/80 bg-white shadow-[0_24px_70px_-38px_rgba(15,23,42,0.4)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_35px_90px_-38px_rgba(36,55,90,0.5)] dark:border-white/10 dark:bg-[#0f1521] ${
                    isLeadCard
                      ? "md:col-span-2 lg:grid lg:grid-cols-[1.2fr_0.8fr]"
                      : "flex-col"
                  }`}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    aria-label={`View ${project.title}`}
                    className={`relative block overflow-hidden bg-slate-200 dark:bg-white/5 ${
                      isLeadCard ? "min-h-[330px] lg:min-h-[470px]" : "aspect-[4/3]"
                    }`}
                  >
                    {coverImage ? (
                      <img
                        src={coverImage}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.055]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-400">
                        <ImageIcon size={48} />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/5 to-transparent" />

                    <div className="absolute left-4 top-4 flex flex-wrap gap-2 sm:left-5 sm:top-5">
                      <span className="rounded-full border border-white/20 bg-slate-950/50 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-white backdrop-blur-xl">
                        {project.category}
                      </span>
                      {project.is_featured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#91BF48] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#172033]">
                          <Sparkles size={12} /> Featured
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-xl transition duration-300 group-hover:rotate-6 group-hover:bg-white group-hover:text-slate-950 sm:bottom-5 sm:right-5">
                      <ArrowUpRight size={20} />
                    </div>
                  </Link>

                  <div
                    className={`flex flex-1 flex-col p-6 sm:p-7 ${
                      isLeadCard ? "lg:justify-center lg:p-9" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                      <Layers3 size={14} />
                      {sortedMedia.length} media item
                      {sortedMedia.length === 1 ? "" : "s"}
                    </div>

                    <h3
                      className={`mt-4 font-black leading-tight tracking-[-0.025em] ${
                        isLeadCard ? "text-3xl sm:text-4xl" : "text-2xl"
                      }`}
                    >
                      <Link
                        href={`/projects/${project.slug}`}
                        className="transition hover:text-[#4b7a16] dark:hover:text-[#a8d663]"
                      >
                        {project.title}
                      </Link>
                    </h3>

                    {project.client_name && (
                      <p className="mt-2 text-sm font-bold text-[#4b7a16] dark:text-[#a8d663]">
                        For {project.client_name}
                      </p>
                    )}

                    <p
                      className={`mt-4 leading-7 text-slate-600 dark:text-slate-400 ${
                        isLeadCard ? "line-clamp-5 text-base" : "line-clamp-3 text-sm"
                      }`}
                    >
                      {project.description ||
                        "Project details and case study information will be available soon."}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-black text-[#24375a] transition hover:gap-3 dark:text-white"
                      >
                        View case study <ArrowUpRight size={16} />
                      </Link>

                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open live ${project.title} project`}
                          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-[#91BF48] hover:bg-[#91BF48]/10 hover:text-[#4b7a16] dark:border-white/10 dark:text-slate-400 dark:hover:text-[#a8d663]"
                        >
                          <ExternalLink size={17} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {!loading && projects.length > 0 && (
          <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-[2rem] bg-[#24375a] px-6 py-7 text-white shadow-[0_25px_70px_-35px_rgba(36,55,90,0.8)] sm:flex-row sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                <FolderKanban size={23} />
              </div>
              <div>
                <p className="font-black">Have a project in mind?</p>
                <p className="mt-1 text-sm text-white/65">
                  Let&apos;s turn your idea into a useful digital product.
                </p>
              </div>
            </div>
            <Link
              href="/shedule_contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#91BF48] px-5 py-3.5 text-sm font-black text-[#172033] transition hover:-translate-y-0.5 hover:bg-[#a8d663] sm:w-auto"
            >
              Start a conversation <ArrowUpRight size={17} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
