"use client";

import { createClient } from "@supabase/supabase-js";
import { env, hasPublicSupabaseEnv } from "@/lib/env";

let browserClient: ReturnType<typeof createClient> | null = null;

export function createSupabaseBrowserClient() {
  if (!hasPublicSupabaseEnv) {
    return null;
  }

  if (!browserClient) {
    browserClient = createClient(env.nextPublicSupabaseUrl, env.nextPublicSupabaseAnonKey);
  }

  return browserClient;
}
