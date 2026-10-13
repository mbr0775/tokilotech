-- Supabase may explicitly grant anon execution through default privileges.
-- Apply after the communications migration; does not alter application records.
begin;
revoke all on function public.tokilo_open_conversation(), public.tokilo_send_message(uuid, uuid, text),
  public.tokilo_read_conversation(uuid, uuid), public.tokilo_notification_feed(integer), public.tokilo_read_notifications(uuid) from public, anon;
grant execute on function public.tokilo_open_conversation(), public.tokilo_send_message(uuid, uuid, text),
  public.tokilo_read_conversation(uuid, uuid), public.tokilo_notification_feed(integer), public.tokilo_read_notifications(uuid) to authenticated;
revoke all on function public.tokilo_guard_message_insert(), public.tokilo_guard_conversation_insert(),
  public.tokilo_guard_message_update(), public.tokilo_guard_conversation_update(), public.tokilo_guard_notification_update() from public, anon, authenticated;
notify pgrst, 'reload schema';
commit;
