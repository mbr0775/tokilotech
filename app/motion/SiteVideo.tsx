"use client";

import {
  createContext,
  useEffect,
  useContext,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { Pause, Play } from "lucide-react";
import { usePathname } from "next/navigation";
import BackgroundVideo from "./BackgroundVideo";
import {
  aiFootage,
  ambientFootage,
  engineeringFootage,
  growthFootage,
} from "./background-media";
import styles from "./site-video.module.css";

const VideoContext = createContext<{
  paused: boolean;
  setPaused: (paused: boolean) => void;
} | null>(null);
export function useSiteVideo() {
  const context = useContext(VideoContext);
  if (!context) throw new Error("Site video controls require PublicShell.");
  return context;
}
function subscribe(callback: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", callback);
  return () => preference.removeEventListener("change", callback);
}
const getReduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const scenes = {
  ambient: ambientFootage,
  ai: aiFootage,
  engineering: engineeringFootage,
  growth: growthFootage,
};
type Scene = keyof typeof scenes;

export function SiteVideoControl() {
  const { paused, setPaused } = useSiteVideo();
  const reduced = useSyncExternalStore(subscribe, getReduced, () => true);
  if (reduced) return null;
  const label = `${paused ? "Resume" : "Pause"} site background video`;
  return (
    <button
      type="button"
      className={styles.control}
      data-site-video-control
      aria-label={label}
      title={label}
      aria-pressed={paused}
      onClick={() => setPaused(!paused)}
    >
      {paused ? (
        <Play size={16} aria-hidden="true" />
      ) : (
        <Pause size={16} aria-hidden="true" />
      )}
    </button>
  );
}

/** One fixed backdrop shared by every public page, with server-rendered content above it. */
export default function SiteVideo({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const [scene, setScene] = useState<Scene>("ambient");
  const backdrop = useRef<HTMLDivElement>(null);
  const currentScene = useRef<Scene>("ambient");
  const pathname = usePathname();

  useEffect(() => {
    const scope = backdrop.current?.parentElement;
    if (!scope) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = Array.from(
      scope.querySelectorAll<HTMLElement>(
        "main > section, main > div[id], footer",
      ),
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      if (paused) return;
      const line = window.innerHeight * 0.5;
      const section = sections.find((element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.top <= line && bounds.bottom > line;
      });
      const marker = section?.dataset.videoBackground;
      const next: Scene =
        !preference.matches && marker && marker in scenes
          ? (marker as Scene)
          : "ambient";
      // Only scene boundaries update React; scroll frames just measure stable boxes.
      if (currentScene.current !== next) {
        currentScene.current = next;
        setScene(next);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resizeObserver = new ResizeObserver(schedule);
    const main = scope.querySelector("main");
    if (main) resizeObserver.observe(main);
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    preference.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
    };
  }, [pathname, paused]);

  return (
    <VideoContext.Provider value={{ paused, setPaused }}>
      <div
        ref={backdrop}
        className={styles.backdrop}
        data-site-backdrop
        data-video-scene={scene}
        aria-hidden="true"
      >
        <BackgroundVideo
          key={scene}
          {...scenes[scene]}
          label="Site"
          enabled={!paused}
          controls={false}
          className={styles.footage}
        />
        <div className={styles.veil} />
      </div>
      {children}
    </VideoContext.Provider>
  );
}
