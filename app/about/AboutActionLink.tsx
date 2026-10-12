"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ui from "../design.module.css";
import { useAboutMotion } from "./AboutMotion";
import styles from "./AboutActionLink.module.css";

type AboutActionLinkProps = {
  href: string;
  label: string;
  variant?: "pill" | "text";
};

/** A stable, server-rendered link with a decorative rolling label. */
export default function AboutActionLink({
  href,
  label,
  variant = "text",
}: AboutActionLinkProps) {
  const { paused } = useAboutMotion();
  const arrow = (
    <ArrowUpRight size={17} className={styles.arrow} aria-hidden="true" />
  );

  return (
    <Link
      href={href}
      aria-label={label}
      data-motion-paused={paused}
      className={`${variant === "pill" ? ui.pill : ui.textLink} ${styles.link} ${styles[variant]}`}
    >
      {variant === "pill" && arrow}
      <span className={styles.label}>
        <span className={styles.outgoing} aria-hidden="true">
          {label}
        </span>
        <span className={styles.incoming} aria-hidden="true">
          {label}
        </span>
      </span>
      {variant === "text" && arrow}
    </Link>
  );
}
