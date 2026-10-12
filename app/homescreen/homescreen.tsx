"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  Cloud,
  Code2,
  Megaphone,
  Pause,
  Play,
  Smartphone,
} from "lucide-react";
import styles from "./hero.module.css";
import summaryStyles from "./summary.module.css";
import { useHeroParallax } from "./use-hero-parallax";
import HeroScene from "./HeroScene";
import VideoShowcase from "../motion/VideoShowcase";
import { useSiteVideo } from "../motion/SiteVideo";

const SLIDE_DURATION = 6000;
const slides = [
  {
    service: "Web development",
    image: "/media/services/web-development.jpg",
    alt: "Laptop and workspace for website development",
    icon: Code2,
    cardTitle: "Designed to make an impact.",
    cardText: "Thoughtful design. Powerful engineering.",
    badge: "From concept to launch",
  },
  {
    service: "Digital marketing",
    image: "/media/services/digital-marketing.jpg",
    alt: "Marketing analytics and performance charts on a laptop",
    icon: Megaphone,
    cardTitle: "Make your brand impossible to miss.",
    cardText: "Creative campaigns. Meaningful connections.",
    badge: "Built for your next audience",
  },
  {
    service: "Mobile app development",
    image: "/media/services/mobile-development.jpg",
    alt: "Smartphone displaying mobile applications",
    icon: Smartphone,
    cardTitle: "Great experiences, on the go.",
    cardText: "Made for real people. Ready for everyday life.",
    badge: "From first tap to lasting impact",
  },
  {
    service: "Artificial intelligence",
    image: "/media/services/artificial-intelligence.jpg",
    alt: "Abstract visualization of artificial intelligence and connected data",
    icon: BrainCircuit,
    cardTitle: "A little more intelligent.",
    cardText: "Practical AI. Powerful possibilities.",
    badge: "AI that works for you",
  },
  {
    service: "Cloud & backend",
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

export default function HomeScreen() {
  const siteVideo = useSiteVideo();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  // Server HTML uses the poster. Video starts only after checking the preference.
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    getReducedMotion,
    () => true,
  );
  const pageVisible = useSyncExternalStore(
    subscribeToVisibility,
    getPageVisible,
    () => true,
  );
  const slide = slides[activeIndex];
  const ServiceIcon = slide.icon;
  const heroRef = useRef<HTMLElement>(null);
  const animate =
    !paused && !focusWithin && !reducedMotion && heroVisible && pageVisible;
  const parallax = useHeroParallax(heroRef, animate);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) =>
      setHeroVisible(entry.isIntersecting),
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!animate) return;
    const timer = setInterval(
      () => setActiveIndex((index) => (index + 1) % slides.length),
      SLIDE_DURATION,
    );
    return () => clearInterval(timer);
  }, [animate, activeIndex]);

  return (
    <>
      <section
        ref={heroRef}
        id="home"
        aria-labelledby="hero-heading"
        aria-roledescription="carousel"
        className={styles.hero}
        data-hero-motion={parallax.active ? "active" : "static"}
        onPointerMove={parallax.movePointer}
        onPointerLeave={parallax.resetPointer}
        onFocusCapture={() => {
          parallax.resetPointer();
          setFocusWithin(true);
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setFocusWithin(false);
        }}
      >
        <motion.div
          className={styles.background}
          style={parallax.background}
        ></motion.div>
        <div className={styles.shade} aria-hidden="true" />
        <div className={styles.content}>
          <motion.div className={styles.copyPlane} style={parallax.copy}>
            <div className={styles.copy}>
              <span className={styles.eyebrow}>
                <span />
                Independent thinking. Connected technology.
              </span>
              <h1 id="hero-heading" className={styles.heading}>
                <span>Big ideas.</span> <span>Beautifully</span>{" "}
                <span className={styles.headingAccent}>built.</span>
              </h1>
              <p className={styles.description}>
                We turn your ambition into websites, mobile apps and practical
                AI. Thoughtful design. Reliable engineering. Built to move your
                business forward.
              </p>
              <div className={styles.heroActions}>
                <motion.a
                  href="#contact"
                  className={styles.primaryButton}
                  whileHover={reducedMotion ? undefined : { scale: 1.025 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                >
                  <ArrowRight size={22} aria-hidden="true" />
                  Let’s build something
                </motion.a>
                <a href="#projects" className={styles.secondaryButton}>
                  Explore our work <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
              <div className={styles.expertise}>
                <span>DESIGN</span>
                <i />
                <span>DEVELOPMENT</span>
                <i />
                <span>INTELLIGENCE</span>
              </div>
            </div>
          </motion.div>
          <HeroScene style={parallax.orbit} active={animate} />
          <motion.a
            href="#services"
            className={styles.serviceCard}
            aria-label={`Explore ${slide.service} services`}
            style={parallax.card}
          >
            <div className={styles.cardImage}>
              <Image
                key={slide.image}
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="68px"
                className={styles.servicePhoto}
              />
            </div>
            <div className={styles.cardCopy}>
              <span className={styles.cardEyebrow}>
                <ServiceIcon size={18} aria-hidden="true" />
                {slide.service}
              </span>
              <strong>{slide.cardTitle}</strong>
              <p>{slide.cardText}</p>
              <span className={styles.cardFootnote}>
                {slide.badge}
                <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </div>
          </motion.a>
          <div
            className={styles.slideControls}
            aria-label="Hero slideshow controls"
          >
            <div className={styles.slideIndicators}>
              {slides.map((item, index) => (
                <button
                  key={item.service}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={styles.slideIndicator}
                  aria-label={`Show ${item.service}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                >
                  <span
                    key={`${activeIndex}-${animate}`}
                    className={styles.indicatorFill}
                    style={{ animation: !animate ? "none" : undefined }}
                  />
                </button>
              ))}
            </div>
            {!reducedMotion && (
              <button
                type="button"
                className={styles.pauseButton}
                onClick={() => {
                  const next = !paused;
                  setPaused(next);
                  siteVideo.setPaused(next);
                }}
                aria-label={
                  paused ? "Play hero animation" : "Pause hero animation"
                }
              >
                {paused ? (
                  <Play size={13} aria-hidden="true" />
                ) : (
                  <Pause size={13} aria-hidden="true" />
                )}
                {paused ? "Play" : "Pause"}
              </button>
            )}
            <span className={styles.slideCount}>
              <span className="sr-only">
                Slide {activeIndex + 1} of {slides.length}
              </span>
              <span aria-hidden="true" className={styles.slideCountVisual}>
                {String(activeIndex + 1).padStart(2, "0")}
                <span> / {String(slides.length).padStart(2, "0")}</span>
              </span>
            </span>
          </div>
          <a href="#about" className={styles.scrollCue}>
            <ArrowDown size={14} aria-hidden="true" />
            Scroll to explore
          </a>
        </div>
      </section>
      <VideoShowcase />
      <section
        id="digital-growth"
        className={summaryStyles.summary}
        aria-labelledby="service-summary-heading"
      >
        <div className={summaryStyles.inner}>
          <div className={summaryStyles.intro} data-scroll-reveal="left">
            <span className={summaryStyles.service}>
              <Code2 size={18} strokeWidth={1.5} aria-hidden="true" />
              What we build
            </span>
            <h2 id="service-summary-heading" className={summaryStyles.heading}>
              Digital products.
              <br />
              Real business growth.
            </h2>
          </div>
          <div className={summaryStyles.copy} data-scroll-reveal="up">
            <p className={summaryStyles.description}>
              Tokilo Technologies builds fast websites, mobile apps and
              practical AI solutions for startups and growing businesses.
              Thoughtful design, reliable engineering and SEO foundations—from
              your first idea to launch.
            </p>
            <ul
              className={summaryStyles.capabilities}
              aria-label="Our core services"
            >
              {["Web development", "Mobile apps", "AI & automation"].map(
                (capability) => (
                  <li key={capability}>
                    <Check size={14} strokeWidth={1.5} aria-hidden="true" />
                    {capability}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div
            className={summaryStyles.actions}
            data-scroll-reveal="right"
            data-scroll-delay="1"
          >
            <span className={summaryStyles.actionEyebrow}>
              Built around your ambition
            </span>
            <h3>Your next chapter starts here.</h3>
            <div className={summaryStyles.links}>
              <a href="#projects" className={summaryStyles.primaryLink}>
                Explore our work
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a href="#about" className={summaryStyles.secondaryLink}>
                Discover Tokilo
                <ArrowDown size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
