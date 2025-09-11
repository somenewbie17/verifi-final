import { createClient } from '@supabase/supabase-js';
// This 'Database' type will be created in the next step.
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing. Please check your .env file.");
}

// This creates the official Supabase client that your app will use to
// communicate with your Supabase database. We export it so other files can use it.
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);