"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabaseClient";
import {
  isShowcaseId,
  PROJECT_MEDIA_BUCKET,
  SHOWCASE_SELECT,
  type ShowcaseImage,
  type ShowcasePortfolio,
  type ShowcaseRow,
} from "../../../../lib/project-showcase";

const ADMIN_EMAIL = "mubassirnasar@gmail.com";
function errorMessage(cause: unknown, fallback: string) {
  return typeof cause === "object" && cause !== null && "message" in cause && typeof cause.message === "string" ? cause.message : fallback;
}

const fieldClass = "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 dark:border-gray-700 dark:bg-gray-950 dark:text-white";

export default function ShowcaseEditor({ projectId }: { projectId?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [savedId, setSavedId] = useState<string | null>(projectId ?? null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [portfolioId, setPortfolioId] = useState("");
  const [portfolios, setPortfolios] = useState<ShowcasePortfolio[]>([]);
  const [coverUrl, setCoverUrl] = useState("");
  const [images, setImages] = useState<ShowcaseImage[]>([]);
  const [removedIds, setRemovedIds] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const { data, error: authError } = await supabase.auth.getUser();
        if (data.user?.email?.toLowerCase() !== ADMIN_EMAIL) {
          router.replace("/login");
          return;
        }
        if (authError) throw authError;
        if (projectId && !isShowcaseId(projectId)) throw new Error("Project not found.");
        const [portfolioResult, showcaseResult] = await Promise.all([
          supabase.from("portfolio").select("id,title,category,client_name,description,is_active").order("title"),
          projectId
            ? supabase.from("project_showcase").select(SHOWCASE_SELECT).eq("id", projectId).single()
            : Promise.resolve(null),
        ]);
        if (portfolioResult.error) throw portfolioResult.error;
        if (showcaseResult?.error) throw showcaseResult.error;
        if (!active) return;
        setPortfolios(portfolioResult.data as ShowcasePortfolio[]);
        if (showcaseResult?.data) {
          const row = showcaseResult.data as unknown as ShowcaseRow;
          setTitle(row.title);
          setSubtitle(row.subtitle ?? "");
          setSortOrder(row.sort_order ?? 0);
          setIsActive(row.is_active);
          setPortfolioId(row.portfolio_id ?? "");
          setCoverUrl(row.image_url ?? "");
          setImages([...row.project_images].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)));
        }
        setAuthorized(true);
      } catch (cause) {
        if (active) setError(errorMessage(cause, "Unable to load the project editor."));
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => { active = false; };
  }, [projectId, router]);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) { setError("Project title is required."); return; }
    if (!Number.isInteger(sortOrder)) { setError("Sort order must be a whole number."); return; }
    if (files.some((file) => !file.type.startsWith("image/"))) {
      setError("The mobile showcase supports images. Please select image files.");
      return;
    }
    setSaving(true);
    setError("");
    setMessage("");
    const id = savedId ?? crypto.randomUUID();
    setSavedId(id);
    const nextImages = [...images];
    let nextCover = coverUrl;
    let showcaseSaved = false;
    try {
      // Keep each successful upload in state so a failed save can be retried.
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
        const path = `showcase/${id}/${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage.from(PROJECT_MEDIA_BUCKET)
          .upload(path, file, { cacheControl: "3600", contentType: file.type, upsert: false });
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from(PROJECT_MEDIA_BUCKET).getPublicUrl(path);
        nextImages.push({ id: crypto.randomUUID(), image_url: data.publicUrl, sort_order: nextImages.length });
        if (!nextCover) nextCover = data.publicUrl;
        setImages([...nextImages]);
        setCoverUrl(nextCover);
        setFiles(files.slice(index + 1));
      }

      const { error: saveError } = await supabase.from("project_showcase").upsert({
        id,
        title: title.trim(),
        subtitle: subtitle.trim() || null,
        portfolio_id: portfolioId || null,
        image_url: nextCover || null,
        sort_order: sortOrder,
        is_active: isActive,
        updated_at: new Date().toISOString(),
      }, { onConflict: "id" }).select("id").single();
      if (saveError) throw saveError;
      showcaseSaved = true;

      if (nextImages.length) {
        const { error: imageError } = await supabase.from("project_images").upsert(
          nextImages.map((image, index) => ({
            id: image.id, showcase_id: id, image_url: image.image_url, sort_order: index,
          })),
          { onConflict: "id" }
        ).select("id");
        if (imageError) throw imageError;
      }
      if (removedIds.length) {
        const { error: deleteError } = await supabase.from("project_images").delete()
          .eq("showcase_id", id).in("id", removedIds);
        if (deleteError) throw deleteError;
      }
      setRemovedIds([]);
      setMessage("Project saved. The website and mobile app use this same showcase entry.");
    } catch (cause) {
      const detail = errorMessage(cause, "Please try again.");
      setError(`${showcaseSaved ? "Project details saved, but the gallery could not be saved. Retry to finish. " : "Unable to save the project. "}${detail}`);
    } finally {
      setSaving(false);
    }
  }

  function removeImage(image: ShowcaseImage) {
    const remaining = images.filter((item) => item.id !== image.id);
    setImages(remaining);
    setRemovedIds((ids) => [...ids, image.id]);
    if (coverUrl === image.image_url) setCoverUrl(remaining[0]?.image_url ?? "");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/admin/projects" className="font-bold">← Project maintenance</Link>
          <button type="button" onClick={async () => { await supabase.auth.signOut(); router.replace("/login"); }} className="text-sm font-bold">Log out</button>
        </div>
        <h1 className="mb-6 text-3xl font-black">{projectId ? "Edit project showcase" : "Add project showcase"}</h1>
        {error && <p role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</p>}
        {loading ? <p>Loading project editor...</p> : authorized && (
          <form onSubmit={save} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <fieldset disabled={saving} className="space-y-5 disabled:opacity-60">
              <label className="block font-bold">Project title
                <input required value={title} onChange={(event) => setTitle(event.target.value)} className={fieldClass} />
              </label>
              <label className="block font-bold">Subtitle
                <input value={subtitle} onChange={(event) => setSubtitle(event.target.value)} placeholder="Website · Mobile App · Dashboard" className={fieldClass} />
              </label>
              <label className="block font-bold">Link to portfolio project
                <select value={portfolioId} onChange={(event) => setPortfolioId(event.target.value)} className={fieldClass}>
                  <option value="">Standalone showcase</option>
                  {portfolios.map((portfolio) => <option key={portfolio.id} value={portfolio.id}>{portfolio.title}{portfolio.is_active ? "" : " (inactive)"}</option>)}
                </select>
                <span className="mt-2 block text-sm font-normal text-slate-500 dark:text-slate-400">An active linked portfolio supplies the category, client name, and description. Manage portfolio details in the mobile app.</span>
              </label>
              <label className="block font-bold">Display order
                <input type="number" step="1" required value={sortOrder} onChange={(event) => setSortOrder(Number(event.target.value))} className={fieldClass} />
                <span className="mt-2 block text-sm font-normal text-slate-500 dark:text-slate-400">Lower numbers appear first. A negative number marks a featured project on the website.</span>
              </label>
              <label className="flex items-center gap-3 font-bold">
                <input type="checkbox" checked={isActive} onChange={(event) => setIsActive(event.target.checked)} /> Publish on website and mobile app
              </label>
              {coverUrl && <div>
                <p className="mb-2 font-bold">Cover image</p>
                <img src={coverUrl} alt={title || "Project cover"} className="h-48 w-full rounded-xl object-contain" />
              </div>}
              <label className="block font-bold">Add gallery images
                <input key={files.length === 0 ? "empty" : "selected"} type="file" multiple accept="image/*" onChange={(event) => setFiles(Array.from(event.target.files ?? []))} className={fieldClass} />
              </label>
              {images.length > 0 && <div className="grid gap-4 sm:grid-cols-3">
                {images.map((image) => <div key={image.id} className="rounded-xl border border-slate-200 p-3 dark:border-gray-700">
                  <img src={image.image_url} alt={title || "Project image"} className="h-32 w-full rounded-lg object-cover" />
                  <div className="mt-3 flex justify-between gap-2 text-sm font-bold">
                    <button type="button" onClick={() => setCoverUrl(image.image_url)}>{coverUrl === image.image_url ? "Cover" : "Use as cover"}</button>
                    <button type="button" onClick={() => removeImage(image)} className="text-red-600 dark:text-red-300">Remove</button>
                  </div>
                </div>)}
              </div>}
              <button type="submit" className="w-full rounded-xl bg-[#24375a] py-4 font-black text-white">{saving ? "Saving..." : "Save project"}</button>
            </fieldset>
            {message && <p role="status" className="rounded-xl bg-green-50 p-4 text-green-800 dark:bg-green-950/40 dark:text-green-300">{message}</p>}
          </form>
        )}
      </div>
    </main>
  );
}
