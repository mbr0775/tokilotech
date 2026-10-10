"use client";

import { MotionConfig, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { setupScrollReveals } from "../../lib/scroll-reveals";
import styles from "./scroll.module.css";

export default function ScrollExperience({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const depthTargets = useRef<HTMLElement[]>([]);
  const depthEnabled = useRef(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });

  const updateDepth = useCallback(() => {
    if (!depthEnabled.current) return;
    const viewport = window.innerHeight;
    depthTargets.current.forEach((element) => {
      const frame = element.parentElement;
      if (!frame) return;
      const bounds = frame.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > viewport) return;
      const progress = Math.max(0, Math.min(1, (viewport - bounds.top) / (viewport + bounds.height)));
      const distance = element.dataset.scrollDepth === "hero" ? 85 : 32;
      element.style.setProperty("--depth-y", `${((progress - 0.5) * distance).toFixed(2)}px`);
    });
  }, []);

  useMotionValueEvent(scrollY, "change", updateDepth);

  useEffect(() => {
    const scope = root.current;
    if (!scope) return;
    const stopReveals = setupScrollReveals(scope);
    // Keep touch scrolling light; only large screens get continuous parallax.
    const preference = window.matchMedia("(prefers-reduced-motion: no-preference) and (min-width: 851px) and (pointer: fine)");
    depthTargets.current = [...scope.querySelectorAll<HTMLElement>("[data-scroll-depth]")];
    const updatePreference = () => {
      depthEnabled.current = preference.matches;
      scope.dataset.scrollDepthEnabled = String(preference.matches);
      if (preference.matches) updateDepth();
      else depthTargets.current.forEach((element) => element.style.removeProperty("--depth-y"));
    };
    updatePreference();
    preference.addEventListener("change", updatePreference);
    window.addEventListener("resize", updateDepth, { passive: true });

    return () => {
      stopReveals();
      preference.removeEventListener("change", updatePreference);
      window.removeEventListener("resize", updateDepth);
      depthTargets.current.forEach((element) => element.style.removeProperty("--depth-y"));
      delete scope.dataset.scrollDepthEnabled;
      depthEnabled.current = false;
    };
  }, [updateDepth]);

  return (
    <MotionConfig reducedMotion="user">
      <div ref={root} className={`${className} ${styles.scene}`}>
        <motion.div aria-hidden="true" className={styles.progress} style={{ scaleX: progress }} />
        {children}
      </div>
    </MotionConfig>
  );
}
