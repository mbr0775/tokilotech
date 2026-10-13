export const CONVERSATION_FIELDS =
  "id,client_id,client_name,client_email,last_message,last_message_at,is_read_admin,is_read_client,created_at";
export const MESSAGE_FIELDS =
  "id,conversation_id,sender_id,sender_name,sender_role,content,is_read,seen_at,message_type,attachment_url,attachment_name,created_at";
export type Conversation = {
  id: string;
  client_id: string;
  client_name: string | null;
  client_email: string | null;
  last_message: string | null;
  last_message_at: string;
  is_read_admin: boolean;
  is_read_client: boolean;
  created_at: string;
};
export type ChatMessage = {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string | null;
  sender_role: "admin" | "client";
  content: string;
  is_read: boolean;
  seen_at: string | null;
  message_type: string;
  attachment_url: string | null;
  attachment_name: string | null;
  created_at: string;
};
export type AccountNotification = {
  id: string;
  title: string;
  body: string;
  type: string;
  ref_id: string | null;
  ref_table: string | null;
  created_at: string;
  is_read: boolean;
  unread_total: number;
};
export function unreadConversations(rows: Conversation[], admin: boolean) {
  return rows.filter((row) => !(admin ? row.is_read_admin : row.is_read_client))
    .length;
}
export function validConversationId(value: string | null): value is string {
  return Boolean(
    value &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      value,
    ),
  );
}
export function notificationHref(item: AccountNotification): string | null {
  if (item.ref_table === "project_showcase" && validConversationId(item.ref_id))
    return `/projects/${item.ref_id}`;
  if (item.ref_table === "conversations" && validConversationId(item.ref_id))
    return `/messages?conversation=${item.ref_id}`;
  return null;
}
export function safeAttachment(url: string | null): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" ? parsed.href : null;
  } catch {
    return null;
  }
}
export function communicationError(cause: unknown): string {
  if (
    typeof cause === "object" &&
    cause &&
    "code" in cause &&
    ["PGRST202", "42P01"].includes(String(cause.code))
  ) {
    return "Messaging setup is awaiting its database update. Please contact Tokilo or try again later.";
  }
  if (typeof cause === "object" && cause && "message" in cause)
    return String(cause.message);
  return "The request could not be completed. Please try again.";
}
export function formatMessageTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : new Intl.DateTimeFormat("en", {
        hour: "numeric",
        minute: "2-digit",
      }).format(date);
}
export function signInDestination(search: string, admin: boolean) {
  const fallback = admin ? "/admin" : "/";
  const next = new URLSearchParams(search).get("next");
  if (!next?.startsWith("/") || next.startsWith("//")) return fallback;
  try {
    const url = new URL(next, "https://tokilo.invalid");
    if (url.origin !== "https://tokilo.invalid") return fallback;
    if (url.pathname === "/notifications") return "/notifications";
    if (url.pathname === "/messages") {
      const id = url.searchParams.get("conversation");
      return validConversationId(id)
        ? `/messages?conversation=${id}`
        : "/messages";
    }
  } catch {
    /* Fall back to the verified account's usual landing page. */
  }
  return fallback;
}
