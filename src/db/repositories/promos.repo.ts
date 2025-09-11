import { supabase } from '@/src/lib/supabaseClient';
import { Promo } from '@/types';

export const promosRepo = {
  /**
   * Fetches active promos and joins them with their business name from Supabase.
   */
  async getActivePromos(): Promise<Promo[]> {
    const now = new Date().toISOString();

    // 1. This is now a Supabase query.
    const { data, error } = await supabase
      .from('promos')
      // 2. `select` is the key part. `*` gets all columns from the `promos` table.
      // `businesses ( name )` tells Supabase to also fetch the `name`
      // from the related business for each promo.
      .select('*, businesses ( name )')
      .eq('active', true)
      .lte('starts_at', now) // lte = Less Than or Equal To
      .gte('ends_at', now);  // gte = Greater Than or Equal To

    if (error) {
      console.error('Error fetching active promos:', error);
      return [];
    }

    return data || [];
  },
};