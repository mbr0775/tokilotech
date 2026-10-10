"use client";

import { useRef, type PointerEvent } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Search, Workflow, Rocket } from "lucide-react";
import styles from "./delivery.module.css";

const stages = [
  {
    label: "Discover",
    title: "Understand the real problem",
    description: "We begin with your users, business goals, and operational challenges before choosing the technology.",
    detail: "A clear direction",
    icon: Search,
  },
  {
    label: "Design",
    title: "Design the right system",
    description: "We turn requirements into a clear product experience, dependable architecture, and practical delivery plan.",
    detail: "A considered blueprint",
    icon: Workflow,
  },
  {
    label: "Deliver",
    title: "Build, launch, and improve",
    description: "We deliver in focused stages, test carefully, and keep improving the product after launch.",
    detail: "A product ready to grow",
    icon: Rocket,
  },
];

function StageCard({ stage, index }: { stage: typeof stages[number]; index: number }) {
  const cardRef = useRef<HTMLLIElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const lift = useTransform(scrollYProgress, [0, 1], [22, -22]);
  const turn = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const tiltX = useSpring(0, { stiffness: 180, damping: 24 });
  const tiltY = useSpring(0, { stiffness: 180, damping: 24 });
  const Icon = stage.icon;

  function handlePointer(event: PointerEvent<HTMLElement>) {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    tiltX.set((.5 - (event.clientY - bounds.top) / bounds.height) * 8);
    tiltY.set(((event.clientX - bounds.left) / bounds.width - .5) * 10);
  }

  function resetTilt() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <li ref={cardRef} className={styles.stage}>
      <motion.article
        className={`${styles.card} ${index === 2 ? styles.finalCard : ""}`}
        style={{ rotateX: reducedMotion ? 0 : tiltX, rotateY: reducedMotion ? 0 : tiltY }}
        onPointerMove={handlePointer}
        onPointerLeave={resetTilt}
        onPointerCancel={resetTilt}
      >
        <div className={styles.cardTop}>
          <span className={styles.stageLabel}><span className={styles.dot} />{stage.label}</span>
          <span className={styles.number}>0{index + 1}</span>
        </div>
        <div className={styles.artwork} aria-hidden="true">
          <div className={styles.artGrid} />
          <motion.div className={styles.sculpture} style={{ y: reducedMotion ? 0 : lift, rotateZ: reducedMotion ? 0 : turn }}>
            <span className={styles.plateBack} />
            <span className={styles.plateMiddle} />
            <span className={styles.plateFront}><Icon size={56} strokeWidth={1.75} /></span>
          </motion.div>
        </div>
        <div className={styles.cardCopy}>
          <h4>{stage.title}</h4>
          <p>{stage.description}</p>
        </div>
        <div className={styles.cardFoot}><span>{stage.detail}</span></div>
      </motion.article>
    </li>
  );
}

export default function DeliveryApproach() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbitY = useTransform(scrollYProgress, [0, 1], [55, -55]);
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const progress = useTransform(scrollYProgress, [.15, .7], [0, 1]);

  return (
    <section ref={sectionRef} id="delivery-approach" className={styles.process} aria-labelledby="delivery-heading">
      <motion.div aria-hidden="true" className={styles.orbit} style={{ y: reducedMotion ? 0 : orbitY, rotate: reducedMotion ? 0 : orbitRotate }} />
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}><span />Our delivery approach</span>
          <h3 id="delivery-heading">From idea to{" "}<br /><span>useful product.</span></h3>
        </div>
        <p className={styles.intro}>Good products take shape through clear thinking, thoughtful design, and steady delivery. Here’s how we get there together.</p>
      </div>
      <div className={styles.journey} aria-hidden="true">
        <div className={styles.track}><motion.span style={{ scaleX: reducedMotion ? 1 : progress }} /></div>
        <span>01 — Discover</span><span>02 — Design</span><span>03 — Deliver</span>
      </div>
      <ol className={styles.steps}>
        {stages.map((stage, index) => <StageCard key={stage.label} stage={stage} index={index} />)}
      </ol>
      <div className={styles.footer}>
        <p><CheckCircle2 size={17} aria-hidden="true" />Clear communication throughout every stage.</p>
        <a href="#contact">Let’s shape your next idea <ArrowUpRight size={18} aria-hidden="true" /></a>
      </div>
    </section>
  );
}
