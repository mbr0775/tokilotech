"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  ExternalLink,
  ImageIcon,
  Loader2,
  LogOut,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../../lib/supabaseClient";

const ADMIN_EMAIL = "mubassirnasar@gmail.com";

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
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  project_media?: ProjectMedia[];
};

function getStoragePathFromPublicUrl(url: string) {
  const marker = "/storage/v1/object/public/project-media/";
  const parts = url.split(marker);

  if (parts.length < 2) {
    return null;
  }

  return decodeURIComponent(parts[1]);
}

export default function ProjectMaintenancePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [checkingUser, setCheckingUser] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const loadProjects = async () => {
    setLoadingProjects(true);
    setError("");

    const { data, error: projectError } = await supabase
      .from("projects")
      .select("*, project_media(*)")
      .order("created_at", { ascending: false });

    if (projectError) {
      setError(projectError.message);
      setProjects([]);
    } else {
      setProjects((data as Project[]) || []);
    }

    setLoadingProjects(false);
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      const currentUser = data.user;

      if (!currentUser || currentUser.email !== ADMIN_EMAIL) {
        router.push("/login");
        return;
      }

      setUser(currentUser);
      setCheckingUser(false);
      loadProjects();
    };

    checkUser();
  }, [router]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(projects.map((project) => project.category).filter(Boolean))
    );

    return ["All", ...uniqueCategories];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchValue = searchText.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        project.title.toLowerCase().includes(searchValue) ||
        project.slug.toLowerCase().includes(searchValue) ||
        project.category.toLowerCase().includes(searchValue) ||
        project.client_name?.toLowerCase().includes(searchValue);

      const matchesCategory =
        categoryFilter === "All" || project.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchText, categoryFilter]);

  const totalProjects = projects.length;
  const publishedProjects = projects.filter(
    (project) => project.is_published
  ).length;
  const featuredProjects = projects.filter(
    (project) => project.is_featured
  ).length;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleDeleteProject = async (project: Project) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setDeleteLoadingId(project.id);
    setError("");

    try {
      const mediaUrls = [
        project.cover_url,
        ...(project.project_media || []).map((media) => media.media_url),
      ].filter(Boolean) as string[];

      const storagePaths = Array.from(
        new Set(
          mediaUrls
            .map((url) => getStoragePathFromPublicUrl(url))
            .filter(Boolean) as string[]
        )
      );

      if (storagePaths.length > 0) {
        await supabase.storage.from("project-media").remove(storagePaths);
      }

      const { error: deleteError } = await supabase
        .from("projects")
        .delete()
        .eq("id", project.id);

      if (deleteError) {
        throw deleteError;
      }

      setProjects((currentProjects) =>
        currentProjects.filter((item) => item.id !== project.id)
      );
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Something went wrong while deleting the project."
      );
    } finally {
      setDeleteLoadingId(null);
    }
  };

  if (checkingUser) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-950 dark:bg-gray-950 dark:text-white">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-xl dark:bg-gray-900">
          <Loader2 className="animate-spin text-[#91BF48]" size={22} />
          Checking admin access...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 dark:bg-gray-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#24375a] dark:text-gray-400 dark:hover:text-white"
            >
              <ArrowLeft size={18} />
              Back to Website
            </button>

            <p className="text-xs font-black uppercase tracking-widest text-[#91BF48]">
              Admin Panel
            </p>

            <h1 className="mt-1 text-3xl font-black sm:text-4xl">
              Project Maintenance
            </h1>

            <p className="mt-1 text-sm text-slate-600 dark:text-gray-400">
              Logged in as {user?.email}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => router.push("/admin/projects/add")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#24375a] to-[#4a5f8a] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#24375a]/20 transition hover:scale-105"
            >
              <Plus size={18} />
              Add Project
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-bold transition hover:border-red-400 hover:text-red-500 dark:border-gray-700"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-bold text-slate-500 dark:text-gray-400">
              Total Projects
            </p>
            <p className="mt-2 text-3xl font-black">{totalProjects}</p>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-bold text-slate-500 dark:text-gray-400">
              Published
            </p>
            <p className="mt-2 text-3xl font-black text-[#91BF48]">
              {publishedProjects}
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-bold text-slate-500 dark:text-gray-400">
              Featured
            </p>
            <p className="mt-2 text-3xl font-black text-[#24375a] dark:text-[#91BF48]">
              {featuredProjects}
            </p>
          </div>
        </div>

        <div className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
            <label className="relative block">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search by title, client, category, or slug..."
                className="w-full rounded-2xl border border-slate-300 bg-white px-12 py-3.5 outline-none transition focus:border-[#91BF48] dark:border-gray-700 dark:bg-gray-950"
              />
            </label>

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3.5 outline-none transition focus:border-[#91BF48] dark:border-gray-700 dark:bg-gray-950"
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <p className="mb-6 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-600 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </p>
        )}

        {loadingProjects ? (
          <div className="flex items-center justify-center rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <Loader2 className="mr-3 animate-spin text-[#91BF48]" size={24} />
            <span className="font-bold">Loading projects...</span>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center dark:border-gray-700 dark:bg-gray-900">
            <ImageIcon className="mx-auto mb-4 text-[#91BF48]" size={46} />
            <h2 className="text-2xl font-black">No projects found</h2>
            <p className="mt-2 text-slate-600 dark:text-gray-400">
              Add your first project or change your search filters.
            </p>

            <button
              type="button"
              onClick={() => router.push("/admin/projects/add")}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#24375a] to-[#4a5f8a] px-6 py-3 text-sm font-black text-white transition hover:scale-105"
            >
              <Plus size={18} />
              Add Project
            </button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredProjects.map((project) => {
              const sortedMedia = [...(project.project_media || [])].sort(
                (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
              );

              const coverImage =
                project.cover_url || sortedMedia[0]?.media_url || "";

              return (
                <article
                  key={project.id}
                  className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="grid gap-0 sm:grid-cols-[220px_1fr]">
                    <div className="relative h-56 bg-slate-100 dark:bg-gray-800 sm:h-full">
                      {coverImage ? (
                        <img
                          src={coverImage}
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ImageIcon className="text-slate-400" size={44} />
                        </div>
                      )}

                      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-black text-[#24375a] backdrop-blur-md dark:bg-gray-950/90 dark:text-[#91BF48]">
                        {project.category}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="mb-3 flex flex-wrap gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-black ${
                            project.is_published
                              ? "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300"
                              : "bg-slate-100 text-slate-600 dark:bg-gray-800 dark:text-gray-300"
                          }`}
                        >
                          {project.is_published ? "Published" : "Draft"}
                        </span>

                        {project.is_featured && (
                          <span className="rounded-full bg-[#91BF48]/15 px-3 py-1 text-xs font-black text-[#4b7a16] dark:text-[#91BF48]">
                            Featured
                          </span>
                        )}

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600 dark:bg-gray-800 dark:text-gray-300">
                          {sortedMedia.length} Media
                        </span>
                      </div>

                      <h2 className="line-clamp-2 text-xl font-black">
                        {project.title}
                      </h2>

                      {project.client_name && (
                        <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-gray-400">
                          {project.client_name}
                        </p>
                      )}

                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-gray-400">
                        {project.description ||
                          "No description added for this project."}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            router.push(`/projects/${project.slug}`)
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-xs font-black text-slate-700 transition hover:border-[#24375a] hover:text-[#24375a] dark:border-gray-700 dark:text-gray-300 dark:hover:border-[#91BF48] dark:hover:text-[#91BF48]"
                        >
                          View
                          <ExternalLink size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            router.push(`/admin/projects/edit/${project.id}`)
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-xs font-black text-slate-700 transition hover:border-[#24375a] hover:text-[#24375a] dark:border-gray-700 dark:text-gray-300 dark:hover:border-[#91BF48] dark:hover:text-[#91BF48]"
                        >
                          Edit
                          <Edit size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteProject(project)}
                          disabled={deleteLoadingId === project.id}
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-red-200 px-4 py-2 text-xs font-black text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/60 dark:hover:bg-red-950/30"
                        >
                          {deleteLoadingId === project.id ? (
                            <>
                              <Loader2 className="animate-spin" size={14} />
                              Deleting
                            </>
                          ) : (
                            <>
                              Delete
                              <Trash2 size={14} />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}