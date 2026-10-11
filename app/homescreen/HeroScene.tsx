"use client";

import { motion, type MotionStyle } from "framer-motion";
import { BrainCircuit, Code2, Layers3, Smartphone } from "lucide-react";
import styles from "./scene.module.css";

/** Original, decorative product illustration; these panels are not client work. */
export default function HeroScene({ style, active }: { style: MotionStyle; active: boolean }) {
  return (
    <motion.div className={styles.scene} style={style} data-active={active} aria-hidden="true">
      <div className={styles.stage}>
        <div className={styles.halo} />
        <div className={styles.sphere}><span /><span /><span /><span /><span /></div>
        <div className={styles.orbit} /><div className={styles.orbitTwo} />
        <div className={styles.browser}>
          <div className={styles.browserBar}><i /><i /><i /><span>tokilo / digital experiences</span><Code2 size={14} /></div>
          <div className={styles.browserBody}>
            <span className={styles.miniLabel}>FROM POSSIBILITY TO PRODUCT</span>
            <strong>Ideas take<br /><em>shape.</em></strong>
            <div className={styles.mockLine} /><div className={styles.mockLineShort} />
            <div className={styles.mockButton}>Designed around you <span>+</span></div>
            <div className={styles.tiles}><span /><span /><span /></div>
          </div>
        </div>
        <div className={styles.phone}>
          <div className={styles.notch} /><Smartphone size={21} />
          <span>IN YOUR HANDS</span><strong>Simple.<br />Connected.</strong>
          <div className={styles.phoneArt}><Layers3 size={46} strokeWidth={1} /></div>
          <div className={styles.phoneLines}><i /><i /><i /></div><div className={styles.phoneButton} />
        </div>
        <div className={`${styles.badge} ${styles.aiBadge}`}><BrainCircuit size={23} strokeWidth={1.4} /><span>Practical AI<small>Intelligent by design</small></span></div>
        <div className={`${styles.badge} ${styles.codeBadge}`}><Code2 size={22} strokeWidth={1.4} /><span>Built with purpose</span></div>
        <div className={styles.coordinates}><span>DESIGN × ENGINEERING</span><span>WEB / MOBILE / AI</span></div>
      </div>
    </motion.div>
  );
}
