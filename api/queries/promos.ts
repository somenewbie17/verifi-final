import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/src/lib/supabaseClient';
import { Promo } from '@/types';

// Hook to fetch all active promos
export const useActivePromos = () => {
  return useQuery<Promo[]>({
    queryKey: ['promos', { active: true }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('promos')
        .select('*, businesses(*)')
        // --- FIX IS HERE ---
        // Changed the filter from .eq('status', 'active') to the correct column
        .eq('active', true) 
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};