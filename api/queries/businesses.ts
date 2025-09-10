import { useQuery } from '@tanstack/react-query';
import { businessesRepo } from '@/src/db/repositories/businesses.repo';

/**
 * A custom hook to search for businesses based on a query string.
 * It uses react-query's `useQuery` to handle fetching, caching, and state management.
 * @param query The search term entered by the user.
 * @returns The result of the query, including data, loading state, and error state.
 */
export const useSearchBusinesses = (query: string) => {
  return useQuery({
    // 1. `queryKey`: This is a unique identifier for this specific query.
    // react-query uses it for caching. When the `query` variable changes,
    // react-query knows it needs to refetch the data.
    queryKey: ['businesses', 'search', query],

    // 2. `queryFn`: This is the actual function that will be executed to get the data.
    // Here, it calls the `searchBusinesses` method from our local database repository.
    queryFn: () => businessesRepo.searchBusinesses(query),
  });
};

/**
 * A custom hook to fetch a single business by its ID.
 * @param businessId The unique ID of the business to fetch.
 * @returns The result of the query for that single business.
 */
export const useBusinessById = (businessId: string | undefined) => {
  return useQuery({
    // 1. `queryKey`: The key now includes the specific `businessId` to ensure
    // that each business's details are cached independently.
    queryKey: ['businesses', businessId],
    
    // 2. `queryFn`: This function calls the repository method to get a single business.
    // It checks if `businessId` exists before making the call.
    queryFn: () => {
      if (!businessId) {
        return null;
      }
      return businessesRepo.getBusinessById(businessId);
    },

    // 3. `enabled`: This is an important optimization. It tells react-query
    // NOT to run the query until `businessId` has a value. This prevents
    // an unnecessary fetch when the BusinessScreen first loads.
    enabled: !!businessId,
  });
};