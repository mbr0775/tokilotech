import { createClient } from "@supabase/supabase-js";
import { resolveSupabaseConfig } from "./supabase-config";

const { url, key } = resolveSupabaseConfig({
  sharedUrl: process.env.NEXT_PUBLIC_TOKILO_SUPABASE_URL,
  sharedAnonKey: process.env.NEXT_PUBLIC_TOKILO_SUPABASE_ANON_KEY,
  legacyUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  legacyAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});

export const supabase = createClient(url, key);
