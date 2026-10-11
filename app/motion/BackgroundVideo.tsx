"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./video.module.css";

function subscribe(callback: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", callback);
  document.addEventListener("visibilitychange", callback);
  return () => {
    preference.removeEventListener("change", callback);
    document.removeEventListener("visibilitychange", callback);
  };
}
const canPlay = () => !document.hidden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Lazy, decorative footage; all content remains in the surrounding server HTML. */
export default function BackgroundVideo({ src, poster, label, className, enabled = true, controls = true }: {
  src: string; poster: string; label: string; className?: string; enabled?: boolean; controls?: boolean;
}) {
  const layer = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const playbackAllowed = useSyncExternalStore(subscribe, canPlay, () => false);
  const playing = playbackAllowed && visible && enabled && !paused;

  useEffect(() => {
    const element = layer.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const preloadObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setLoaded(true); preloadObserver.disconnect(); }
    }, { rootMargin: "120px" });
    const visibilityObserver = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    preloadObserver.observe(element);
    visibilityObserver.observe(element);
    return () => { preloadObserver.disconnect(); visibilityObserver.disconnect(); };
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (playing) void element.play().catch(() => {});
    else element.pause();
  }, [playing, loaded, failed, playbackAllowed]);

  return <>
    <div ref={layer} className={`${styles.layer} ${className ?? ""}`} style={{ backgroundImage: `url("${poster}")` }} aria-hidden="true">
      {loaded && playbackAllowed && !failed && <video ref={video} src={src} poster={poster} autoPlay={playing} muted loop playsInline preload="none" tabIndex={-1} onError={() => setFailed(true)} />}
    </div>
    {controls && loaded && playbackAllowed && !failed && <button type="button" className={styles.control} aria-label={`${paused ? "Play" : "Pause"} ${label} background video`} aria-pressed={paused} onClick={() => setPaused((value) => !value)}>{paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}{paused ? "Play background" : "Pause background"}</button>}
  </>;
}
