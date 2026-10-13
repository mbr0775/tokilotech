"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, type FormEvent } from "react";
import { ImageIcon, Pencil, Plus } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import { PROJECT_MEDIA_BUCKET } from "../../../lib/project-showcase";
import {
  buildContentPayload,
  contentSchemas,
  type ContentDraft,
  type ContentRow,
  type ManagedContent,
} from "../../../lib/content-management";
import styles from "../workspace.module.css";

function message(cause: unknown) {
  return typeof cause === "object" && cause && "message" in cause
    ? String(cause.message)
    : "The request could not be completed. Please try again.";
}
export default function ContentManager({ kind }: { kind: ManagedContent }) {
  const schema = contentSchemas[kind];
  const [rows, setRows] = useState<ContentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<ContentDraft>({});
  const [active, setActive] = useState(true);
  const [inStock, setInStock] = useState(true);
  const [status, setStatus] = useState("completed");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let alive = true;
    void supabase
      .from(schema.table)
      .select(schema.select)
      .order("created_at", { ascending: false })
      .then(({ data, error: cause }) => {
        if (!alive) return;
        if (cause) setError(message(cause));
        else setRows((data ?? []) as unknown as ContentRow[]);
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [schema, refresh]);

  function edit(row?: ContentRow) {
    setEditingId(row?.id ?? crypto.randomUUID());
    const values: ContentDraft = {};
    schema.fields.forEach((field) => {
      values[field.key] = String(row?.[field.key as keyof ContentRow] ?? "");
    });
    setDraft(values);
    setActive(row?.is_active ?? true);
    setInStock(row?.in_stock ?? true);
    setStatus(row?.status ?? "completed");
    setImageUrl(row?.image_url ?? "");
    setFile(null);
    setError("");
    setSuccess("");
  }
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingId) return;
    setError("");
    setSuccess("");
    let cover = imageUrl.trim();
    try {
      // Validate every field before sending or uploading anything.
      buildContentPayload(kind, draft, {
        id: editingId,
        imageUrl: cover,
        active,
        inStock,
        status,
      });
      if (cover && !/^https?:\/\//i.test(cover))
        throw new Error("Use an http or https cover image URL.");
      if (
        file &&
        (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
          file.type,
        ) ||
          file.size > 10 * 1024 * 1024)
      )
        throw new Error("Choose a JPG, PNG, WebP or GIF image up to 10 MB.");
      setSaving(true);
      if (file) {
        const extensions: Record<string, string> = {
          "image/jpeg": "jpg",
          "image/png": "png",
          "image/webp": "webp",
          "image/gif": "gif",
        };
        const path = `${schema.folder}/${editingId}/${crypto.randomUUID()}.${extensions[file.type]}`;
        const { error: uploadError } = await supabase.storage
          .from(PROJECT_MEDIA_BUCKET)
          .upload(path, file, {
            cacheControl: "3600",
            contentType: file.type,
            upsert: false,
          });
        if (uploadError) throw uploadError;
        cover = supabase.storage.from(PROJECT_MEDIA_BUCKET).getPublicUrl(path)
          .data.publicUrl;
        // Keep the uploaded image for retries if the database write is rejected.
        setImageUrl(cover);
        setFile(null);
      }
      const payload = buildContentPayload(kind, draft, {
        id: editingId,
        imageUrl: cover,
        active,
        inStock,
        status,
      });
      const { data, error: cause } = await supabase
        .from(schema.table)
        .upsert(payload, { onConflict: "id" })
        .select(schema.select)
        .single();
      if (cause) throw cause;
      const row = data as unknown as ContentRow;
      setRows((existing) => [
        row,
        ...existing.filter((item) => item.id !== row.id),
      ]);
      setEditingId(null);
      setSuccess(
        `${kind === "products" ? "Product" : "Portfolio project"} saved to the shared mobile-app database.`,
      );
    } catch (cause) {
      setError(message(cause));
    } finally {
      setSaving(false);
    }
  }

  const filtered = rows.filter((row) =>
    [row.name, row.title, row.brand, row.client_name, row.category].some(
      (value) => value?.toLowerCase().includes(query.trim().toLowerCase()),
    ),
  );
  return (
    <>
      <p className={styles.intro}>
        {kind === "products"
          ? "These are the same products managed in the mobile app. Change availability and publishing without creating duplicate entries."
          : "Manage public project details here, then link them to a website showcase entry. Private project pricing remains in the mobile app."}
      </p>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      {success && (
        <p className={styles.success} role="status">
          {success}
        </p>
      )}
      <div className={styles.toolbar}>
        <label className={styles.field}>
          Search {schema.label.toLowerCase()}
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.button} ${styles.secondary}`}
            disabled={saving}
            onClick={() => {
              setLoading(true);
              setError("");
              setRefresh((value) => value + 1);
            }}
          >
            Refresh
          </button>
          <button
            type="button"
            className={styles.button}
            disabled={saving}
            onClick={() => edit()}
          >
            <Plus size={16} aria-hidden="true" />
            Add {schema.singular}
          </button>
        </div>
      </div>
      {editingId && (
        <form className={styles.form} onSubmit={save}>
          <h2>
            {rows.some((row) => row.id === editingId) ? "Edit" : "Add"}{" "}
            {schema.singular}
          </h2>
          <fieldset className={styles.fields} disabled={saving}>
            {schema.fields.map((field) => (
              <label
                key={field.key}
                className={`${styles.field} ${"multiline" in field ? styles.wide : ""}`}
              >
                {field.label}
                {"multiline" in field ? (
                  <textarea
                    value={draft[field.key] ?? ""}
                    onChange={(event) =>
                      setDraft({ ...draft, [field.key]: event.target.value })
                    }
                  />
                ) : (
                  <input
                    required={"required" in field}
                    value={draft[field.key] ?? ""}
                    placeholder={
                      "placeholder" in field ? field.placeholder : undefined
                    }
                    onChange={(event) =>
                      setDraft({ ...draft, [field.key]: event.target.value })
                    }
                  />
                )}
              </label>
            ))}
            {kind === "portfolio" && (
              <label className={styles.field}>
                Project status
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <option value="completed">Completed</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </label>
            )}
            <label className={`${styles.field} ${styles.wide}`}>
              Cover image URL
              <input
                type="url"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                placeholder="https://…"
              />
            </label>
            <label className={`${styles.field} ${styles.wide}`}>
              Upload cover image
              <input
                key={`${editingId}-${file?.name ?? "empty"}`}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              />
            </label>
            {imageUrl && (
              <img
                src={imageUrl}
                alt={draft[schema.titleField] || "Current cover"}
                className={styles.preview}
              />
            )}
            <div className={styles.checks}>
              <label>
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(event) => setActive(event.target.checked)}
                />
                Active in the shared catalog
              </label>
              {kind === "products" && (
                <label>
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(event) => setInStock(event.target.checked)}
                  />
                  In stock
                </label>
              )}
            </div>
            <div className={`${styles.actions} ${styles.wide}`}>
              <button type="submit" className={styles.button}>
                {saving ? "Saving…" : `Save ${schema.singular}`}
              </button>
              <button
                type="button"
                className={`${styles.button} ${styles.secondary}`}
                onClick={() => setEditingId(null)}
              >
                Cancel
              </button>
            </div>
          </fieldset>
        </form>
      )}
      {loading ? (
        <p role="status">Loading {schema.label.toLowerCase()}…</p>
      ) : filtered.length === 0 ? (
        <p className={styles.empty}>
          {query
            ? "No matching entries."
            : `No ${schema.label.toLowerCase()} found. Add your first entry above.`}
        </p>
      ) : (
        <div className={styles.list}>
          {filtered.map((row) => (
            <article key={row.id} className={styles.item}>
              {row.image_url ? (
                <img
                  src={row.image_url}
                  alt={row.name || row.title || "Content cover"}
                  className={styles.image}
                />
              ) : (
                <div className={`${styles.image} ${styles.placeholder}`}>
                  <ImageIcon size={26} aria-hidden="true" />
                </div>
              )}
              <div>
                <h2>{row.name || row.title}</h2>
                <p>
                  {[row.brand || row.client_name, row.category]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                {kind === "products" && row.price && <p>{row.price}</p>}
                <div className={styles.badges}>
                  <span>{row.is_active ? "Active" : "Inactive"}</span>
                  {kind === "products" ? (
                    <span>{row.in_stock ? "In stock" : "Out of stock"}</span>
                  ) : (
                    <span>{row.status}</span>
                  )}
                </div>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={`${styles.button} ${styles.secondary}`}
                    onClick={() => edit(row)}
                    disabled={saving}
                  >
                    <Pencil size={14} aria-hidden="true" />
                    Edit
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
