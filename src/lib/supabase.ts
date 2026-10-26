import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Whether Supabase credentials are properly configured.
 * When false, all Supabase calls are no-ops and the app runs in "unconfigured" mode.
 */
export const isSupabaseConfigured =
  typeof supabaseUrl === 'string' &&
  supabaseUrl.length > 0 &&
  supabaseUrl.startsWith('https://') &&
  supabaseUrl.includes('.supabase.co') &&
  typeof supabaseAnonKey === 'string' &&
  supabaseAnonKey.length > 20; // real anon keys are JWTs — much longer than a placeholder

let _supabase: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  try {
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.error('[Supabase] createClient failed:', err);
    _supabase = null;
  }
} else {
  console.warn(
    '[Supabase] Not configured — running in demo mode.\n' +
    'Copy .env.example → .env.local and fill in your Supabase credentials.'
  );
}

export { _supabase as supabase };
