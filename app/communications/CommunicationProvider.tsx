"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabaseClient";
import { isWebsiteAdmin } from "../../lib/admin-access";
import {
  CONVERSATION_FIELDS,
  communicationError,
  type Conversation,
  type AccountNotification,
} from "../../lib/communications";

type AccountData = {
  owner: string;
  conversations: Conversation[];
  notifications: AccountNotification[];
  messageUnread: number | null;
  notificationUnread: number | null;
  conversationError: string;
  notificationError: string;
  moreConversations: boolean;
  conversationsLoaded: boolean;
  notificationsLoaded: boolean;
};
const empty: AccountData = {
  owner: "",
  conversations: [],
  notifications: [],
  messageUnread: null,
  notificationUnread: null,
  conversationError: "",
  notificationError: "",
  moreConversations: false,
  conversationsLoaded: false,
  notificationsLoaded: false,
};
type AccountContext = AccountData & {
  user: User | null;
  authReady: boolean;
  loading: boolean;
  live: boolean;
  refresh: () => Promise<void>;
  loadMoreConversations: () => Promise<void>;
  readNotification: (id?: string) => Promise<void>;
};
const Context = createContext<AccountContext | null>(null);

export function useCommunications() {
  const value = useContext(Context);
  if (!value) throw new Error("CommunicationProvider is missing.");
  return value;
}
export default function CommunicationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [data, setData] = useState(empty);
  const [liveOwner, setLiveOwner] = useState("");
  const actions = useRef<{
    refresh: () => Promise<void>;
    more: () => Promise<void>;
    read: (id?: string) => Promise<void>;
  }>({
    refresh: async () => {},
    more: async () => {},
    read: async () => {},
  });
  const uid = user?.id ?? "";
  const admin = isWebsiteAdmin(user);

  useEffect(() => {
    let alive = true;
    let generation = 0;
    async function verify() {
      const request = ++generation;
      try {
        const { data } = await supabase.auth.getUser();
        if (alive && request === generation) {
          setUser(data.user);
          setAuthReady(true);
        }
      } catch {
        if (alive && request === generation) {
          setUser(null);
          setAuthReady(true);
        }
      }
    }
    void verify();
    const restoreAuth = () => {
      if (alive) void verify();
    };
    window.addEventListener("online", restoreAuth);
    window.addEventListener("focus", restoreAuth);
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        generation++;
        setUser(null);
        setAuthReady(true);
      } else
        queueMicrotask(() => {
          if (alive) void verify();
        });
    });
    return () => {
      alive = false;
      generation++;
      listener.subscription.unsubscribe();
      window.removeEventListener("online", restoreAuth);
      window.removeEventListener("focus", restoreAuth);
    };
  }, []);

  useEffect(() => {
    if (!uid) {
      actions.current = {
        refresh: async () => {},
        more: async () => {},
        read: async () => {},
      };
      return;
    }
    let alive = true;
    let conversationRequest = 0;
    let notificationRequest = 0;
    let limit = 100;
    let subscribed = false;
    let debounce: ReturnType<typeof setTimeout> | undefined;
    async function loadConversations() {
      const request = ++conversationRequest;
      let query = supabase
        .from("conversations")
        .select(CONVERSATION_FIELDS)
        .order("last_message_at", { ascending: false })
        .order("id", { ascending: false })
        .limit(limit);
      let counts = supabase
        .from("conversations")
        .select("id", { head: true, count: "exact" })
        .eq(admin ? "is_read_admin" : "is_read_client", false);
      if (!admin) {
        query = query.eq("client_id", uid);
        counts = counts.eq("client_id", uid);
      }
      try {
        const [list, count] = await Promise.all([query, counts]);
        if (list.error) throw list.error;
        if (count.error) throw count.error;
        if (alive && request === conversationRequest)
          setData((old) => ({
            ...(old.owner === uid ? old : empty),
            owner: uid,
            conversations: (list.data ?? []) as Conversation[],
            messageUnread: count.count,
            conversationError: "",
            conversationsLoaded: true,
            moreConversations: (list.data?.length ?? 0) >= limit,
          }));
      } catch (error) {
        if (alive && request === conversationRequest)
          setData((old) => ({
            ...(old.owner === uid ? old : empty),
            owner: uid,
            conversationError: communicationError(error),
            conversationsLoaded: true,
            messageUnread: null,
          }));
      }
    }
    async function loadNotifications() {
      const request = ++notificationRequest;
      try {
        const { data, error } = await supabase.rpc("tokilo_notification_feed", {
          p_limit: 50,
        });
        if (error) throw error;
        const rows = (data ?? []) as AccountNotification[];
        if (alive && request === notificationRequest)
          setData((old) => ({
            ...(old.owner === uid ? old : empty),
            owner: uid,
            notifications: rows,
            notificationUnread: Number(rows[0]?.unread_total ?? 0),
            notificationError: "",
            notificationsLoaded: true,
          }));
      } catch (error) {
        if (alive && request === notificationRequest)
          setData((old) => ({
            ...(old.owner === uid ? old : empty),
            owner: uid,
            notificationError: communicationError(error),
            notificationsLoaded: true,
            notificationUnread: null,
          }));
      }
    }
    async function refresh() {
      await Promise.all([loadConversations(), loadNotifications()]);
    }
    function schedule() {
      clearTimeout(debounce);
      setLiveOwner((owner) => (owner === uid ? "" : owner));
      debounce = setTimeout(() => {
        if (alive) void refresh();
      }, 180);
    }
    actions.current = {
      refresh,
      more: async () => {
        limit += 100;
        await loadConversations();
      },
      read: async (id) => {
        const { error } = await supabase.rpc("tokilo_read_notifications", {
          p_notification_id: id ?? null,
        });
        if (error) throw error;
        if (alive) await loadNotifications();
      },
    };
    const channel = supabase
      .channel(`web-account:${uid}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
          ...(admin ? {} : { filter: `client_id=eq.${uid}` }),
        },
        schedule,
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications" },
        schedule,
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notification_reads",
          filter: `user_id=eq.${uid}`,
        },
        schedule,
      )
      .subscribe((status) => {
        if (!alive) return;
        subscribed = status === "SUBSCRIBED";
        setLiveOwner(subscribed ? uid : "");
        if (subscribed) void refresh();
      });
    void refresh();
    const resume = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    const fallback = setInterval(() => {
      if (!subscribed && document.visibilityState === "visible") void refresh();
    }, 20000);
    window.addEventListener("online", resume);
    window.addEventListener("focus", resume);
    document.addEventListener("visibilitychange", resume);
    return () => {
      alive = false;
      clearTimeout(debounce);
      clearInterval(fallback);
      void supabase.removeChannel(channel);
      window.removeEventListener("online", resume);
      window.removeEventListener("focus", resume);
      document.removeEventListener("visibilitychange", resume);
    };
  }, [uid, admin]);

  const refresh = useCallback(() => actions.current.refresh(), []);
  const loadMoreConversations = useCallback(() => actions.current.more(), []);
  const readNotification = useCallback(
    (id?: string) => actions.current.read(id),
    [],
  );
  const visible = data.owner === uid && uid ? data : empty;
  return (
    <Context.Provider
      value={{
        ...visible,
        user,
        authReady,
        loading: Boolean(uid && data.owner !== uid),
        live: Boolean(uid && liveOwner === uid),
        refresh,
        loadMoreConversations,
        readNotification,
      }}
    >
      {children}
    </Context.Provider>
  );
}
