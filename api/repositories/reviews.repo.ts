import { supabase } from '@/src/lib/supabaseClient';
import { storageRepo } from './storage.repo';
import { Review } from '@/types';

export const reviewsRepo = {
  async createReview(newReview: {
    business_id: string;
    user_id: string;
    rating: number;
    text: string;
    photoUri?: string;
  }) {
    try {
      let photoUrl: string | null = null;
      if (newReview.photoUri) {
        photoUrl = await storageRepo.uploadReviewImage(
          newReview.photoUri,
          newReview.user_id
        );
      }

      const reviewData = {
        business_id: newReview.business_id,
        user_id: newReview.user_id,
        rating: newReview.rating,
        text: newReview.text,
        photos: photoUrl ? [photoUrl] : null,
      };

      const { error } = await supabase.from('reviews').insert([reviewData]);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },

  async getReviewsForBusiness(businessId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('business_id', businessId)
      .eq('status', 'approved');

    if (error) {
      throw error;
    }

    // We cast the data to the Review[] type, which fixes the error.
    return (data as Review[]) || [];
  },

  async getPendingReviewsForBusiness(businessId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('business_id', businessId)
      .eq('status', 'pending');

    if (error) {
      throw error;
    }

    // We do the same cast here.
    return (data as Review[]) || [];
  },
};