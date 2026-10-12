"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Layers3,
  Pause,
  Play,
  Smartphone,
} from "lucide-react";
import { useHeroParallax } from "../homescreen/use-hero-parallax";
import ui from "../design.module.css";
import styles from "./editorial.module.css";
import VideoShowcase from "../motion/VideoShowcase";
import { useSiteVideo } from "../motion/SiteVideo";

export default function PageHero({
  eyebrow,
  title,
  accent,
  description,
  action = "Start a conversation",
  href = "/shedule_contact",
  showFilm = true,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  action?: string;
  href?: string;
  showFilm?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const visible = useInView(ref);
  const [paused, setPaused] = useState(false);
  const siteVideo = useSiteVideo();
  const parallax = useHeroParallax(
    ref,
    reduced === false && visible && !paused,
  );
  return (
    <>
      <section
        ref={ref}
        className={styles.pageHero}
        onPointerMove={parallax.movePointer}
        onPointerLeave={parallax.resetPointer}
      >
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <span className={ui.eyebrow}>{eyebrow}</span>
            <h1>
              {title} <span>{accent}</span>
            </h1>
            <p>{description}</p>
            <Link href={href} className={ui.pill}>
              <ArrowUpRight size={18} aria-hidden="true" />
              {action}
            </Link>
          </div>
          <div className={styles.sculptureFrame}>
            <motion.div
              className={styles.sculpture}
              style={parallax.orbit}
              data-active={parallax.active}
              aria-hidden="true"
            >
              <div className={styles.sculptureOrbit} />
              <div className={styles.sculptureOrbitTwo} />
              <div className={styles.sculptureCore}>
                <Layers3 size={64} strokeWidth={1} />
                <span>CONNECTED BY DESIGN</span>
              </div>
              <div className={`${styles.sculpturePlate} ${styles.plateWeb}`}>
                <Code2 size={36} strokeWidth={1.4} />
                <span>WEB</span>
              </div>
              <div className={`${styles.sculpturePlate} ${styles.plateMobile}`}>
                <Smartphone size={36} strokeWidth={1.4} />
                <span>MOBILE</span>
              </div>
              <div className={`${styles.sculpturePlate} ${styles.plateAi}`}>
                <BrainCircuit size={36} strokeWidth={1.4} />
                <span>AI</span>
              </div>
              <span className={styles.sculptureCoordinate}>
                TOKILO / POSSIBILITIES IN MOTION
              </span>
            </motion.div>
            <button
              type="button"
              className={styles.motionToggle}
              aria-pressed={paused}
              aria-label={
                paused ? "Resume page animation" : "Pause page animation"
              }
              onClick={() => {
                const next = !paused;
                setPaused(next);
                siteVideo.setPaused(next);
              }}
            >
              {paused ? <Play size={14} /> : <Pause size={14} />}
              <span>{paused ? "Resume motion" : "Pause motion"}</span>
            </button>
          </div>
        </div>
        <div className={styles.heroBaseline}>
          <span>Design with intention. Engineer for what comes next.</span>
          <span>WEB · MOBILE · INTELLIGENCE</span>
        </div>
      </section>
      {showFilm && <VideoShowcase />}
    </>
  );
}
