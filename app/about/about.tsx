import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  ShieldCheck,
} from "lucide-react";
import ui from "../design.module.css";
import styles from "./about.module.css";

const strengths = [
  {
    icon: Code2,
    title: "Product-minded engineering",
    description:
      "Web, mobile, backend, and cloud systems designed around real business outcomes.",
  },
  {
    icon: BrainCircuit,
    title: "Practical AI",
    description:
      "Intelligent automation and data-driven features that solve useful, measurable problems.",
  },
  {
    icon: ShieldCheck,
    title: "Built for growth",
    description:
      "Maintainable foundations that can evolve as your users, team, and operations expand.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className={styles.about}
    >
      <div className={styles.storyIntro}>
        <span className={styles.eyebrow}>About Tokilo · MBR Group company</span>
        <h2 id="about-heading">Technology should make growth feel simpler.</h2>
        <p>
          Tokilo Technologies is an emerging software and AI company creating
          digital products for startups, small businesses, and growing brands.
        </p>
        <p>
          We combine product thinking, user-focused design, and dependable
          engineering to build websites, mobile applications, backend systems,
          automation tools, and intelligent software that solve real operational
          problems.
        </p>
      </div>
      <div className={styles.visual} data-scroll-reveal="depth">
        <div className={styles.visualMedia}>
          <Image
            src="/media/tokilo-about-visual.png"
            alt="Connected web, mobile and AI products with a metallic ribbon representing growth."
            fill
            sizes="(max-width: 600px) calc(100vw - 36px), (max-width: 1100px) calc(100vw - 44px), 96vw"
            className={styles.visualImage}
            data-scroll-depth="visual"
          />
          <span className={styles.visualLabel}>About Tokilo</span>
        </div>
        <div className={styles.visualActions}>
          <Link href="/projects" className={ui.pill}>
            <ArrowUpRight size={17} aria-hidden="true" />
            See what we build
          </Link>
          <Link
            href="/shedule_contact"
            className={`${ui.textLink} ${styles.secondaryAction}`}
          >
            Talk to our team <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className={styles.strengths}>
        {strengths.map((strength, index) => {
          const Icon = strength.icon;
          return (
            <article
              key={strength.title}
              className={styles.strength}
              data-scroll-reveal={["left", "up", "right"][index]}
              data-scroll-delay={index}
            >
              <div className={styles.strengthIcon}>
                <Icon size={25} strokeWidth={1.2} aria-hidden="true" />
              </div>
              <div>
                <h3>{strength.title}</h3>
                <p>{strength.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
