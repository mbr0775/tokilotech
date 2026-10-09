"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun, ArrowUpRight } from "lucide-react";
import { useTheme } from "../theme-provider";
import styles from "../design.module.css";

const navItems = [
  { label: "Home", sectionId: "home" },
  { label: "About", sectionId: "about" },
  { label: "Projects", sectionId: "projects" },
  { label: "Services", sectionId: "services" },
  { label: "Team", sectionId: "team" },
  { label: "Contact", sectionId: "contact" },
];

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const updateSection = () => {
      let current = "home";
      for (const item of navItems) {
        const section = document.getElementById(item.sectionId);
        if (section && section.getBoundingClientRect().top <= 200) current = item.sectionId;
      }
      setActiveSection(current);
    };
    updateSection();
    window.addEventListener("scroll", updateSection, { passive: true });
    return () => window.removeEventListener("scroll", updateSection);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [mobileOpen]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <div className={styles.navRow}>
          <a href="#home" className={styles.brand} aria-label="Tokilo Technologies home" onClick={() => setMobileOpen(false)}>
            <span className={styles.brandName}>TOKILO</span>{" "}
            <span className={styles.brandDescriptor}>TECHNOLOGIES</span>
          </a>
          <div className={styles.navLinks}>
            {navItems.map((item) => <a key={item.sectionId} href={`#${item.sectionId}`} aria-current={activeSection === item.sectionId ? "location" : undefined}>{item.label}</a>)}
          </div>
          <div className={styles.navActions}>
            <Link href="/login" className={styles.login}>Login</Link>
            <button type="button" onClick={toggleTheme} className={styles.themeButton} aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>{theme === "dark" ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}</button>
            <a href="#contact" className={styles.navCta}>Start Project<ArrowUpRight size={16} aria-hidden="true" /></a>
            <button type="button" className={styles.menuButton} onClick={() => setMobileOpen((open) => !open)} aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label={mobileOpen ? "Close navigation" : "Open navigation"}>{mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}</button>
          </div>
        </div>
        {mobileOpen && <div id="mobile-navigation" className={styles.mobileMenu}>
          {navItems.map((item) => <a key={item.sectionId} href={`#${item.sectionId}`} onClick={() => setMobileOpen(false)} aria-current={activeSection === item.sectionId ? "location" : undefined}>{item.label}</a>)}
          <Link href="/login" onClick={() => setMobileOpen(false)}>Login</Link>
          <a href="#contact" className={styles.navCta} onClick={() => setMobileOpen(false)}>Start Project<ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>}
      </nav>
    </header>
  );
}
