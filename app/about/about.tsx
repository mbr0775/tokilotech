import { BrainCircuit, Code2, ShieldCheck } from "lucide-react";
import MotionSurface from "../motion/MotionSurface";
import AboutShowcase from "./AboutShowcase";
import AboutMotion from "./AboutMotion";
import AboutHeadline from "./AboutHeadline";
import styles from "./about.module.css";

const strengths = [
  {
    icon: Code2,
    label: "01 / Design & build",
    title: "Product-minded engineering",
    description:
      "Web, mobile, backend, and cloud systems designed around real business outcomes.",
    detail: "Web · Mobile · Cloud",
    art: "engineering",
  },
  {
    icon: BrainCircuit,
    label: "02 / Intelligent by design",
    title: "Practical AI",
    description:
      "Intelligent automation and data-driven features that solve useful, measurable problems.",
    detail: "AI · Automation · Data",
    art: "intelligence",
  },
  {
    icon: ShieldCheck,
    label: "03 / Ready for what follows",
    title: "Built for growth",
    description:
      "Maintainable foundations that can evolve as your users, team, and operations expand.",
    detail: "Maintainable · Connected · Adaptable",
    art: "growth",
  },
] as const;

export default function About() {
  return (
    <AboutMotion>
      <div className={styles.storyIntro}>
        <div className={styles.storyTitle}>
          <span className={styles.eyebrow} data-scroll-reveal="down">
            <i aria-hidden="true" />
            About Tokilo · MBR Group company
          </span>
          <AboutHeadline />
        </div>
        <div
          className={styles.storyCopy}
          data-scroll-reveal="right"
          data-scroll-delay="1"
        >
          <span className={styles.copyLabel}>
            A little clarity. A lot of possibility.
          </span>
          <p>
            Tokilo Technologies is an emerging software and AI company creating
            digital products for startups, small businesses, and growing brands.
          </p>
          <p>
            We combine product thinking, user-focused design, and dependable
            engineering to build websites, mobile applications, backend systems,
            automation tools, and intelligent software that solve real
            operational problems.
          </p>
        </div>
      </div>
      <div data-scroll-reveal="depth">
        <AboutShowcase />
      </div>
      <div className={styles.strengths}>
        {strengths.map((strength, index) => {
          const Icon = strength.icon;
          return (
            <MotionSurface
              key={strength.title}
              className={`${styles.strength} ${styles[strength.art]}`}
              delay={index * 0.08}
            >
              <div className={styles.strengthTop}>
                <span>{strength.label}</span>
                <div className={styles.strengthIcon} aria-hidden="true">
                  <i />
                  <i />
                  <Icon size={34} strokeWidth={1.3} />
                </div>
              </div>
              <h3>{strength.title}</h3>
              <p>{strength.description}</p>
              <span className={styles.strengthDetail}>{strength.detail}</span>
            </MotionSurface>
          );
        })}
      </div>
    </AboutMotion>
  );
}
