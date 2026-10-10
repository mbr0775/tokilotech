"use client";

import { motion, useAnimationControls, useInView, useSpring } from "framer-motion";
import { useEffect, useRef, useSyncExternalStore, type PointerEvent, type ReactNode } from "react";
import styles from "./surface.module.css";

const MOTION_QUERY = "(prefers-reduced-motion: no-preference)";
const TILT_QUERY = `${MOTION_QUERY} and (min-width: 851px) and (hover: hover) and (pointer: fine)`;
const spring = { stiffness: 180, damping: 24, mass: 0.6 };

function subscribe(callback: () => void) {
  const queries = [MOTION_QUERY, TILT_QUERY].map((query) => window.matchMedia(query));
  queries.forEach((query) => query.addEventListener("change", callback));
  return () => queries.forEach((query) => query.removeEventListener("change", callback));
}

const getMotion = () => window.matchMedia(MOTION_QUERY).matches;
const getTilt = () => window.matchMedia(TILT_QUERY).matches;
const serverPreference = () => false;

/** Server-visible content with a one-time entrance and optional pointer depth. */
export default function MotionSurface({ children, className, as = "article", delay = 0 }: {
  children: ReactNode;
  className?: string;
  as?: "article" | "div";
  delay?: number;
}) {
  const ref = useRef<HTMLElement & HTMLDivElement>(null);
  const entered = useRef(false);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const motionEnabled = useSyncExternalStore(subscribe, getMotion, serverPreference);
  const tiltEnabled = useSyncExternalStore(subscribe, getTilt, serverPreference);
  const controls = useAnimationControls();
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  useEffect(() => {
    if (!motionEnabled) {
      controls.stop();
      controls.set({ opacity: 1, y: 0 });
      return;
    }
    if (!inView || entered.current) return;
    entered.current = true;
    void controls.start({
      opacity: [0, 1], y: [24, 0],
      transition: { duration: 0.55, delay: Math.min(delay, 0.2), ease: [0.22, 1, 0.36, 1] },
    });
  }, [controls, delay, inView, motionEnabled]);

  useEffect(() => {
    if (!tiltEnabled) {
      rotateX.jump(0);
      rotateY.jump(0);
    }
  }, [rotateX, rotateY, tiltEnabled]);

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  function move(event: PointerEvent<HTMLElement>) {
    if (!tiltEnabled || event.pointerType !== "mouse" || ref.current?.contains(document.activeElement)) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const x = Math.max(-0.5, Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5));
    const y = Math.max(-0.5, Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5));
    rotateX.set(-y * 7);
    rotateY.set(x * 7);
  }

  const Surface = as === "div" ? motion.div : motion.article;
  return (
    <Surface ref={ref} className={`${styles.surface} ${className ?? ""}`}
      initial={false} animate={controls}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}
      onFocusCapture={() => {
        controls.stop();
        controls.set({ opacity: 1, y: 0 });
        entered.current = true;
        reset();
      }}>
      {children}
    </Surface>
  );
}
