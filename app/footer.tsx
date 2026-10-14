import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./design.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer} data-video-background="growth">
      <div className={styles.container}>
        <div className={styles.footerTop} data-scroll-reveal="up">
          <div>
            <span className={styles.eyebrow}>
              Your next chapter starts here
            </span>
            <h2>
              Good ideas deserve
              <br />a great build.
            </h2>
          </div>
          <Link
            href="/shedule_contact"
            className={styles.footerRound}
            aria-label="Start a project with Tokilo"
          >
            <ArrowUpRight size={40} strokeWidth={1.2} />
          </Link>
        </div>
        <div className={styles.footerLinks}>
          <p>
            Tokilo Technologies
            <br />
            An MBR Group company
          </p>
          <div>
            <a href="mailto:mubassirnasar@gmail.com">mubassirnasar@gmail.com</a>
            <br />
            <a href="tel:+94705373833">+94 705373833</a>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/projects">Work</Link>
            <Link href="/shedule_contact">Contact</Link>
          </nav>
        </div>
        <div className={styles.footerWordmark} aria-hidden="true">
          TOKILO<span>®</span>
        </div>
        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} Tokilo Technologies</span>
          <nav aria-label="Legal navigation">
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/delete-account">Delete account</Link>
            <Link href="/terms-and-conditions">Terms &amp; conditions</Link>
          </nav>
          <a href="#main-content">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
