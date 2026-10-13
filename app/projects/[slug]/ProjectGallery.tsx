"use client";

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./detail.module.css";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  ExternalLink,
  ImageIcon,
  PlayCircle,
  X,
} from "lucide-react";

type ProjectMedia = {
  id: string;
  media_url: string;
  media_type: "image" | "video" | "mockup";
  alt_text: string | null;
  sort_order: number | null;
};

type ProjectGalleryProps = {
  media: ProjectMedia[];
  projectTitle: string;
};

export default function ProjectGallery({
  media,
  projectTitle,
}: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const safeActiveIndex = Math.min(activeIndex, Math.max(media.length - 1, 0));
  const activeMedia = media[safeActiveIndex];

  const goPrevious = useCallback(() => {
    if (media.length <= 1) return;
    setActiveIndex((current) =>
      current === 0 ? media.length - 1 : current - 1,
    );
  }, [media.length]);

  const goNext = useCallback(() => {
    if (media.length <= 1) return;
    setActiveIndex((current) =>
      current === media.length - 1 ? 0 : current + 1,
    );
  }, [media.length]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLightboxOpen(false);
      if (event.key === "ArrowLeft") goPrevious();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "Tab") {
        const controls =
          dialogRef.current?.querySelectorAll<HTMLButtonElement>("button");
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, goNext, goPrevious]);

  if (media.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center shadow-sm dark:border-white/15 dark:bg-white/[0.035]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#426c9b]/15 text-[#385f8a] dark:text-[#99c4f3]">
          <ImageIcon size={30} />
        </div>
        <h3 className="mt-5 text-2xl font-black">Gallery coming soon</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
          Screenshots, mockups and project videos will appear here after they
          are uploaded.
        </p>
      </div>
    );
  }

  const renderMedia = (item: ProjectMedia, mode: "stage" | "lightbox") => {
    if (item.media_type === "video") {
      return (
        <video
          src={item.media_url}
          controls
          playsInline
          className={mode === "lightbox" ? styles.lightboxMedia : styles.media}
        />
      );
    }

    return (
      <img
        src={item.media_url}
        alt={item.alt_text || projectTitle}
        className={mode === "stage" ? styles.media : styles.lightboxMedia}
      />
    );
  };

  return (
    <>
      <div className={styles.viewer}>
        <div className="overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_30px_90px_-45px_rgba(15,23,42,0.55)] dark:border-white/10 dark:bg-[#0f1521]">
          <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 px-4 py-3 dark:border-white/10">
            <div className="min-w-0">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#385f8a] dark:text-[#99c4f3]">
                {activeMedia.media_type}
              </p>
              <p className="mt-1 truncate text-sm font-black sm:text-base">
                {activeMedia.alt_text || projectTitle}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {activeMedia.media_type !== "video" && (
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-[#426c9b] hover:bg-[#426c9b]/10 hover:text-[#385f8a] dark:border-white/10 dark:text-slate-300 dark:hover:text-[#99c4f3]"
                  aria-label="Open full-screen viewer"
                >
                  <Expand size={17} />
                </button>
              )}
              <span className="min-w-[58px] text-center text-xs font-black text-slate-400">
                {safeActiveIndex + 1} / {media.length}
              </span>
            </div>
          </div>

          <div className={styles.stage}>
            {renderMedia(activeMedia, "stage")}

            {media.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrevious}
                  className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/45 text-white shadow-lg backdrop-blur-xl transition hover:scale-105 hover:bg-white hover:text-slate-950 sm:left-5"
                  aria-label="Previous media"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/45 text-white shadow-lg backdrop-blur-xl transition hover:scale-105 hover:bg-white hover:text-slate-950 sm:right-5"
                  aria-label="Next media"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-slate-950/50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-xl">
              {activeMedia.media_type}
            </span>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200/80 px-4 py-3 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-6 text-slate-500 dark:text-slate-400">
              {media.length > 1
                ? "Select a thumbnail or use the navigation arrows."
                : "Use full-screen view for a closer look."}
            </p>
            {activeMedia.media_type !== "video" && (
              <a
                href={activeMedia.media_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-black text-[#385f8a] transition hover:text-[#385f8a] dark:text-white dark:hover:text-[#99c4f3]"
              >
                Open original <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        {media.length > 1 && (
          <div className={styles.thumbnailPanel}>
            <div className={styles.thumbnails}>
              {media.map((item, index) => {
                const isActive = safeActiveIndex === index;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`group/thumb relative overflow-hidden rounded-2xl border p-1 text-left transition ${
                      isActive
                        ? "border-[#426c9b] bg-[#426c9b]/10 shadow-sm"
                        : "border-transparent bg-slate-100 hover:border-slate-300 dark:bg-white/[0.05] dark:hover:border-white/20"
                    }`}
                    aria-label={`Open media ${index + 1}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <div className={styles.thumbnailImage}>
                      {item.media_type === "video" ? (
                        <div className="flex h-full w-full items-center justify-center bg-slate-950 text-white">
                          <PlayCircle size={24} />
                        </div>
                      ) : (
                        <img
                          src={item.media_url}
                          alt={item.alt_text || projectTitle}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover/thumb:scale-105"
                        />
                      )}
                      <span className="absolute bottom-1.5 left-1.5 rounded-md bg-slate-950/65 px-1.5 py-0.5 text-[9px] font-black uppercase text-white backdrop-blur">
                        {index + 1}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {isLightboxOpen && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${projectTitle} full-screen media viewer`}
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white hover:text-slate-950 sm:right-6 sm:top-6"
            aria-label="Close full-screen viewer"
          >
            <X size={21} />
          </button>

          {media.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goPrevious();
                }}
                className="absolute left-3 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white hover:text-slate-950 sm:left-6"
                aria-label="Previous media"
              >
                <ChevronLeft size={25} />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goNext();
                }}
                className="absolute right-3 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white hover:text-slate-950 sm:right-6"
                aria-label="Next media"
              >
                <ChevronRight size={25} />
              </button>
            </>
          )}

          <div
            className="flex max-h-[90vh] max-w-[96vw] flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            {renderMedia(activeMedia, "lightbox")}
            <div className="mt-4 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-center text-xs font-bold text-white/80 backdrop-blur-xl">
              {activeMedia.alt_text || projectTitle} · {safeActiveIndex + 1} of{" "}
              {media.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
