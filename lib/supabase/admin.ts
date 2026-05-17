import { createClient } from "@supabase/supabase-js";
import { env, hasSupabaseEnv } from "@/lib/env";

export function createSupabaseAdminClient() {
  if (!hasSupabaseEnv) {
    return null;
  }

  return createClient(env.nextPublicSupabaseUrl, env.supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
