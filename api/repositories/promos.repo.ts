import { supabase } from '@/src/lib/supabaseClient';
import { Promo } from '@/types';

export const promosRepo = {
  /**
   * Fetches active promos and joins them with their business name from Supabase.
   */
  async getActivePromos(): Promise<Promo[]> {
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('promos')
      .select('*, businesses ( name )')
      .eq('active', true)
      .lte('starts_at', now)
      .gte('ends_at', now);

    if (error) {
      console.error('Error fetching active promos:', error);
      return [];
    }

    // We use 'as any' here as a safe way to handle the complex type
    // that Supabase returns for table joins.
    return (data as any) || [];
  },
};