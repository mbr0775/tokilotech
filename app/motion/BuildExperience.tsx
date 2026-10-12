"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  ArrowUpRight,
  Code2,
  Layers3,
  Pause,
  Play,
  Rocket,
  ScanLine,
} from "lucide-react";
import styles from "./build.module.css";

const chapters = [
  {
    number: "01",
    label: "Discover & design",
    title: "Start with the right questions.",
    description:
      "Your goals, your users, your next move. We turn the brief into a clear product direction, useful journeys and an interface that feels like your brand.",
    details: "Product direction / User experience / Interface design",
    icon: ScanLine,
  },
  {
    number: "02",
    label: "Engineer & connect",
    title: "Make every layer work together.",
    description:
      "From responsive interfaces to APIs and databases, we build connected foundations. Performance, accessibility and search visibility belong in the build from the start.",
    details: "Web & mobile / Backend systems / Practical AI",
    icon: Code2,
  },
  {
    number: "03",
    label: "Test & launch",
    title: "Turn a good idea into a real product.",
    description:
      "Check the experience across devices, refine the details and prepare for launch. Maintainable systems give you a foundation to improve as your business grows.",
    details: "Quality checks / Launch preparation / Room to grow",
    icon: Rocket,
  },
];
const query = "(prefers-reduced-motion: no-preference) and (min-width: 851px)";
function subscribe(callback: () => void) {
  const preference = window.matchMedia(query);
  preference.addEventListener("change", callback);
  return () => preference.removeEventListener("change", callback);
}
const canAnimate = () => window.matchMedia(query).matches;

export default function BuildExperience() {
  const ref = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const motionAllowed = useSyncExternalStore(
    subscribe,
    canAnimate,
    () => false,
  );
  const strength = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });
  useEffect(() => {
    strength.set(motionAllowed && !paused ? 1 : 0);
  }, [motionAllowed, paused, strength]);
  const rotation = useTransform(
    () => -24 + progress.get() * 35 * strength.get(),
  );
  const topY = useTransform(() => -48 - progress.get() * 100 * strength.get());
  const bottomY = useTransform(
    () => 48 + progress.get() * 100 * strength.get(),
  );
  const middleX = useTransform(() => progress.get() * 18 * strength.get());

  return (
    <section
      ref={ref}
      id="how-we-build"
      data-video-background="engineering"
      className={styles.section}
      aria-labelledby="build-heading"
    >
      <div className={styles.shade} aria-hidden="true" />
      <div className={styles.header}>
        <span className={styles.eyebrow}>The thinking behind the build</span>
        <h2 id="build-heading">
          One idea.
          <br />
          <span>Every layer considered.</span>
        </h2>
        <p>
          A connected approach to design, engineering and launch. Scroll to see
          how the pieces come together.
        </p>
      </div>
      <div className={styles.layout}>
        <div className={styles.visualRail}>
          <div className={styles.diagram} aria-hidden="true">
            <div className={styles.diagramGrid} />
            <motion.div
              className={styles.stack}
              style={{ rotateZ: rotation, rotateX: 42, rotateY: -8 }}
            >
              <motion.div
                className={`${styles.layer} ${styles.design}`}
                style={{ y: topY }}
              >
                <ScanLine size={42} strokeWidth={1} />
                <span>01 / EXPERIENCE</span>
                <div className={styles.wireframe}>
                  <i />
                  <i />
                  <i />
                </div>
              </motion.div>
              <motion.div
                className={`${styles.layer} ${styles.engineering}`}
                style={{ x: middleX }}
              >
                <Code2 size={42} strokeWidth={1} />
                <span>02 / ENGINEERING</span>
                <div className={styles.codeLines}>
                  <i />
                  <i />
                  <i />
                </div>
              </motion.div>
              <motion.div
                className={`${styles.layer} ${styles.launch}`}
                style={{ y: bottomY }}
              >
                <Rocket size={42} strokeWidth={1} />
                <span>03 / DELIVERY</span>
                <div className={styles.launchTrack}>
                  <i />
                  <i />
                  <i />
                </div>
              </motion.div>
            </motion.div>
          </div>
          <div className={styles.caption}>
            <Layers3 size={16} aria-hidden="true" />
            <span>Designed as one. Built in layers.</span>
            {motionAllowed && (
              <button
                type="button"
                onClick={() => setPaused((value) => !value)}
                aria-label={
                  paused
                    ? "Resume process animation"
                    : "Pause process animation"
                }
                aria-pressed={paused}
              >
                {paused ? <Play size={14} /> : <Pause size={14} />}
              </button>
            )}
          </div>
        </div>
        <div className={styles.chapters}>
          {chapters.map(
            ({ number, label, title, description, details, icon: Icon }) => (
              <article
                key={number}
                className={styles.chapter}
                data-scroll-reveal="up"
              >
                <div className={styles.chapterLabel}>
                  <span>{number}</span>
                  <Icon size={18} aria-hidden="true" />
                  {label}
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className={styles.details}>{details}</span>
              </article>
            ),
          )}
          <a href="/shedule_contact" className={styles.link}>
            Let’s talk about your idea{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
