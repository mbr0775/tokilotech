"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type PointerEvent,
} from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { BrainCircuit, Code2, Layers3, Pause, Play } from "lucide-react";
import styles from "./about.module.css";
import { useAboutMotion } from "./AboutMotion";
import AboutActionLink from "./AboutActionLink";

const query =
  "(prefers-reduced-motion: no-preference) and (min-width: 851px) and (pointer: fine)";
function subscribe(callback: () => void) {
  const preference = window.matchMedia(query);
  preference.addEventListener("change", callback);
  document.addEventListener("visibilitychange", callback);
  return () => {
    preference.removeEventListener("change", callback);
    document.removeEventListener("visibilitychange", callback);
  };
}
const getEnabled = () => window.matchMedia(query).matches && !document.hidden;
const getServerEnabled = () => false;
const spring = { stiffness: 85, damping: 24, mass: 0.7 };

/** Decorative product composition; the company story remains server-rendered. */
export default function AboutShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const available = useSyncExternalStore(
    subscribe,
    getEnabled,
    getServerEnabled,
  );
  const visible = useInView(ref, { margin: "100px" });
  const { paused, toggleMotion } = useAboutMotion();
  const active = available && visible && !paused;
  const strength = useMotionValue(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, spring);
  const y = useSpring(pointerY, spring);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  useEffect(() => {
    strength.set(active ? 1 : 0);
    if (!active) {
      pointerX.set(0);
      pointerY.set(0);
    }
  }, [active, pointerX, pointerY, strength]);

  const sceneX = useTransform(() => x.get() * 12 * strength.get());
  const sceneY = useTransform(() => y.get() * 8 * strength.get());
  const sceneRotateX = useTransform(() => -y.get() * 3 * strength.get());
  const sceneRotateY = useTransform(() => x.get() * 4 * strength.get());
  const planeY = useTransform(
    () => (progress.get() - 0.5) * -60 * strength.get(),
  );
  const planeRotate = useTransform(
    () => (progress.get() - 0.5) * 6 * strength.get() - 2,
  );
  const imageY = useTransform(
    () => (progress.get() - 0.5) * 35 * strength.get(),
  );
  const webY = useTransform(
    () => (progress.get() - 0.5) * -115 * strength.get(),
  );
  const aiY = useTransform(() => (progress.get() - 0.5) * 100 * strength.get());
  const growthY = useTransform(
    () => (progress.get() - 0.5) * -75 * strength.get(),
  );
  const ringRotate = useTransform(
    () => (progress.get() - 0.5) * 32 * strength.get(),
  );

  function move(event: PointerEvent<HTMLDivElement>) {
    if (!active || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(
      Math.max(
        -1,
        Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1),
      ),
    );
    pointerY.set(
      Math.max(
        -1,
        Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1),
      ),
    );
  }
  function reset() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div ref={ref} className={styles.showcase} data-active={active}>
      <div className={styles.showcaseTop}>
        <span>
          <i aria-hidden="true" />
          CONNECTED BY DESIGN
        </span>
        <button
          type="button"
          onClick={toggleMotion}
          aria-pressed={paused}
          aria-label={
            paused ? "Resume About animation" : "Pause About animation"
          }
        >
          {paused ? (
            <Play size={14} aria-hidden="true" />
          ) : (
            <Pause size={14} aria-hidden="true" />
          )}
          <span>{paused ? "Resume motion" : "Pause motion"}</span>
        </button>
      </div>
      <div
        className={styles.stage}
        onPointerMove={move}
        onPointerLeave={reset}
        onPointerCancel={reset}
      >
        <div className={styles.stageGrid} aria-hidden="true" />
        <motion.div
          className={styles.orbit}
          style={{ rotateZ: ringRotate }}
          aria-hidden="true"
        />
        <motion.div
          className={styles.composition}
          style={{
            x: sceneX,
            y: sceneY,
            rotateX: sceneRotateX,
            rotateY: sceneRotateY,
            transformPerspective: 1500,
          }}
        >
          <motion.div
            className={styles.mediaPlane}
            style={{ y: planeY, rotateZ: planeRotate }}
          >
            <div className={styles.planeChrome} aria-hidden="true">
              <span>
                <i />
                <i />
                <i />
              </span>
              <span>TOKILO / DIGITAL POSSIBILITIES</span>
              <Code2 size={13} />
            </div>
            <div className={styles.planeImage}>
              <motion.div className={styles.imageLayer} style={{ y: imageY }}>
                <Image
                  src="/media/tokilo-about-visual.png"
                  alt="Connected web, mobile and AI products with a metallic ribbon representing growth."
                  fill
                  sizes="(max-width: 850px) 90vw, (max-width: 1550px) 70vw, 1050px"
                  className={styles.visualImage}
                />
              </motion.div>
            </div>
          </motion.div>
          <div className={styles.floatingLayers} aria-hidden="true">
            <motion.div
              className={`${styles.capability} ${styles.webCapability}`}
              style={{ y: webY }}
            >
              <div className={styles.capabilityFace}>
                <Code2 size={33} strokeWidth={1.3} />
                <span>01 / ENGINEERING</span>
                <strong>
                  Ideas into
                  <br />
                  experiences.
                </strong>
                <div className={styles.miniLines}>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </motion.div>
            <motion.div
              className={`${styles.capability} ${styles.aiCapability}`}
              style={{ y: aiY }}
            >
              <div className={styles.capabilityFace}>
                <BrainCircuit size={33} strokeWidth={1.3} />
                <span>02 / INTELLIGENCE</span>
                <strong>
                  Practical.
                  <br />
                  Connected.
                </strong>
                <div className={styles.nodeDiagram}>
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </motion.div>
            <motion.div
              className={`${styles.capability} ${styles.growthCapability}`}
              style={{ y: growthY }}
            >
              <div className={styles.capabilityFace}>
                <Layers3 size={28} strokeWidth={1.3} />
                <div>
                  <span>03 / ROOM TO GROW</span>
                  <strong>A foundation for what’s next.</strong>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <div className={styles.showcaseBottom}>
        <p>
          Independent thinking.
          <br />
          <span>Every layer, working together.</span>
        </p>
        <div className={styles.visualActions}>
          <AboutActionLink
            href="/projects"
            label="See what we build"
            variant="pill"
          />
          <AboutActionLink href="/shedule_contact" label="Talk to our team" />
        </div>
      </div>
    </div>
  );
}
