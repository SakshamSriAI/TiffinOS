import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const forceMock = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const isSupabaseConfigured = () => {
  return (
    !forceMock &&
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    supabaseUrl !== 'https://your-project-id.supabase.co' &&
    !supabaseUrl.includes('your-project')
  );
};

// Safe client instance
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

/**
 * Test connectivity to live Supabase backend.
 * Returns { success: boolean, message: string, latencyMs?: number }
 */
export const testSupabaseConnection = async () => {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      isConfigured: false,
      message: 'Running in Local Reactive Mode. Supabase environment variables not configured.',
    };
  }

  const startTime = performance.now();
  try {
    const { data, error } = await supabase
      .from('business_settings')
      .select('business_name')
      .limit(1);

    const latencyMs = Math.round(performance.now() - startTime);

    if (error) {
      return {
        success: false,
        isConfigured: true,
        message: `Connection error: ${error.message}`,
        latencyMs,
      };
    }

    return {
      success: true,
      isConfigured: true,
      message: 'Successfully connected to Supabase PostgreSQL database.',
      latencyMs,
    };
  } catch (err) {
    return {
      success: false,
      isConfigured: true,
      message: `Failed to reach Supabase: ${err.message}`,
    };
  }
};
