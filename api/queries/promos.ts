// api/queries/promos.ts

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/src/lib/supabaseClient';
import { Promo } from '@/types';

export const useActivePromos = () => {
  return useQuery<Promo[]>({
    queryKey: ['promos', { active: true }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('promos')
        .select('*, businesses(*)')
        // Corrected to query the 'active' column
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      // Cast Supabase's returned shape to Promo[] to satisfy react-query's expected QueryFunction return type.
      return data as unknown as Promo[];
    },
  });
};