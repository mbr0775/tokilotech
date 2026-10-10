import Image from "next/image";
import { Award, Code2, Palette, Rocket } from "lucide-react";
import styles from "../design.module.css";
import MotionSurface from "../motion/MotionSurface";

const teamMembers = [
  { name: "Technology Team", role: "Software Engineering", icon: Code2 },
  { name: "Product Team", role: "Design & Product Development", icon: Palette },
  { name: "Innovation Team", role: "AI & Digital Solutions", icon: Rocket },
];

export default function Stakeholders() {
  return (
    <section id="team" aria-labelledby="team-heading" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.leadership}>
          <MotionSurface as="div" className={styles.portrait}>
            <Image src="/mubassir.png" alt="Abul Naser Mubassir Founder and CEO" fill sizes="(max-width: 600px) 100vw, 50vw" />
            <span className={styles.portraitTag}><Award size={16} aria-hidden="true" />Visionary Leadership</span>
          </MotionSurface>
          <div className={styles.leaderInfo} data-scroll-reveal="right" data-scroll-delay="1">
            <span className={styles.eyebrow}>Leadership</span>
            <h2 id="team-heading" className={styles.heading}>Building technology <span>with vision</span></h2>
            <p className={styles.intro}>Driven by innovation, AI, and engineering to create scalable digital products.</p>
            <h3>Abdul Naser Mubassir</h3><p className={styles.leaderRole}>Founder &amp; CEO</p>
            <p>Leading Tokilo Technologies in building AI-powered software solutions and scalable digital products.</p>
          </div>
        </div>
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => {
            const Icon = member.icon;
            return <MotionSurface key={member.name} className={styles.teamCard} delay={index * 0.07}><Icon size={32} strokeWidth={1} aria-hidden="true" /><h4>{member.name}</h4><p>{member.role}</p></MotionSurface>;
          })}
        </div>
      </div>
    </section>
  );
}
