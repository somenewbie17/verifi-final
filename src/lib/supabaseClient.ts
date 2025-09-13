import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase'; // Ensure this file exists and is not empty

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing. Please check your .env file.");
}

// This is now the one and only Supabase client for your entire app.
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);