import Link from "next/link";
import styles from "./design.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a href="mailto:mubassirnasar@gmail.com" className={styles.footerEmail}><span>Email:</span>mubassirnasar@gmail.com</a>
        <div className={styles.footerLinks}>
          <p>Tokilo Technologies<br />An MBR Group company</p>
          <a href="tel:+94705373833">Phone: +94 705373833</a>
          <nav aria-label="Footer navigation"><a href="#about">About</a><a href="#services">Services</a><a href="#projects">Projects</a><Link href="/privacy-policy">Privacy Policy</Link><Link href="/terms-and-conditions">Terms &amp; Conditions</Link></nav>
        </div>
        <div className={styles.footerBottom}><span>© {new Date().getFullYear()} Tokilo Technologies</span><a href="#home">Back to top ↑</a></div>
      </div>
    </footer>
  );
}
