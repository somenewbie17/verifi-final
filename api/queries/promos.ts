import { useQuery } from '@tanstack/react-query';
import { promosRepo } from '@/src/db/repositories/promos.repo';

/**
 * A custom hook to fetch all active promotions.
 */
export const useActivePromos = () => {
  return useQuery({
    // The key is simple since we are always fetching the same list.
    queryKey: ['promos', 'active'],
    // The query function calls our repository to get the data.
    queryFn: () => promosRepo.getActivePromos(),
  });
};