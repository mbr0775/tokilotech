"use client";

import Link from "next/link";
import { ArrowUpRight, ImageIcon, RefreshCw, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import {
  SHOWCASE_SELECT,
  showcaseToProject,
  type Project,
  type ShowcaseRow,
} from "../../lib/project-showcase";
import styles from "../design.module.css";
import ProjectPreview from "./ProjectPreview";
import showcase from "./showcase.module.css";

export default function Projects({
  initialProjects,
  initialError = "",
}: {
  initialProjects?: Project[];
  initialError?: string;
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>(initialProjects ?? []);
  const [loading, setLoading] = useState(initialProjects === undefined);
  const [loadError, setLoadError] = useState(initialError);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    if (reload === 0 && initialProjects !== undefined) return;
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
  }, [reload, initialProjects]);

  const projectCategories = useMemo(
    () => ["All", ...new Set(projects.map((project) => project.category))],
    [projects],
  );
  const categoryCounts = useMemo(
    () =>
      Object.fromEntries(
        projectCategories.map((category) => [
          category,
          category === "All"
            ? projects.length
            : projects.filter((p) => p.category === category).length,
        ]),
      ),
    [projectCategories, projects],
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
      aria-labelledby="projects-heading"
      className={showcase.section}
    >
      <div className={showcase.container}>
        <div className={showcase.header}>
          <div data-scroll-reveal="left">
            <span className={showcase.eyebrow}>
              Selected work / Tokilo Technologies
            </span>
            <h2 id="projects-heading" className={showcase.heading}>
              A closer look at <span>what we build.</span>
            </h2>
          </div>
          <div className={showcase.headerAside} data-scroll-reveal="right">
            {!loadError && !loading && (
              <div className={showcase.total}>
                <strong>{String(projects.length).padStart(2, "0")}</strong>
                <span>Published projects</span>
              </div>
            )}
            <p className={showcase.intro}>
              Websites, applications and digital experiences. Explore the work,
              one project at a time.
            </p>
          </div>
        </div>
        {!loadError && (
          <div className={showcase.filters} data-scroll-reveal="up">
            <div
              className={showcase.filterButtons}
              role="group"
              aria-label="Project categories"
            >
              {projectCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={activeCategory === category}
                  aria-controls="project-results"
                  onClick={() => setActiveCategory(category)}
                  className={showcase.filter}
                >
                  {category}
                  <span className={showcase.filterCount}>
                    {categoryCounts[category]}
                  </span>
                </button>
              ))}
            </div>
            <label className={showcase.search}>
              <Search size={17} aria-hidden="true" />
              <input
                aria-label="Search projects"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search projects..."
              />
            </label>
          </div>
        )}
        {!loadError && (
          <div className={showcase.results}>
            <p aria-live="polite">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
            {(activeCategory !== "All" || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
              >
                Clear filters
              </button>
            )}
          </div>
        )}
        <div id="project-results" aria-busy={loading}>
          {loadError ? (
            <div role="status" className={styles.notice}>
              <ImageIcon
                size={40}
                strokeWidth={1}
                aria-hidden="true"
                style={{ marginInline: "auto", color: "var(--accent)" }}
              />
              <h3>The portfolio is temporarily unavailable.</h3>
              <p>
                Please try again, or talk to us about the kind of product you
                want to build.
              </p>
              <div className={styles.noticeActions}>
                <button
                  type="button"
                  onClick={() => setReload((value) => value + 1)}
                  className={styles.pill}
                >
                  <RefreshCw size={17} aria-hidden="true" />
                  Try again
                </button>
                <Link href="/shedule_contact" className={styles.textLink}>
                  Discuss your project{" "}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          ) : loading ? (
            <div className={styles.projectGrid} aria-label="Loading projects">
              {[0, 1, 2].map((index) => (
                <div key={index} className={styles.skeleton} />
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className={styles.notice}>
              <ImageIcon
                size={36}
                aria-hidden="true"
                style={{ marginInline: "auto" }}
              />
              <h3>No matching projects</h3>
              <p>
                Try a different category or search term to discover more work.
              </p>
            </div>
          ) : (
            <div className={showcase.grid}>
              {filteredProjects.map((project, index) => (
                <ProjectPreview
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
        {!loading && projects.length > 0 && (
          <div className={showcase.cta} data-scroll-reveal="up">
            <div>
              <h3>Have a project in mind?</h3>
              <p>Let&apos;s turn your idea into a useful digital product.</p>
            </div>
            <Link href="/shedule_contact" className={styles.pill}>
              <ArrowUpRight size={17} aria-hidden="true" />
              Start a conversation
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
