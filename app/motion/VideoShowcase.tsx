"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  BrainCircuit,
  Code2,
  Layers3,
  Pause,
  Play,
  Sprout,
} from "lucide-react";
import BackgroundVideo from "./BackgroundVideo";
import {
  aiFootage,
  engineeringFootage,
  growthFootage,
  productFootage,
} from "./background-media";
import styles from "./showcase-video.module.css";

const films = [
  {
    label: "Connected products",
    title: "Every screen. One connected experience.",
    description: "Web, mobile and backend systems designed to work together.",
    icon: Code2,
    ...productFootage,
  },
  {
    label: "Practical AI",
    title: "Intelligence with a useful purpose.",
    description:
      "Automation and connected data that help simplify everyday operations.",
    icon: BrainCircuit,
    ...aiFootage,
  },
  {
    label: "Digital engineering",
    title: "Thoughtful from the inside out.",
    description:
      "Considered interfaces built on dependable software foundations.",
    icon: Layers3,
    ...engineeringFootage,
  },
  {
    label: "Built for growth",
    title: "A foundation for your next chapter.",
    description:
      "Maintainable products that can evolve alongside your business.",
    icon: Sprout,
    ...growthFootage,
  },
] as const;
const query = "(prefers-reduced-motion: no-preference) and (min-width: 851px)";
function subscribe(callback: () => void) {
  const preference = window.matchMedia(query);
  preference.addEventListener("change", callback);
  return () => preference.removeEventListener("change", callback);
}
const canAnimate = () => window.matchMedia(query).matches;

/** Owner-created concept films, separate from real client work and service content. */
export default function VideoShowcase() {
  const ref = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selectorFocused, setSelectorFocused] = useState(false);
  const allowed = useSyncExternalStore(subscribe, canAnimate, () => false);
  const strength = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 85, damping: 26 });
  useEffect(() => {
    strength.set(allowed && !paused ? 1 : 0);
  }, [allowed, paused, strength]);
  const imageY = useTransform(
    () => (progress.get() - 0.5) * 42 * strength.get(),
  );
  const film = films[selected];

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % films.length;
    else if (event.key === "ArrowLeft")
      next = (index + films.length - 1) % films.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = films.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <section
      ref={ref}
      id="digital-in-motion"
      className={styles.section}
      data-video-showcase
      aria-labelledby="film-heading"
    >
      <div className={styles.header}>
        <div data-scroll-reveal="left">
          <span className={styles.eyebrow}>
            TOKILO / POSSIBILITIES IN MOTION
          </span>
          <h2 id="film-heading">
            Ideas take shape.
            <br />
            <span>Possibilities connect.</span>
          </h2>
        </div>
        <p data-scroll-reveal="right">
          A glimpse of how we think about technology: thoughtful experiences,
          connected systems, and room to grow.
        </p>
      </div>
      <div className={styles.film} data-scroll-reveal="depth">
        <div className={styles.chrome}>
          <span>
            <i aria-hidden="true" />
            TOKILO / FOUR FILMS IN MOTION
          </span>
          <span>0{selected + 1} / 04</span>
        </div>
        <div
          id="tokilo-film-panel"
          role="tabpanel"
          aria-labelledby={`tokilo-film-tab-${selected}`}
          className={styles.panel}
        >
          <div className={styles.viewport}>
            <motion.div className={styles.imageLayer} style={{ y: imageY }}>
              <BackgroundVideo
                key={film.src}
                src={film.src}
                poster={film.poster}
                label="Showcase"
                enabled={!paused}
                controls={false}
                loop={selectorFocused}
                onEnded={() =>
                  setSelected((index) => (index + 1) % films.length)
                }
              />
            </motion.div>
            <span className={styles.filmLabel}>A TOKILO CONCEPT FILM</span>
            <button
              className={styles.pause}
              type="button"
              aria-label={`${paused ? "Resume" : "Pause"} showcase video`}
              aria-pressed={paused}
              onClick={() => setPaused(!paused)}
            >
              {paused ? (
                <Play size={15} aria-hidden="true" />
              ) : (
                <Pause size={15} aria-hidden="true" />
              )}
              <span>{paused ? "Resume film" : "Pause film"}</span>
            </button>
          </div>
          <div className={styles.caption}>
            <h3>{film.title}</h3>
            <p>{film.description}</p>
          </div>
        </div>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Explore Tokilo concept films"
          onFocusCapture={() => setSelectorFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              setSelectorFocused(false);
          }}
        >
          {films.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.src}
                ref={(element) => {
                  tabs.current[index] = element;
                }}
                id={`tokilo-film-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={selected === index}
                aria-controls="tokilo-film-panel"
                tabIndex={selected === index ? 0 : -1}
                onClick={() => setSelected(index)}
                onKeyDown={(event) => moveTab(event, index)}
              >
                <span className={styles.number}>0{index + 1}</span>
                <Icon size={19} strokeWidth={1.5} aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
