"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle,
  ImageIcon,
  Loader2,
  LogOut,
  Save,
  Trash2,
  UploadCloud,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../../../../lib/supabaseClient";

const ADMIN_EMAIL = "mubassirnasar@gmail.com";

type ProjectForm = {
  title: string;
  slug: string;
  category: string;
  clientName: string;
  description: string;
  liveUrl: string;
  githubUrl: string;
  isFeatured: boolean;
  isPublished: boolean;
};

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
  project_media?: ProjectMedia[];
};

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function getStoragePathFromPublicUrl(url: string) {
  const marker = "/storage/v1/object/public/project-media/";
  const parts = url.split(marker);

  if (parts.length < 2) {
    return null;
  }

  return decodeURIComponent(parts[1]);
}

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const projectId = params.id;

  const [user, setUser] = useState<User | null>(null);
  const [checkingUser, setCheckingUser] = useState(true);
  const [loadingProject, setLoadingProject] = useState(true);
  const [project, setProject] = useState<Project | null>(null);

  const [form, setForm] = useState<ProjectForm>({
    title: "",
    slug: "",
    category: "Website",
    clientName: "",
    description: "",
    liveUrl: "",
    githubUrl: "",
    isFeatured: false,
    isPublished: true,
  });

  const [newFiles, setNewFiles] = useState<FileList | null>(null);
  const [imageType, setImageType] = useState<"image" | "mockup">("image");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deletingMediaId, setDeletingMediaId] = useState<string | null>(null);

  const loadProject = async () => {
    setLoadingProject(true);
    setError("");

    const { data, error: projectError } = await supabase
      .from("projects")
      .select("*, project_media(*)")
      .eq("id", projectId)
      .single();

    if (projectError || !data) {
      setError(projectError?.message || "Project not found.");
      setLoadingProject(false);
      return;
    }

    const currentProject = data as Project;
    setProject(currentProject);

    setForm({
      title: currentProject.title,
      slug: currentProject.slug,
      category: currentProject.category,
      clientName: currentProject.client_name || "",
      description: currentProject.description || "",
      liveUrl: currentProject.live_url || "",
      githubUrl: currentProject.github_url || "",
      isFeatured: currentProject.is_featured,
      isPublished: currentProject.is_published,
    });

    setLoadingProject(false);
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
      loadProject();
    };

    checkUser();
  }, [router, projectId]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === "title" && !current.slug
        ? { slug: createSlug(value) }
        : {}),
    }));
  };

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: checked,
    }));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const uploadNewFiles = async () => {
    if (!newFiles || newFiles.length === 0) {
      return [];
    }

    const uploadedFiles = [];

    for (const file of Array.from(newFiles)) {
      const extension = file.name.split(".").pop();
      const safeFileName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
      const filePath = `projects/${
        form.slug || createSlug(form.title)
      }/${safeFileName}`;

      const { error: uploadError } = await supabase.storage
        .from("project-media")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from("project-media")
        .getPublicUrl(filePath);

      uploadedFiles.push({
        project_id: projectId,
        media_url: data.publicUrl,
        media_type: file.type.startsWith("video/") ? "video" : imageType,
        alt_text: file.name,
        sort_order: project?.project_media?.length || 0,
      });
    }

    return uploadedFiles;
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!form.title.trim()) {
      setError("Project title is required.");
      return;
    }

    setIsSaving(true);

    try {
      const uploadedFiles = await uploadNewFiles();

      let nextCoverUrl = project?.cover_url || null;

      if (!nextCoverUrl && uploadedFiles.length > 0) {
        nextCoverUrl = uploadedFiles[0].media_url;
      }

      const { error: updateError } = await supabase
        .from("projects")
        .update({
          title: form.title,
          slug: form.slug || createSlug(form.title),
          category: form.category,
          client_name: form.clientName,
          description: form.description,
          live_url: form.liveUrl || null,
          github_url: form.githubUrl || null,
          cover_url: nextCoverUrl,
          is_featured: form.isFeatured,
          is_published: form.isPublished,
        })
        .eq("id", projectId);

      if (updateError) {
        throw updateError;
      }

      if (uploadedFiles.length > 0) {
        const { error: mediaError } = await supabase
          .from("project_media")
          .insert(uploadedFiles);

        if (mediaError) {
          throw mediaError;
        }
      }

      setNewFiles(null);
      setMessage("Project updated successfully.");
      await loadProject();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Something went wrong while updating."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteMedia = async (media: ProjectMedia) => {
    const confirmed = window.confirm("Delete this media file?");

    if (!confirmed) {
      return;
    }

    setDeletingMediaId(media.id);
    setError("");

    try {
      const storagePath = getStoragePathFromPublicUrl(media.media_url);

      if (storagePath) {
        await supabase.storage.from("project-media").remove([storagePath]);
      }

      const { error: deleteError } = await supabase
        .from("project_media")
        .delete()
        .eq("id", media.id);

      if (deleteError) {
        throw deleteError;
      }

      if (project?.cover_url === media.media_url) {
        const remainingMedia =
          project.project_media?.filter((item) => item.id !== media.id) || [];

        const nextCoverUrl = remainingMedia[0]?.media_url || null;

        await supabase
          .from("projects")
          .update({ cover_url: nextCoverUrl })
          .eq("id", projectId);
      }

      await loadProject();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Something went wrong while deleting media."
      );
    } finally {
      setDeletingMediaId(null);
    }
  };

  const handleSetCover = async (mediaUrl: string) => {
    setError("");
    setMessage("");

    const { error: coverError } = await supabase
      .from("projects")
      .update({ cover_url: mediaUrl })
      .eq("id", projectId);

    if (coverError) {
      setError(coverError.message);
      return;
    }

    setMessage("Cover image updated successfully.");
    await loadProject();
  };

  if (checkingUser || loadingProject) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-950 dark:bg-gray-950 dark:text-white">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-xl dark:bg-gray-900">
          <Loader2 className="animate-spin text-[#91BF48]" size={22} />
          Loading project...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 dark:bg-gray-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <button
              type="button"
              onClick={() => router.push("/admin/projects")}
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#24375a] dark:text-gray-400 dark:hover:text-white"
            >
              <ArrowLeft size={18} />
              Back to Project Maintenance
            </button>

            <p className="text-xs font-black uppercase tracking-widest text-[#91BF48]">
              Admin Panel
            </p>

            <h1 className="mt-1 text-3xl font-black sm:text-4xl">
              Edit Project
            </h1>

            <p className="mt-1 text-sm text-slate-600 dark:text-gray-400">
              Logged in as {user?.email}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-bold transition hover:border-red-400 hover:text-red-500 dark:border-gray-700"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>

        <form
          onSubmit={handleSave}
          className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:p-8"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-black">Project Details</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-gray-400">
              Update project details, publish status, cover image, and media.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-bold">
                Project Title *
              </span>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3.5 outline-none transition focus:border-[#91BF48] dark:border-gray-700 dark:bg-gray-950"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold">
                Project Slug *
              </span>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3.5 outline-none transition focus:border-[#91BF48] dark:border-gray-700 dark:bg-gray-950"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold">Category</span>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3.5 outline-none transition focus:border-[#91BF48] dark:border-gray-700 dark:bg-gray-950"
              >
                <option>Website</option>
                <option>Mobile App</option>
                <option>AI Solution</option>
                <option>Dashboard</option>
                <option>Branding</option>
                <option>Mockup</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold">Client Name</span>
              <input
                name="clientName"
                value={form.clientName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3.5 outline-none transition focus:border-[#91BF48] dark:border-gray-700 dark:bg-gray-950"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold">Live URL</span>
              <input
                name="liveUrl"
                value={form.liveUrl}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3.5 outline-none transition focus:border-[#91BF48] dark:border-gray-700 dark:bg-gray-950"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold">GitHub URL</span>
              <input
                name="githubUrl"
                value={form.githubUrl}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3.5 outline-none transition focus:border-[#91BF48] dark:border-gray-700 dark:bg-gray-950"
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-bold">
              Project Description
            </span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              className="w-full resize-none rounded-2xl border border-slate-300 bg-white px-5 py-3.5 outline-none transition focus:border-[#91BF48] dark:border-gray-700 dark:bg-gray-950"
            />
          </label>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-8">
            <label className="flex items-center gap-2 text-sm font-bold">
              <input
                type="checkbox"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleCheckbox}
              />
              Featured Project
            </label>

            <label className="flex items-center gap-2 text-sm font-bold">
              <input
                type="checkbox"
                name="isPublished"
                checked={form.isPublished}
                onChange={handleCheckbox}
              />
              Publish Now
            </label>
          </div>

          <div className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-5 dark:border-gray-700 dark:bg-gray-950">
            <div className="mb-4 flex items-center gap-3">
              <UploadCloud className="text-[#91BF48]" size={26} />
              <div>
                <h3 className="font-black">Add More Media</h3>
                <p className="text-sm text-slate-600 dark:text-gray-400">
                  Upload more project images, mockups, screenshots, or videos.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_220px]">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(event) => setNewFiles(event.target.files)}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-[#24375a] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white dark:border-gray-700 dark:bg-gray-900"
              />

              <select
                value={imageType}
                onChange={(event) =>
                  setImageType(event.target.value as "image" | "mockup")
                }
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3.5 text-sm outline-none transition focus:border-[#91BF48] dark:border-gray-700 dark:bg-gray-900"
              >
                <option value="image">Project image</option>
                <option value="mockup">Mockup image</option>
              </select>
            </div>
          </div>

          {error && (
            <p className="mt-6 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-600 dark:bg-red-950/40 dark:text-red-300">
              {error}
            </p>
          )}

          {message && (
            <p className="mt-6 flex items-center gap-2 rounded-2xl bg-green-50 p-4 text-sm font-semibold text-green-700 dark:bg-green-950/40 dark:text-green-300">
              <CheckCircle size={18} />
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#24375a] to-[#4a5f8a] px-5 py-4 font-black text-white shadow-lg shadow-[#24375a]/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Saving Changes...
              </>
            ) : (
              <>
                <Save size={20} />
                Save Changes
              </>
            )}
          </button>
        </form>

        <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:p-8">
          <h2 className="text-2xl font-black">Existing Media</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-gray-400">
            Manage uploaded images, mockups, and videos. You can set any image
            as the project cover.
          </p>

          {!project?.project_media || project.project_media.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-gray-700">
              <ImageIcon className="mx-auto mb-3 text-[#91BF48]" size={42} />
              <p className="font-bold">No media uploaded yet.</p>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[...project.project_media]
                .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
                .map((media) => (
                  <div
                    key={media.id}
                    className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 dark:border-gray-800 dark:bg-gray-950"
                  >
                    <div className="aspect-video bg-slate-100 dark:bg-gray-800">
                      {media.media_type === "video" ? (
                        <video
                          src={media.media_url}
                          controls
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <img
                          src={media.media_url}
                          alt={media.alt_text || project.title}
                          className="h-full w-full object-contain p-2"
                        />
                      )}
                    </div>

                    <div className="p-4">
                      <p className="text-xs font-black uppercase tracking-widest text-[#91BF48]">
                        {media.media_type}
                      </p>

                      <p className="mt-1 line-clamp-1 text-sm font-bold">
                        {media.alt_text || project.title}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {media.media_type !== "video" && (
                          <button
                            type="button"
                            onClick={() => handleSetCover(media.media_url)}
                            className="rounded-full border border-slate-300 px-4 py-2 text-xs font-black text-slate-700 transition hover:border-[#24375a] hover:text-[#24375a] dark:border-gray-700 dark:text-gray-300 dark:hover:border-[#91BF48] dark:hover:text-[#91BF48]"
                          >
                            {project.cover_url === media.media_url
                              ? "Current Cover"
                              : "Set Cover"}
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleDeleteMedia(media)}
                          disabled={deletingMediaId === media.id}
                          className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-xs font-black text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/60 dark:hover:bg-red-950/30"
                        >
                          {deletingMediaId === media.id ? (
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
                ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}