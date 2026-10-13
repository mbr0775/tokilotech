"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, MessageSquare } from "lucide-react";
import { useCommunications } from "./CommunicationProvider";
import styles from "./communications.module.css";
export default function AccountIcons() {
  const { messageUnread, notificationUnread } = useCommunications();
  const path = usePathname();
  return (
    <>
      {[
        {
          href: "/messages",
          label: "Messages",
          count: messageUnread,
          noun: "unread conversations",
          icon: MessageSquare,
        },
        {
          href: "/notifications",
          label: "Notifications",
          count: notificationUnread,
          noun: "unread notifications",
          icon: Bell,
        },
      ].map(({ href, label, count, noun, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={styles.iconButton}
          aria-current={path === href ? "page" : undefined}
          title={label}
          aria-label={`${label}${count ? `, ${count} ${noun}` : ""}`}
        >
          <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
          {count !== null && count > 0 && (
            <span className={styles.badge} aria-hidden="true">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </Link>
      ))}
    </>
  );
}
