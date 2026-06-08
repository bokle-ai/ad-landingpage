import { createClient } from "@supabase/supabase-js";

/**
 * Fall back to a harmless placeholder when the env vars aren't set, so a
 * fresh deploy without configured secrets still builds/exports cleanly.
 * createClient throws on an undefined/invalid URL, which otherwise crashes
 * the Next static export. With the real NEXT_PUBLIC_ vars set at build time
 * the client works normally; without them, form writes fail gracefully and
 * are caught by the Promise.allSettled handler in the form.
 */
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "public-anon-placeholder";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
