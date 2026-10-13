"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Moon, Sun, ArrowUpRight } from "lucide-react";
import { useTheme } from "../theme-provider";
import styles from "../design.module.css";
import { SiteVideoControl } from "../motion/SiteVideo";
import AccountIcons from "../communications/AccountIcons";
import { useCommunications } from "../communications/CommunicationProvider";
import { isWebsiteAdmin } from "../../lib/admin-access";
import { supabase } from "../../lib/supabaseClient";
import account from "./account.module.css";
const links = [
  { label: "Work", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/shedule_contact" },
];
export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useCommunications();
  const [accountError, setAccountError] = useState("");
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
            <AccountIcons />
            <div className={account.displayControls}>
              <SiteVideoControl />
            </div>
            <Link
              href={
                user
                  ? isWebsiteAdmin(user)
                    ? "/admin"
                    : "/messages"
                  : "/login"
              }
              className={styles.login}
            >
              {user ? "Account" : "Sign in"}
            </Link>
            <button
              className={`${styles.themeButton} ${account.desktopTheme}`}
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
            <Link
              href={
                user
                  ? isWebsiteAdmin(user)
                    ? "/admin"
                    : "/messages"
                  : "/login"
              }
              onClick={() => setOpen(false)}
            >
              {user ? "My account" : "Sign in"}
            </Link>
            <Link href="/messages" onClick={() => setOpen(false)}>
              Messages
            </Link>
            <Link href="/notifications" onClick={() => setOpen(false)}>
              Notifications
            </Link>
            <div className={account.mobileControls}>
              <SiteVideoControl />
              <button
                type="button"
                className={styles.themeButton}
                onClick={toggleTheme}
                aria-label={
                  theme === "dark"
                    ? "Switch to light theme"
                    : "Switch to dark theme"
                }
              >
                {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              </button>
            </div>
            {user && (
              <button
                type="button"
                className={account.logout}
                onClick={async () => {
                  const { error } = await supabase.auth.signOut();
                  if (error)
                    setAccountError("Could not sign out. Please try again.");
                  else {
                    setOpen(false);
                    router.push("/");
                  }
                }}
              >
                Sign out
              </button>
            )}
            {accountError && <p role="alert">{accountError}</p>}
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
