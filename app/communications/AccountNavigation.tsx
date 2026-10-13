import Link from "next/link";
import { House } from "lucide-react";
import BackButton from "../navigation/BackButton";
import styles from "./communications.module.css";

export default function AccountNavigation() {
  return <nav className={styles.accountNavigation} aria-label="Account page navigation">
    <BackButton className={styles.backLink} showLabel />
    <Link href="/" className={styles.backLink}><House size={17} aria-hidden="true" />Home</Link>
  </nav>;
}
