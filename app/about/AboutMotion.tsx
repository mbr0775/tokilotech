"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useSiteVideo } from "../motion/SiteVideo";
import styles from "./about.module.css";

const AboutMotionContext = createContext<{
  paused: boolean;
  toggleMotion: () => void;
} | null>(null);

export function useAboutMotion() {
  const context = useContext(AboutMotionContext);
  if (!context) throw new Error("About motion controls require AboutMotion.");
  return context;
}

/** Server-rendered story slots over the shared site backdrop. */
export default function AboutMotion({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const siteVideo = useSiteVideo();
  return (
    <AboutMotionContext.Provider
      value={{
        paused,
        toggleMotion: () => {
          const next = !paused;
          setPaused(next);
          siteVideo.setPaused(next);
        },
      }}
    >
      <section
        id="about"
        aria-labelledby="about-heading"
        className={styles.about}
        data-video-background="ai"
      >
        <div className={styles.sectionShade} aria-hidden="true" />
        <div className={styles.sectionContent}>{children}</div>
      </section>
    </AboutMotionContext.Provider>
  );
}
