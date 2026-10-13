import type { Metadata } from "next";
import PublicShell from "../ui/PublicShell";
import AccountGate from "../communications/AccountGate";
import MessageInbox from "./MessageInbox";
import { validConversationId } from "../../lib/communications";
import styles from "../communications/communications.module.css";
export const metadata: Metadata = {
  title: "Messages | Tokilo Technologies",
  description: "Your private conversations with the Tokilo Technologies team.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/messages" },
};
export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ conversation?: string }>;
}) {
  const query = await searchParams;
  const id = validConversationId(query.conversation ?? null)
    ? query.conversation!
    : null;
  return (
    <PublicShell>
      <section className={styles.page}>
        <div className={styles.pageHeader}>
          <span>Your account / Messages</span>
          <h1>Let’s keep in touch.</h1>
          <p>Your conversations are shared with the Tokilo mobile app.</p>
        </div>
        <AccountGate destination="/messages">
          <MessageInbox key={id ?? "inbox"} initialConversation={id} />
        </AccountGate>
      </section>
    </PublicShell>
  );
}
