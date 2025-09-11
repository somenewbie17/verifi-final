import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsRepo } from '@/src/db/repositories/reviews.repo';
import { Review } from '@/types';

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
    enabled: !!businessId, // Only run the query if businessId is available.
  });
};

/**
 * A custom hook for creating a new review.
 * It uses `useMutation` for actions that change data.
 */
export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newReview: Omit<Review, 'id' | 'created_at' | 'status'>) => {
      return reviewsRepo.createReview(newReview);
    },
    onSuccess: (_, variables) => {
      // After a review is successfully created, we tell react-query to
      // invalidate the cache for that business's reviews. This automatically
      // triggers a refetch on the BusinessScreen, showing the new review
      // (once it's approved).
      queryClient.invalidateQueries({
        queryKey: ['reviews', variables.business_id],
      });
    },
  });
};