"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Package,
  PanelsTopLeft,
  MessageSquare,
  Bell,
} from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import { isWebsiteAdmin } from "../../../lib/admin-access";
import styles from "../workspace.module.css";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Website showcase", icon: PanelsTopLeft },
  { href: "/admin/portfolio", label: "Portfolio projects", icon: FolderOpen },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/messages", label: "Support messages", icon: MessageSquare },
  { href: "/notifications", label: "Notifications", icon: Bell },
];

export default function AdminWorkspace({
  children,
  title,
  active = "/admin",
}: {
  children: ReactNode;
  title: string;
  active?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    let alive = true;
    void supabase.auth
      .getUser()
      .then(({ data, error: cause }) => {
        if (!alive) return;
        if (!isWebsiteAdmin(data.user)) {
          router.replace("/login");
          return;
        }
        if (cause) {
          setError(cause.message);
          return;
        }
        setEmail(data.user!.email!);
      })
      .catch(() => {
        if (alive)
          setError("Could not check your session. Reload to try again.");
      });
    return () => {
      alive = false;
    };
  }, [router]);
  if (!email)
    return (
      <main className={styles.loading}>
        <p role="status">{error || "Checking administrator access…"}</p>
        <Link href="/login">Sign in</Link>
      </main>
    );
  return (
    <main className={styles.workspace}>
      <header className={styles.topbar}>
        <Link href="/" className={styles.brand}>
          TOKILO <span>CONTENT WORKSPACE</span>
        </Link>
        <div>
          <span>{email}</span>
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              router.replace("/login");
            }}
          >
            <LogOut size={16} aria-hidden="true" />
            Log out
          </button>
        </div>
      </header>
      <nav className={styles.navigation} aria-label="Administration">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-current={active === href ? "page" : undefined}
          >
            <Icon size={17} aria-hidden="true" />
            {label}
          </Link>
        ))}
      </nav>
      <div className={styles.content}>
        <span className={styles.eyebrow}>
          SHARED WITH THE TOKILO MOBILE APP
        </span>
        <h1>{title}</h1>
        {children}
      </div>
    </main>
  );
}
