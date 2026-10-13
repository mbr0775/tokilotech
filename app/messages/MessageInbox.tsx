"use client";
/* eslint-disable @next/next/no-img-element */
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  Check,
  CheckCheck,
  MessageSquare,
  Plus,
  RefreshCw,
  Send,
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { isWebsiteAdmin } from "../../lib/admin-access";
import {
  CONVERSATION_FIELDS,
  MESSAGE_FIELDS,
  communicationError,
  formatMessageTime,
  safeAttachment,
  type Conversation,
  type ChatMessage,
} from "../../lib/communications";
import { useCommunications } from "../communications/CommunicationProvider";
import styles from "../communications/communications.module.css";

type Thread = {
  owner: string;
  id: string;
  conversation: Conversation | null;
  messages: ChatMessage[];
  more: boolean;
  error: string;
};
const empty: Thread = {
  owner: "",
  id: "",
  conversation: null,
  messages: [],
  more: false,
  error: "",
};
export default function MessageInbox({
  initialConversation,
}: {
  initialConversation: string | null;
}) {
  const {
    user,
    conversations,
    conversationError,
    conversationsLoaded,
    loading,
    live,
    moreConversations,
    refresh,
    loadMoreConversations,
  } = useCommunications();
  const admin = isWebsiteAdmin(user);
  const uid = user?.id ?? "";
  const [selected, setSelected] = useState(initialConversation);
  const conversationId = selected ?? conversations[0]?.id ?? "";
  const [thread, setThread] = useState<Thread>(empty);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [starting, setStarting] = useState(false);
  const [moreBusy, setMoreBusy] = useState(false);
  const [error, setError] = useState("");
  const [receiptError, setReceiptError] = useState("");
  const [liveThread, setLiveThread] = useState("");
  const list = useRef<HTMLDivElement>(null);
  const nearBottom = useRef(true);
  const receipt = useRef("");
  const pending = useRef<{
    id: string;
    body: string;
    conversationId: string;
  } | null>(null);
  const reloadThread = useRef<(more?: boolean) => Promise<void>>(
    async () => {},
  );
  const current =
    thread.owner === uid && thread.id === conversationId ? thread : empty;
  const text = drafts[conversationId] ?? "";
  const last = current.messages.at(-1);
  const threadLoading = Boolean(
    conversationId && current.id !== conversationId,
  );

  useEffect(() => {
    if (!uid || !conversationId) return;
    let alive = true;
    let requestId = 0;
    let limit = 100;
    let connected = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    nearBottom.current = true;
    receipt.current = "";
    async function load(more = false) {
      if (more) limit += 100;
      const request = ++requestId;
      try {
        let metadata = supabase
          .from("conversations")
          .select(CONVERSATION_FIELDS)
          .eq("id", conversationId);
        if (!admin) metadata = metadata.eq("client_id", uid);
        const { data: conversation, error: lookupError } =
          await metadata.maybeSingle();
        if (lookupError) throw lookupError;
        if (!conversation) throw new Error("This conversation is unavailable.");
        const { data, error } = await supabase
          .from("messages")
          .select(MESSAGE_FIELDS)
          .eq("conversation_id", conversationId)
          .order("created_at", { ascending: false })
          .order("id", { ascending: false })
          .limit(limit);
        if (error) throw error;
        if (alive && request === requestId)
          setThread({
            owner: uid,
            id: conversationId,
            conversation: conversation as Conversation,
            messages: [...(data ?? [])].reverse() as ChatMessage[],
            more: (data?.length ?? 0) >= limit,
            error: "",
          });
      } catch (cause) {
        if (alive && request === requestId)
          setThread((old) => ({
            ...(old.owner === uid && old.id === conversationId ? old : empty),
            owner: uid,
            id: conversationId,
            error: communicationError(cause),
          }));
      }
    }
    reloadThread.current = load;
    const channel = supabase
      .channel(`web-thread:${uid}:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        () => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            if (alive) void load();
          }, 150);
        },
      )
      .subscribe((status) => {
        if (!alive) return;
        connected = status === "SUBSCRIBED";
        setLiveThread(connected ? `${uid}:${conversationId}` : "");
        if (connected) void load();
      });
    void load();
    const resume = () => {
      if (document.visibilityState === "visible") void load();
    };
    const fallback = setInterval(() => {
      if (!connected && document.visibilityState === "visible") void load();
    }, 20000);
    document.addEventListener("visibilitychange", resume);
    window.addEventListener("online", resume);
    window.addEventListener("focus", resume);
    return () => {
      alive = false;
      setLiveThread((owner) =>
        owner === `${uid}:${conversationId}` ? "" : owner,
      );
      clearTimeout(timer);
      clearInterval(fallback);
      void supabase.removeChannel(channel);
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("online", resume);
      window.removeEventListener("focus", resume);
    };
  }, [uid, conversationId, admin]);

  const markVisible = useCallback(async () => {
    if (
      !last ||
      !current.conversation ||
      current.error ||
      !nearBottom.current ||
      document.visibilityState !== "visible" ||
      !document.hasFocus()
    )
      return;
    const key = `${uid}:${conversationId}:${last.id}`;
    if (receipt.current === key) return;
    receipt.current = key;
    try {
      const { error } = await supabase.rpc("tokilo_read_conversation", {
        p_conversation_id: conversationId,
        p_last_message_id: last.id,
      });
      if (error) throw error;
      setReceiptError("");
      await refresh();
    } catch {
      receipt.current = "";
      setReceiptError("Read status could not be saved. Refresh to try again.");
    }
  }, [last, current.conversation, current.error, uid, conversationId, refresh]);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (nearBottom.current && list.current)
        list.current.scrollTop = list.current.scrollHeight;
      void markVisible();
    });
    const focus = () => void markVisible();
    window.addEventListener("focus", focus);
    document.addEventListener("visibilitychange", focus);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("focus", focus);
      document.removeEventListener("visibilitychange", focus);
    };
  }, [current.messages, markVisible]);

  async function start() {
    setStarting(true);
    setError("");
    try {
      const { data, error } = await supabase
        .rpc("tokilo_open_conversation")
        .single();
      if (error) throw error;
      setSelected((data as Conversation).id);
      await refresh();
    } catch (cause) {
      setError(communicationError(cause));
    } finally {
      setStarting(false);
    }
  }
  async function send(event: FormEvent) {
    event.preventDefault();
    const body = text.trim();
    if (
      !user ||
      !body ||
      body.length > 4000 ||
      sending ||
      !current.conversation
    )
      return;
    setSending(true);
    setError("");
    const transaction =
      pending.current?.body === body &&
      pending.current.conversationId === conversationId
        ? pending.current
        : { id: crypto.randomUUID(), body, conversationId };
    pending.current = transaction;
    try {
      const { data, error } = await supabase
        .rpc("tokilo_send_message", {
          p_conversation_id: conversationId,
          p_message_id: transaction.id,
          p_content: body,
        })
        .single();
      if (error) throw error;
      const message = data as ChatMessage;
      setThread((old) =>
        old.owner === uid && old.id === conversationId
          ? {
              ...old,
              messages: [
                ...old.messages.filter((row) => row.id !== message.id),
                message,
              ],
            }
          : old,
      );
      setDrafts((old) => ({ ...old, [conversationId]: "" }));
      pending.current = null;
      nearBottom.current = true;
      await Promise.all([reloadThread.current(), refresh()]);
    } catch (cause) {
      setError(
        `${communicationError(cause)} Your text is kept. Retry to confirm delivery; the same message will not be sent twice.`,
      );
    } finally {
      setSending(false);
    }
  }
  const allLoading = loading || !conversationsLoaded;
  return (
    <>
      <div className={styles.toolbar}>
        <p className={styles.muted}>
          {live ? "Account updates connected" : "Connecting to live updates…"}
        </p>
        <button
          type="button"
          className={styles.secondary}
          onClick={() => {
            receipt.current = "";
            void Promise.all([refresh(), reloadThread.current()]);
          }}
        >
          <RefreshCw size={15} aria-hidden="true" />
          Refresh
        </button>
      </div>
      {conversationError && (
        <p className={styles.error} role="alert">
          {conversationError}
        </p>
      )}
      <div className={styles.inbox}>
        <aside className={styles.conversations} aria-label="Conversations">
          <h2>{admin ? "Customer conversations" : "Your conversations"}</h2>
          {allLoading ? (
            <p role="status" className={styles.smallEmpty}>
              Loading conversations…
            </p>
          ) : conversations.length === 0 && !conversationError ? (
            <p className={styles.smallEmpty}>
              {admin
                ? "No customer conversations yet."
                : "Start a conversation with the Tokilo team."}
            </p>
          ) : (
            <ul>
              {conversations.map((row) => (
                <li key={row.id}>
                  <button
                    type="button"
                    disabled={sending || starting}
                    aria-pressed={conversationId === row.id}
                    onClick={() => {
                      setSelected(row.id);
                      setError("");
                      setReceiptError("");
                    }}
                  >
                    <span className={styles.avatar}>
                      <MessageSquare size={19} aria-hidden="true" />
                    </span>
                    <span className={styles.conversationText}>
                      <strong>
                        {admin
                          ? row.client_name || row.client_email || "Customer"
                          : "Tokilo team"}
                      </strong>
                      <span>{row.last_message || "No messages yet"}</span>
                    </span>
                    {!(admin ? row.is_read_admin : row.is_read_client) && (
                      <span
                        className={styles.unreadDot}
                        aria-label="Unread conversation"
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {moreConversations && (
            <button
              type="button"
              className={styles.link}
              disabled={moreBusy}
              onClick={async () => {
                setMoreBusy(true);
                try {
                  await loadMoreConversations();
                } finally {
                  setMoreBusy(false);
                }
              }}
            >
              Load more conversations
            </button>
          )}
          {!admin &&
            !allLoading &&
            !conversationError &&
            conversations.length === 0 && (
              <button
                type="button"
                className={styles.primary}
                disabled={starting}
                onClick={() => void start()}
              >
                <Plus size={16} aria-hidden="true" />
                {starting ? "Opening…" : "Start a conversation"}
              </button>
            )}
        </aside>
        <div className={styles.thread}>
          <div className={styles.threadHeader}>
            <div>
              <h2>
                {admin
                  ? current.conversation?.client_name ||
                    current.conversation?.client_email ||
                    "Customer conversation"
                  : "Tokilo team"}
              </h2>
              <p>
                {liveThread === `${uid}:${conversationId}` && conversationId
                  ? "Live messages connected"
                  : conversationId
                    ? "Connecting to live messages…"
                    : "Private support conversation"}
              </p>
            </div>
          </div>
          {threadLoading ? (
            <div className={styles.empty} role="status">
              Loading messages…
            </div>
          ) : !conversationId ? (
            <div className={styles.empty}>
              <MessageSquare size={30} aria-hidden="true" />
              <h3>{admin ? "Your customer inbox." : "How can we help?"}</h3>
              <p>
                {admin
                  ? "Select a conversation to reply."
                  : "Start a conversation to discuss your project or ask for help."}
              </p>
            </div>
          ) : (
            <div
              ref={list}
              className={styles.messageList}
              role="log"
              aria-label="Conversation messages"
              aria-live="polite"
              aria-relevant="additions"
              tabIndex={0}
              onScroll={() => {
                const node = list.current;
                if (node)
                  nearBottom.current =
                    node.scrollHeight - node.scrollTop - node.clientHeight < 60;
                if (nearBottom.current) void markVisible();
              }}
            >
              {current.more && (
                <button
                  type="button"
                  className={styles.secondary}
                  disabled={moreBusy}
                  onClick={async () => {
                    setMoreBusy(true);
                    nearBottom.current = false;
                    try {
                      await reloadThread.current(true);
                    } finally {
                      setMoreBusy(false);
                    }
                  }}
                >
                  Load earlier messages
                </button>
              )}
              {current.error && (
                <p className={styles.error} role="alert">
                  {current.error}
                </p>
              )}
              {!current.error && current.messages.length === 0 && (
                <p className={styles.smallEmpty}>
                  No messages yet. Send your first message below.
                </p>
              )}
              {current.messages.map((message) => {
                const own = message.sender_id === uid;
                const attachment = safeAttachment(message.attachment_url);
                return (
                  <div
                    key={message.id}
                    className={styles.messageRow}
                    data-own={own}
                  >
                    <div className={styles.bubble}>
                      {!own && (
                        <strong>
                          {admin
                            ? message.sender_name || "Customer"
                            : "Tokilo team"}
                        </strong>
                      )}
                      {attachment &&
                        (message.message_type === "image" ? (
                          <a href={attachment} target="_blank" rel="noreferrer">
                            <img
                              src={attachment}
                              alt={
                                message.attachment_name ||
                                "Conversation attachment"
                              }
                              loading="lazy"
                            />
                          </a>
                        ) : (
                          <a href={attachment} target="_blank" rel="noreferrer">
                            {message.attachment_name || "View attachment"}
                          </a>
                        ))}
                      <p>{message.content}</p>
                      <div className={styles.messageMeta}>
                        <time dateTime={message.created_at}>
                          {formatMessageTime(message.created_at)}
                        </time>
                        {own && (
                          <span>
                            {message.is_read ? (
                              <CheckCheck size={13} aria-hidden="true" />
                            ) : (
                              <Check size={13} aria-hidden="true" />
                            )}
                            {message.is_read ? "Read" : "Sent"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {(error || receiptError) && (
            <p className={styles.error} role="alert">
              {error || receiptError}
            </p>
          )}
          {current.conversation && !current.error && (
            <form className={styles.composer} onSubmit={send}>
              <label htmlFor="message-content" className={styles.srOnly}>
                Message to{" "}
                {admin
                  ? current.conversation.client_name || "customer"
                  : "Tokilo team"}
              </label>
              <textarea
                id="message-content"
                rows={2}
                value={text}
                maxLength={4000}
                disabled={sending}
                placeholder="Write a message…"
                onChange={(event) =>
                  setDrafts({ ...drafts, [conversationId]: event.target.value })
                }
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey &&
                    !event.nativeEvent.isComposing
                  ) {
                    event.preventDefault();
                    if (!sending && text.trim())
                      event.currentTarget.form?.requestSubmit();
                  }
                }}
              />
              <button
                type="submit"
                aria-label="Send message"
                className={styles.primary}
                disabled={sending || !text.trim()}
              >
                <Send size={17} aria-hidden="true" />
                <span>{sending ? "Sending…" : "Send"}</span>
              </button>
              <p>
                Enter to send · Shift + Enter for a new line · {text.length}
                /4000
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
