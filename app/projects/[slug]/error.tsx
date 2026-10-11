"use client";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import PublicShell from "../../ui/PublicShell";
import styles from "../../ui/editorial.module.css";
import ui from "../../design.module.css";
export default function ProjectError({ reset }: { reset: () => void }) {
  return (
    <PublicShell>
      <section className={`${styles.section} ${styles.case}`}>
        <span className={ui.eyebrow}>Tokilo / Project showcase</span>
        <h1 className={ui.heading}>This project is temporarily unavailable.</h1>
        <p className={ui.intro}>
          We couldn&apos;t load the showcase. Try again, or return to the
          portfolio.
        </p>
        <div className={styles.caseLinks}>
          <button type="button" onClick={reset} className={ui.pill}>
            <RefreshCw size={17} />
            Try again
          </button>
          <Link href="/projects" className={ui.textLink}>
            Back to all projects
          </Link>
        </div>
      </section>
    </PublicShell>
  );
}
