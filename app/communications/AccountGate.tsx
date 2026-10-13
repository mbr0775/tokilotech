"use client";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { useCommunications } from "./CommunicationProvider";
import styles from "./communications.module.css";
export default function AccountGate({
  destination,
  children,
}: {
  destination: "/messages" | "/notifications";
  children: React.ReactNode;
}) {
  const { user, authReady } = useCommunications();
  if (!authReady)
    return (
      <p className={styles.empty} role="status">
        Checking your account…
      </p>
    );
  if (!user)
    return (
      <div className={styles.empty}>
        <LogIn size={28} aria-hidden="true" />
        <h2>Sign in to stay connected.</h2>
        <p>
          Use your Tokilo account from the website or mobile app to access your{" "}
          {destination === "/messages" ? "conversations" : "notifications"}.
        </p>
        <Link className={styles.primary} href={`/login?next=${destination}`}>
          Sign in
        </Link>
        <Link href="/register">Create an account</Link>
      </div>
    );
  return children;
}
