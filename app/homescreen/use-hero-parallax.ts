"use client";

import { useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useSyncExternalStore, type PointerEvent, type RefObject } from "react";

const POINTER_QUERY = "(min-width: 851px) and (pointer: fine)";
const spring = { stiffness: 95, damping: 24, mass: 0.7 };

function subscribeToPointer(callback: () => void) {
  const query = window.matchMedia(POINTER_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

const hasFinePointer = () => window.matchMedia(POINTER_QUERY).matches;

export function useHeroParallax(target: RefObject<HTMLElement | null>, enabled: boolean) {
  const desktop = useSyncExternalStore(subscribeToPointer, hasFinePointer, () => false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, spring);
  const y = useSpring(pointerY, spring);
  const strength = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end start"] });

  useEffect(() => {
    // Flatten immediately when paused or when the motion preference changes.
    strength.set(enabled && desktop ? 1 : 0);
    if (!enabled || !desktop) {
      pointerX.set(0);
      pointerY.set(0);
    }
  }, [desktop, enabled, pointerX, pointerY, strength]);

  const backgroundX = useTransform(() => -x.get() * 22 * strength.get());
  const backgroundY = useTransform(() => (scrollYProgress.get() * 150 - y.get() * 16) * strength.get());
  const backgroundScale = useTransform(() => 1.04 + scrollYProgress.get() * 0.08 * strength.get());
  const copyX = useTransform(() => x.get() * 12 * strength.get());
  const copyY = useTransform(() => (y.get() * 8 - scrollYProgress.get() * 62) * strength.get());
  const copyRotateX = useTransform(() => -y.get() * 1.5 * strength.get());
  const copyRotateY = useTransform(() => x.get() * 2 * strength.get());
  const cardX = useTransform(() => x.get() * 24 * strength.get());
  const cardY = useTransform(() => (y.get() * 14 - scrollYProgress.get() * 100) * strength.get());
  const cardRotateX = useTransform(() => -y.get() * 5 * strength.get());
  const cardRotateY = useTransform(() => x.get() * 6 * strength.get());
  const orbitX = useTransform(() => -x.get() * 32 * strength.get());
  const orbitY = useTransform(() => (y.get() * 20 + scrollYProgress.get() * 80) * strength.get());
  const orbitRotate = useTransform(() => (x.get() * 6 + scrollYProgress.get() * 14) * strength.get());

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  function movePointer(event: PointerEvent<HTMLElement>) {
    if (!enabled || !desktop || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    pointerX.set(Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2)));
    pointerY.set(Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2)));
  }

  return {
    active: enabled && desktop,
    movePointer,
    resetPointer,
    background: { x: backgroundX, y: backgroundY, scale: backgroundScale },
    copy: { x: copyX, y: copyY, rotateX: copyRotateX, rotateY: copyRotateY, transformPerspective: 1400 },
    card: { x: cardX, y: cardY, rotateX: cardRotateX, rotateY: cardRotateY, transformPerspective: 1100 },
    orbit: { x: orbitX, y: orbitY, rotateZ: orbitRotate },
  };
}
