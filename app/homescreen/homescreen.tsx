"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SlidingNumber } from "@/components/animate-ui/primitives/texts/sliding-number";
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, BrainCircuit, Check, Cloud, Code2, Megaphone, Pause, Play, Smartphone } from "lucide-react";
import styles from "./hero.module.css";
import summaryStyles from "./summary.module.css";
import { useHeroParallax } from "./use-hero-parallax";

const SLIDE_DURATION = 6000;
const SUMMARY_VIDEO_URL = "https://videos.pexels.com/video-files/37014005/15681963_960_540_30fps.mp4";
const SUMMARY_VIDEO_POSTER = "https://images.pexels.com/videos/37014005/3d-abstract-abstract-background-animation-37014005.jpeg?auto=compress&dpr=1&h=750&w=1260";
const slides = [
  {
    service: "Web development",
    heading: ["Big ideas.", "Beautifully built."],
    headingScale: 1,
    description:
      "From your first idea to your next big leap. We craft fast, beautiful websites that turn visitors into customers and move your business forward.",
    action: "Let’s build your website",
    capabilities: ["Custom websites", "E-commerce", "Web applications"],
    image: "/media/services/web-development.jpg",
    alt: "Laptop and workspace for website development",
    icon: Code2,
    cardTitle: "Designed to make an impact.",
    cardText: "Thoughtful design. Powerful engineering.",
    badge: "From concept to launch",
  },
  {
    service: "Digital marketing",
    heading: ["Your brand. More", "reach. Real growth."],
    headingScale: 1,
    description:
      "Reach the right people, tell your story, and turn attention into action. We help your business grow with creative campaigns and clear digital strategy.",
    action: "Let’s grow your brand",
    capabilities: ["Social media", "SEO & content", "Paid campaigns"],
    image: "/media/services/digital-marketing.jpg",
    alt: "Marketing analytics and performance charts on a laptop",
    icon: Megaphone,
    cardTitle: "Make your brand impossible to miss.",
    cardText: "Creative campaigns. Meaningful connections.",
    badge: "Built for your next audience",
  },
  {
    service: "Mobile app development",
    heading: ["Your idea.", "Everywhere. In an app."],
    headingScale: 0.9,
    description:
      "Put your business in your customers’ hands. We build intuitive mobile apps with seamless experiences that people love to use, wherever they go.",
    action: "Let’s create your app",
    capabilities: ["iOS & Android", "Intuitive UI/UX", "Connected experiences"],
    image: "/media/services/mobile-development.jpg",
    alt: "Smartphone displaying mobile applications",
    icon: Smartphone,
    cardTitle: "Great experiences, on the go.",
    cardText: "Made for real people. Ready for everyday life.",
    badge: "From first tap to lasting impact",
  },
  {
    service: "Artificial intelligence",
    heading: ["Work smarter.", "Think bigger. With AI."],
    headingScale: 1,
    description:
      "Turn possibility into practical tools. We create AI solutions and intelligent automation that simplify your work and help your business do more.",
    action: "Let’s explore AI",
    capabilities: ["AI assistants", "Smart automation", "Intelligent tools"],
    image: "/media/services/artificial-intelligence.jpg",
    alt: "Abstract visualization of artificial intelligence and connected data",
    icon: BrainCircuit,
    cardTitle: "A little more intelligent.",
    cardText: "Practical AI. Powerful possibilities.",
    badge: "AI that works for you",
  },
  {
    service: "Cloud & backend",
    heading: ["Strong roots. Room", "to grow. In the cloud."],
    headingScale: 0.88,
    description:
      "Build on a foundation that grows with you. We create reliable backends, connected APIs, and cloud infrastructure to keep your business moving.",
    action: "Let’s build your foundation",
    capabilities: ["Cloud infrastructure", "API development", "Scalable systems"],
    image: "/media/services/cloud-backend.jpg",
    alt: "Server racks supporting cloud infrastructure",
    icon: Cloud,
    cardTitle: "Ready for what comes next.",
    cardText: "Reliable systems. Space to scale.",
    badge: "Built to grow with your business",
  },
] as const;

function subscribeToMotion(callback: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", callback);
  return () => preference.removeEventListener("change", callback);
}

const getReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function subscribeToVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}

const getPageVisible = () => !document.hidden;

function SummaryBackground({ reducedMotion, pageVisible }: { reducedMotion: boolean; pageVisible: boolean }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const playing = visible && pageVisible && !paused && !reducedMotion;

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || !("IntersectionObserver" in window)) return;
    const preloadObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLoaded(true);
        preloadObserver.disconnect();
      }
    }, { rootMargin: "160px" });
    const visibilityObserver = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    preloadObserver.observe(layer);
    visibilityObserver.observe(layer);
    return () => { preloadObserver.disconnect(); visibilityObserver.disconnect(); };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) void video.play().catch(() => {});
    else video.pause();
  }, [playing, loaded, failed]);

  return (
    <>
      <div ref={layerRef} className={summaryStyles.background} aria-hidden="true">
        {loaded && !reducedMotion && !failed && <video ref={videoRef} className={summaryStyles.backgroundVideo} src={SUMMARY_VIDEO_URL} poster={SUMMARY_VIDEO_POSTER} autoPlay={playing} muted loop playsInline preload="none" tabIndex={-1} onError={() => setFailed(true)} />}
      </div>
      <div className={summaryStyles.backgroundShade} aria-hidden="true" />
      {loaded && !reducedMotion && !failed && <button type="button" className={summaryStyles.motionControl} aria-label={paused ? "Play section background video" : "Pause section background video"} aria-pressed={paused} onClick={() => setPaused((value) => !value)}>{paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}{paused ? "Play background" : "Pause background"}</button>}
    </>
  );
}

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);
  // Server HTML uses the poster. Video starts only after checking the preference.
  const reducedMotion = useSyncExternalStore(subscribeToMotion, getReducedMotion, () => true);
  const pageVisible = useSyncExternalStore(subscribeToVisibility, getPageVisible, () => true);
  const slide = slides[activeIndex];
  const ServiceIcon = slide.icon;
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animate = !paused && !focusWithin && !reducedMotion && heroVisible && pageVisible;
  const parallax = useHeroParallax(heroRef, animate);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!animate) video.pause();
    else void video.play().catch(() => {});
  }, [animate, videoFailed]);

  useEffect(() => {
    if (!animate) return;
    const timer = setInterval(() => setActiveIndex((index) => (index + 1) % slides.length), SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [animate, activeIndex]);

  return (
    <>
      <section ref={heroRef} id="home" aria-labelledby="hero-heading" aria-roledescription="carousel" className={styles.hero} data-hero-motion={parallax.active ? "active" : "static"} onPointerMove={parallax.movePointer} onPointerLeave={parallax.resetPointer} onFocusCapture={() => { parallax.resetPointer(); setFocusWithin(true); }} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocusWithin(false); }}>
        <motion.div className={styles.background} aria-hidden="true" style={parallax.background}>
          {!reducedMotion && !videoFailed && <video ref={videoRef} className={styles.backgroundVideo} src="/media/hero-liquid-metal-parallax.mp4" poster="/media/hero-liquid-metal.jpg" autoPlay={animate} muted loop playsInline preload="none" onError={() => setVideoFailed(true)} />}
        </motion.div>
        <div className={styles.shade} aria-hidden="true" />
        <motion.div className={styles.depthOrbits} aria-hidden="true" style={parallax.orbit}>
          <span className={styles.orbitRing} />
          <span className={styles.orbitInner} />
          <span className={styles.orbitGlow} />
        </motion.div>
        <div className={styles.content}>
          <motion.div className={styles.copyPlane} style={parallax.copy}>
            <motion.div key={slide.service} className={styles.copy} aria-live="off" initial={animate ? { opacity: 0, y: 16 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            <span className={styles.eyebrow}>{slide.service} · TOKILO TECHNOLOGIES</span>
            <h1 id="hero-heading" className={styles.heading} style={{ "--heading-scale": slide.headingScale } as CSSProperties}>{slide.heading.map((line) => <span key={line}>{line}</span>)}</h1>
            <motion.a href="#contact" className={styles.primaryButton} whileHover={reducedMotion ? undefined : { scale: 1.025 }} whileTap={reducedMotion ? undefined : { scale: 0.98 }} transition={{ type: "spring", stiffness: 350, damping: 24 }}><ArrowRight size={22} aria-hidden="true" />{slide.action}</motion.a>
            </motion.div>
          </motion.div>
          <motion.a href="#services" className={styles.serviceCard} aria-label={`Explore ${slide.service} services`} style={parallax.card}>
            <div className={styles.cardImage}><Image key={slide.image} src={slide.image} alt={slide.alt} fill sizes="(max-width: 600px) 96px, (max-width: 850px) 135px, (max-width: 1100px) 13vw, 11vw" className={styles.servicePhoto} /></div>
            <div className={styles.cardCopy}>
              <span className={styles.cardEyebrow}><ServiceIcon size={18} aria-hidden="true" />{slide.service}</span>
              <strong>{slide.cardTitle}</strong><p>{slide.cardText}</p>
              <span className={styles.cardFootnote}>{slide.badge}<ArrowUpRight size={18} aria-hidden="true" /></span>
            </div>
          </motion.a>
          <div className={styles.slideControls} aria-label="Hero slideshow controls">
            <div className={styles.slideIndicators}>{slides.map((item, index) => <button key={item.service} type="button" onClick={() => setActiveIndex(index)} className={styles.slideIndicator} aria-label={`Show ${item.service}`} aria-current={index === activeIndex ? "true" : undefined}><span key={`${activeIndex}-${animate}`} className={styles.indicatorFill} style={{ animation: !animate ? "none" : undefined }} /></button>)}</div>
            {!reducedMotion && <button type="button" className={styles.pauseButton} onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play hero animation" : "Pause hero animation"}>{paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}{paused ? "Play" : "Pause"}</button>}
            <span className={styles.slideCount}>
              <span className="sr-only">Slide {activeIndex + 1} of {slides.length}</span>
              <span aria-hidden="true" className={styles.slideCountVisual}>
                {reducedMotion ? String(activeIndex + 1).padStart(2, "0") : <>{activeIndex + 1 < 10 && "0"}<SlidingNumber number={activeIndex + 1} initiallyStable /></>}
                <span> / {String(slides.length).padStart(2, "0")}</span>
              </span>
            </span>
          </div>
          <a href="#about" className={styles.scrollCue}><ArrowDown size={14} aria-hidden="true" />Scroll to explore</a>
        </div>
      </section>
      <section id="digital-growth" className={summaryStyles.summary} aria-labelledby="service-summary-heading">
        <SummaryBackground reducedMotion={reducedMotion} pageVisible={pageVisible} />
        <div className={summaryStyles.inner}>
          <div className={summaryStyles.intro} data-scroll-reveal="left">
            <span className={summaryStyles.service}><Code2 size={18} strokeWidth={1.5} aria-hidden="true" />What we build</span>
            <h2 id="service-summary-heading" className={summaryStyles.heading}>Digital products.<br />Real business growth.</h2>
          </div>
          <div className={summaryStyles.copy} data-scroll-reveal="up">
            <p className={summaryStyles.description}>Tokilo Technologies builds fast websites, mobile apps and practical AI solutions for startups and growing businesses. Thoughtful design, reliable engineering and SEO foundations—from your first idea to launch.</p>
            <ul className={summaryStyles.capabilities} aria-label="Our core services">
              {["Web development", "Mobile apps", "AI & automation"].map((capability) => <li key={capability}><Check size={14} strokeWidth={1.5} aria-hidden="true" />{capability}</li>)}
            </ul>
          </div>
          <div className={summaryStyles.actions} data-scroll-reveal="right" data-scroll-delay="1">
            <span className={summaryStyles.actionEyebrow}>Built around your ambition</span>
            <h3>Your next chapter starts here.</h3>
            <div className={summaryStyles.links}>
              <a href="#projects" className={summaryStyles.primaryLink}>Explore our work<ArrowUpRight size={18} aria-hidden="true" /></a>
              <a href="#about" className={summaryStyles.secondaryLink}>Discover Tokilo<ArrowDown size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
