import { useQuery } from '@tanstack/react-query';
import { businessesRepo } from '@/api/repositories/businesses.repo';

export const useSearchBusinesses = (query: string) => {
  return useQuery({
    queryKey: ['businesses', 'search', query],
    queryFn: () => businessesRepo.searchBusinesses(query),
  });
};

export const useBusinessById = (businessId: string | undefined) => {
  return useQuery({
    queryKey: ['businesses', businessId],
    queryFn: () => {
      if (!businessId) {
        return null;
      }
      return businessesRepo.getBusinessById(businessId);
    },
    enabled: !!businessId,
  });
};

// --- ADD THIS NEW HOOK ---
// A simple hook to get all businesses, which we'll use for the map.
export const useAllBusinesses = () => {
  return useQuery({
    queryKey: ['businesses', 'all'],
    queryFn: () => businessesRepo.getAllBusinesses(),
  });
};