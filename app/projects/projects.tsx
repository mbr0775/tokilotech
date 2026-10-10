"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUpRight, ExternalLink, ImageIcon, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { SHOWCASE_SELECT, showcaseToProject, type Project, type ShowcaseRow } from "../../lib/project-showcase";
import styles from "../design.module.css";
import MotionSurface from "../motion/MotionSurface";

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
    <section id="projects" aria-labelledby="projects-heading" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div data-scroll-reveal="left">
            <span className={styles.eyebrow}>Selected Work</span>
            <h2 id="projects-heading" className={styles.heading}>Digital products built to feel <span>clear, useful and memorable.</span></h2>
            <p className={styles.intro}>Explore websites, mobile applications, dashboards, AI solutions, brand experiences and product mockups created for growing businesses.</p>
          </div>
          <div className={styles.stats} data-scroll-reveal="right" data-scroll-delay="1">
            <div className={styles.stat}><strong>{projects.length}</strong><span>Projects</span></div>
            <div className={styles.stat}><strong>{projects.filter((project) => project.is_featured).length}</strong><span>Featured</span></div>
          </div>
        </div>
        <div className={styles.filters} data-scroll-reveal="up">
          <div className={styles.filterButtons} role="group" aria-label="Project categories">
            {projectCategories.map((category) => <button key={category} type="button" aria-pressed={activeCategory === category} aria-controls="project-results" onClick={() => setActiveCategory(category)} className={styles.filter}>{category}<span className={styles.filterCount}>{categoryCounts[category]}</span></button>)}
          </div>
          <label className={styles.search}>
            <Search size={17} aria-hidden="true" />
            <input aria-label="Search projects" type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search projects..." />
          </label>
        </div>
        <div className={styles.resultCount}>
          <p aria-live="polite">Showing {filteredProjects.length} of {projects.length} projects</p>
          {(activeCategory !== "All" || searchQuery) && <button type="button" onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}>Clear filters</button>}
        </div>
        <div id="project-results" aria-busy={loading}>
          {loadError ? (
            <div role="alert" className={styles.notice}><p>{loadError}</p><button type="button" onClick={() => setReload((value) => value + 1)} className={styles.pill}><ArrowUpRight size={17} aria-hidden="true" />Try again</button></div>
          ) : loading ? (
            <div className={styles.projectGrid} aria-label="Loading projects">{[0, 1, 2].map((index) => <div key={index} className={styles.skeleton} />)}</div>
          ) : filteredProjects.length === 0 ? (
            <div className={styles.notice}><ImageIcon size={36} aria-hidden="true" style={{ marginInline: "auto" }} /><h3>No matching projects</h3><p>Try a different category or search term to discover more work.</p></div>
          ) : (
            <div className={styles.projectGrid}>
              {filteredProjects.map((project, index) => {
                const sortedMedia = [...(project.project_media || [])].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
                const coverImage = project.cover_url || sortedMedia[0]?.media_url || "";
                return (
                  <MotionSurface key={project.id} className={`${styles.projectCard} ${index === 0 ? styles.leadProject : ""}`} delay={(index % 3) * 0.07}>
                    <Link href={`/projects/${project.slug}`} aria-label={`View ${project.title}`} className={styles.projectCover}>
                      {coverImage ? <img src={coverImage} alt={project.title} loading="lazy" /> : <div className={styles.imagePlaceholder}><ImageIcon size={48} aria-hidden="true" /></div>}
                      <div className={styles.projectTags}><span>{project.category}</span>{project.is_featured && <span>Featured</span>}</div>
                    </Link>
                    <div className={styles.projectInfo}>
                      <span className={styles.mediaCount}>{sortedMedia.length} media item{sortedMedia.length === 1 ? "" : "s"}</span>
                      <h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
                      {project.client_name && <p className={styles.projectClient}>For {project.client_name}</p>}
                      <p className={styles.projectDescription}>{project.description || "Project details and case study information will be available soon."}</p>
                      <div className={styles.projectLinks}>
                        <Link href={`/projects/${project.slug}`} className={styles.textLink}>View case study<ArrowUpRight size={16} aria-hidden="true" /></Link>
                        {project.live_url && <a href={project.live_url} target="_blank" rel="noreferrer" aria-label={`Open live ${project.title} project`} className={styles.liveLink}><ExternalLink size={16} aria-hidden="true" /></a>}
                      </div>
                    </div>
                  </MotionSurface>
                );
              })}
            </div>
          )}
        </div>
        {!loading && projects.length > 0 && <div className={styles.projectCta} data-scroll-reveal="up">
          <div><h3>Have a project in mind?</h3><p>Let&apos;s turn your idea into a useful digital product.</p></div>
          <Link href="/shedule_contact" className={styles.pill}><ArrowUpRight size={17} aria-hidden="true" />Start a conversation</Link>
        </div>}
      </div>
    </section>
  );
}
