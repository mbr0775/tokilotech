import type { User } from "@supabase/supabase-js";

export const ADMIN_EMAIL = "mubassirnasar@gmail.com";

/** Navigation/UI check only. Supabase RLS remains responsible for write permissions. */
export function isWebsiteAdmin(user: Pick<User, "email"> | null | undefined) {
  return user?.email?.toLowerCase() === ADMIN_EMAIL;
}
