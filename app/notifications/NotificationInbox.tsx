"use client";
import Link from "next/link";
import { Bell, Check, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useCommunications } from "../communications/CommunicationProvider";
import { communicationError, notificationHref } from "../../lib/communications";
import styles from "../communications/communications.module.css";
export default function NotificationInbox() {
  const {
    notifications,
    notificationUnread,
    notificationError,
    loading,
    notificationsLoaded,
    live,
    refresh,
    readNotification,
  } = useCommunications();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  async function mark(id?: string) {
    setBusy(id ?? "all");
    setError("");
    try {
      await readNotification(id);
    } catch (cause) {
      setError(communicationError(cause));
    } finally {
      setBusy(null);
    }
  }
  return (
    <div className={styles.notificationPanel}>
      <div className={styles.toolbar}>
        <div>
          <strong>Recent notifications</strong>
          <p className={styles.muted}>
            {live ? "Live updates connected" : "Connecting to live updates…"}
          </p>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.secondary}
            onClick={() => void refresh()}
            aria-label="Refresh notifications"
          >
            <RefreshCw size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.secondary}
            disabled={Boolean(busy) || !notificationUnread}
            onClick={() => void mark()}
          >
            <Check size={16} aria-hidden="true" />
            Mark all read
          </button>
        </div>
      </div>
      {(notificationError || error) && (
        <p role="alert" className={styles.error}>
          {error || notificationError}
        </p>
      )}
      {loading || !notificationsLoaded ? (
        <p className={styles.empty} role="status">
          Loading notifications…
        </p>
      ) : !notificationError && notifications.length === 0 ? (
        <div className={styles.empty}>
          <Bell size={28} aria-hidden="true" />
          <h2>You’re all caught up.</h2>
          <p>New account updates will appear here.</p>
        </div>
      ) : (
        <ul className={styles.notifications}>
          {notifications.map((item) => {
            const href = notificationHref(item);
            return (
              <li key={item.id} data-unread={!item.is_read}>
                <span className={styles.notificationSymbol}>
                  <Bell size={18} aria-hidden="true" />
                </span>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                  <time dateTime={item.created_at}>
                    {new Date(item.created_at).toLocaleString("en", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </time>
                  <div className={styles.actions}>
                    {href && (
                      <Link className={styles.link} href={href}>
                        View update
                      </Link>
                    )}
                    {!item.is_read && (
                      <button
                        type="button"
                        disabled={Boolean(busy)}
                        onClick={() => void mark(item.id)}
                        className={styles.link}
                      >
                        {busy === item.id ? "Saving…" : "Mark read"}
                      </button>
                    )}
                  </div>
                </div>
                {!item.is_read && (
                  <span className={styles.unreadDot} aria-label="Unread" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
