import type { Metadata } from "next";
import PublicShell from "../ui/PublicShell";
import AccountGate from "../communications/AccountGate";
import NotificationInbox from "./NotificationInbox";
import styles from "../communications/communications.module.css";
export const metadata: Metadata = {
  title: "Notifications | Tokilo Technologies",
  description: "Updates and notifications for your Tokilo account.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/notifications" },
};
export default function NotificationsPage() {
  return (
    <PublicShell>
      <section className={styles.page}>
        <div className={styles.pageHeader}>
          <span>Your account / Notifications</span>
          <h1>Your latest updates.</h1>
          <p>Account updates and announcements from Tokilo.</p>
        </div>
        <AccountGate destination="/notifications">
          <NotificationInbox />
        </AccountGate>
      </section>
    </PublicShell>
  );
}
