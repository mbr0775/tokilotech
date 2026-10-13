type SupabaseEnvironment = {
  sharedUrl?: string;
  sharedAnonKey?: string;
  legacyUrl?: string;
  legacyAnonKey?: string;
};

// Choose a complete pair so a legacy key can never accompany the shared URL.
export function resolveSupabaseConfig(environment: SupabaseEnvironment) {
  const hasSharedConfig = Boolean(environment.sharedUrl || environment.sharedAnonKey);
  const url = (hasSharedConfig ? environment.sharedUrl : environment.legacyUrl)?.trim();
  const key = (hasSharedConfig ? environment.sharedAnonKey : environment.legacyAnonKey)?.trim();
  if (!url || !key) {
    throw new Error(
      hasSharedConfig
        ? "Set both NEXT_PUBLIC_TOKILO_SUPABASE_URL and NEXT_PUBLIC_TOKILO_SUPABASE_ANON_KEY, then rebuild."
        : "Missing Supabase environment variables.",
    );
  }
  return { url, key };
}
