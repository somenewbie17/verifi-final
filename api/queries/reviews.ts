import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsRepo } from '@/api/repositories/reviews.repo';
import { Database } from '@/types/supabase';

// This is the specific type for creating a NEW review. It comes from the
// auto-generated `supabase.d.ts` file and is the correct type for inserts.
type ReviewInsert = Database['public']['Tables']['reviews']['Insert'];

/**
 * A custom hook to fetch all approved reviews for a specific business.
 * @param businessId The ID of the business whose reviews are to be fetched.
 */
export const useReviewsForBusiness = (businessId: string | undefined) => {
  return useQuery({
    queryKey: ['reviews', businessId],
    queryFn: () => {
      if (!businessId) return [];
      return reviewsRepo.getReviewsForBusiness(businessId);
    },
    enabled: !!businessId,
  });
};

/**
 * A custom hook for creating a new review.
 * It uses `useMutation` for actions that change data.
 */
export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // The mutation function now expects an object of type `ReviewInsert`.
    mutationFn: (newReview: ReviewInsert) => {
      return reviewsRepo.createReview(newReview);
    },
    // The `onSuccess` function runs after the mutation is successful.
    onSuccess: (_, variables) => {
      // This tells react-query to refetch the data for both the approved reviews
      // on the BusinessScreen and the pending reviews on the Dashboard, ensuring
      // the UI updates automatically after a new review is submitted.
      queryClient.invalidateQueries({
        queryKey: ['reviews', variables.business_id],
      });
      queryClient.invalidateQueries({
        queryKey: ['reviews', variables.business_id, 'pending'],
      });
    },
  });
};

/**
 * A custom hook to fetch pending reviews for a business.
 */
export const usePendingReviews = (businessId: string | undefined) => {
  return useQuery({
    queryKey: ['reviews', businessId, 'pending'],
    queryFn: () => {
      if (!businessId) return [];
      return reviewsRepo.getPendingReviewsForBusiness(businessId);
    },
    enabled: !!businessId,
  });
};