import assert from "node:assert/strict";
import { test } from "node:test";
import { resolveSupabaseConfig } from "../lib/supabase-config.ts";

test("shared configuration takes precedence over an older deployed project", () => {
  assert.deepEqual(resolveSupabaseConfig({
    sharedUrl: " https://shared.supabase.co ", sharedAnonKey: " shared-public-key ",
    legacyUrl: "https://old.supabase.co", legacyAnonKey: "old-public-key",
  }), { url: "https://shared.supabase.co", key: "shared-public-key" });
});

test("existing local configuration remains supported", () => {
  assert.deepEqual(resolveSupabaseConfig({
    legacyUrl: "https://shared.supabase.co", legacyAnonKey: "public-key",
  }), { url: "https://shared.supabase.co", key: "public-key" });
});

test("incomplete replacement configuration cannot mix projects or silently fall back", () => {
  const legacy = { legacyUrl: "https://old.supabase.co", legacyAnonKey: "old-public-key" };
  assert.throws(() => resolveSupabaseConfig({ ...legacy, sharedUrl: "https://shared.supabase.co" }));
  assert.throws(() => resolveSupabaseConfig({ ...legacy, sharedAnonKey: "shared-public-key" }));
  assert.throws(() => resolveSupabaseConfig({ ...legacy, sharedUrl: "https://shared.supabase.co", sharedAnonKey: " " }));
  assert.throws(() => resolveSupabaseConfig({}));
});
