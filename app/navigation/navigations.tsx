"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Moon, Sun, ArrowUpRight } from "lucide-react";
import { useTheme } from "../theme-provider";
import styles from "../design.module.css";
const links = [
  { label: "Work", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/shedule_contact" },
];
export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <div className={styles.navRow}>
          <Link
            href="/"
            className={styles.brand}
            aria-label="Tokilo Technologies home"
            onClick={() => setOpen(false)}
          >
            <span className={styles.brandSymbol} aria-hidden="true">
              t.
            </span>
            <span>
              <span className={styles.brandName}>TOKILO</span>
              <span className={styles.brandDescriptor}>TECHNOLOGIES</span>
            </span>
          </Link>
          <div className={styles.navLinks}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={
                  pathname.startsWith(link.href) ? "page" : undefined
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className={styles.navActions}>
            <Link href="/login" className={styles.login}>
              Sign in
            </Link>
            <button
              className={styles.themeButton}
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Switch to light theme"
                  : "Switch to dark theme"
              }
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <Link href="/shedule_contact" className={styles.navCta}>
              Let’s talk
              <ArrowUpRight size={17} />
            </Link>
            <button
              ref={menuButton}
              type="button"
              className={styles.menuButton}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Close navigation" : "Open navigation"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {open && (
          <div id="mobile-navigation" className={styles.mobileMenu}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={
                  pathname.startsWith(link.href) ? "page" : undefined
                }
              >
                {link.label}
              </Link>
            ))}
            <Link href="/login" onClick={() => setOpen(false)}>
              Sign in
            </Link>
            <Link
              href="/shedule_contact"
              className={styles.navCta}
              onClick={() => setOpen(false)}
            >
              Start a project
              <ArrowUpRight size={17} />
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
