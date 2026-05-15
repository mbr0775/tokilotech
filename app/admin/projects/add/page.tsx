"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle,
  ImagePlus,
  Loader2,
  LogOut,
  UploadCloud,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../../../lib/supabaseClient";

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

const initialForm: ProjectForm = {
  title: "",
  slug: "",
  category: "Website",
  clientName: "",
  description: "",
  liveUrl: "",
  githubUrl: "",
  isFeatured: false,
  isPublished: true,
};

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function AddProjectPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [checkingUser, setCheckingUser] = useState(true);
  const [form, setForm] = useState<ProjectForm>(initialForm);
  const [files, setFiles] = useState<FileList | null>(null);
  const [imageType, setImageType] = useState<"image" | "mockup">("image");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

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
    };

    checkUser();
  }, [router]);

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

  const uploadFiles = async () => {
    if (!files || files.length === 0) {
      return [];
    }

    const uploadedFiles = [];

    for (const file of Array.from(files)) {
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
        media_url: data.publicUrl,
        media_type: file.type.startsWith("video/") ? "video" : imageType,
        alt_text: file.name,
      });
    }

    return uploadedFiles;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!form.title.trim()) {
      setError("Project title is required.");
      return;
    }

    setIsUploading(true);

    try {
      const uploadedFiles = await uploadFiles();

      const { data: project, error: projectError } = await supabase
        .from("projects")
        .insert({
          title: form.title,
          slug: form.slug || createSlug(form.title),
          category: form.category,
          client_name: form.clientName,
          description: form.description,
          live_url: form.liveUrl || null,
          github_url: form.githubUrl || null,
          cover_url: uploadedFiles[0]?.media_url || null,
          is_featured: form.isFeatured,
          is_published: form.isPublished,
        })
        .select("id")
        .single();

      if (projectError) {
        throw projectError;
      }

      if (uploadedFiles.length > 0) {
        const mediaRows = uploadedFiles.map((file, index) => ({
          project_id: project.id,
          media_url: file.media_url,
          media_type: file.media_type,
          alt_text: file.alt_text,
          sort_order: index,
        }));

        const { error: mediaError } = await supabase
          .from("project_media")
          .insert(mediaRows);

        if (mediaError) {
          throw mediaError;
        }
      }

      setForm(initialForm);
      setFiles(null);
      setMessage("Project uploaded successfully.");
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Something went wrong while uploading."
      );
    } finally {
      setIsUploading(false);
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
      <div className="mx-auto max-w-5xl">
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
              Add New Project
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
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:p-8"
        >
          <div className="mb-8">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#24375a] to-[#4a5f8a] text-white">
              <ImagePlus size={28} />
            </div>

            <h2 className="text-2xl font-black">Upload Project Details</h2>

            <p className="mt-2 text-sm text-slate-600 dark:text-gray-400">
              Add client project details, mockup images, project images, and
              videos. You can select multiple files at once.
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
                placeholder="Arwa Water Bottle Company Website"
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
                placeholder="arwa-water-bottle-company-website"
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
                placeholder="Client name"
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3.5 outline-none transition focus:border-[#91BF48] dark:border-gray-700 dark:bg-gray-950"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold">Live URL</span>
              <input
                name="liveUrl"
                value={form.liveUrl}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3.5 outline-none transition focus:border-[#91BF48] dark:border-gray-700 dark:bg-gray-950"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold">GitHub URL</span>
              <input
                name="githubUrl"
                value={form.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/..."
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
              placeholder="Write project details..."
              className="w-full resize-none rounded-2xl border border-slate-300 bg-white px-5 py-3.5 outline-none transition focus:border-[#91BF48] dark:border-gray-700 dark:bg-gray-950"
            />
          </label>

          <div className="mt-6 rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-5 dark:border-gray-700 dark:bg-gray-950">
            <div className="mb-4 flex items-center gap-3">
              <UploadCloud className="text-[#91BF48]" size={26} />
              <div>
                <h3 className="font-black">Upload Media</h3>
                <p className="text-sm text-slate-600 dark:text-gray-400">
                  Select multiple mockup images, screenshots, or project videos.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_220px]">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(event) => setFiles(event.target.files)}
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
            disabled={isUploading}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#24375a] to-[#4a5f8a] px-5 py-4 font-black text-white shadow-lg shadow-[#24375a]/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUploading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Uploading Project...
              </>
            ) : (
              <>
                <ImagePlus size={20} />
                Upload Project
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}