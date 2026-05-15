"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ImageIcon,
  PlayCircle,
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

  if (media.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center dark:border-gray-700 dark:bg-gray-900">
        <ImageIcon className="mx-auto mb-4 text-[#91BF48]" size={44} />
        <h3 className="text-2xl font-black">No media uploaded</h3>
        <p className="mt-2 text-slate-600 dark:text-gray-400">
          Project media will appear here after uploading.
        </p>
      </div>
    );
  }

  const safeActiveIndex = Math.min(activeIndex, media.length - 1);
  const activeMedia = media[safeActiveIndex];

  const goPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? media.length - 1 : current - 1
    );
  };

  const goNext = () => {
    setActiveIndex((current) =>
      current === media.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/60 dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/20 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[#91BF48]">
            Media Preview
          </p>
          <h3 className="mt-1 text-xl font-black">
            {safeActiveIndex + 1} of {media.length}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goPrevious}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:border-[#24375a] hover:text-[#24375a] dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:border-[#91BF48] dark:hover:text-[#91BF48]"
            aria-label="Previous media"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#24375a] to-[#4a5f8a] text-white shadow-lg shadow-[#24375a]/20 transition hover:scale-105"
            aria-label="Next media"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100 dark:border-gray-800 dark:bg-gray-950">
        <div className="relative flex h-[280px] items-center justify-center bg-slate-100 dark:bg-gray-950 sm:h-[430px] lg:h-[520px]">
          {activeMedia.media_type === "video" ? (
            <video
              src={activeMedia.media_url}
              controls
              className="h-full w-full bg-black object-contain"
            />
          ) : (
            <a href={activeMedia.media_url} target="_blank" rel="noreferrer">
              <img
                src={activeMedia.media_url}
                alt={activeMedia.alt_text || projectTitle}
                className="max-h-[280px] w-full object-contain p-3 transition hover:scale-[1.02] sm:max-h-[430px] lg:max-h-[520px]"
              />
            </a>
          )}

          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-black text-[#24375a] shadow-sm backdrop-blur-md dark:bg-gray-950/90 dark:text-[#91BF48]">
            {activeMedia.media_type}
          </div>

          {activeMedia.media_type === "video" && (
            <div className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-[#24375a] shadow-lg dark:bg-gray-950/90 dark:text-[#91BF48]">
              <PlayCircle size={22} />
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="line-clamp-2 text-lg font-black">
            {activeMedia.alt_text || projectTitle}
          </h3>

          {activeMedia.media_type !== "video" && (
            <a
              href={activeMedia.media_url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-xs font-black text-slate-700 transition hover:border-[#24375a] hover:text-[#24375a] dark:border-gray-700 dark:text-gray-300 dark:hover:border-[#91BF48] dark:hover:text-[#91BF48]"
            >
              View Full Image
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      <div className="mt-5 overflow-x-auto pb-2">
        <div className="flex gap-3">
          {media.map((item, index) => {
            const isActive = safeActiveIndex === index;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`min-w-[110px] overflow-hidden rounded-2xl border p-1 transition ${
                  isActive
                    ? "border-[#24375a] bg-[#24375a]/10 dark:border-[#91BF48] dark:bg-[#91BF48]/10"
                    : "border-slate-200 bg-slate-50 hover:border-[#24375a] dark:border-gray-800 dark:bg-gray-950 dark:hover:border-[#91BF48]"
                }`}
                aria-label={`Open media ${index + 1}`}
              >
                <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-100 dark:bg-gray-900">
                  {item.media_type === "video" ? (
                    <div className="flex h-full w-full items-center justify-center bg-black text-white">
                      <PlayCircle size={24} />
                    </div>
                  ) : (
                    <img
                      src={item.media_url}
                      alt={item.alt_text || projectTitle}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                <p className="px-1 py-2 text-center text-xs font-black">
                  {index + 1}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}