import { supabase } from '@/src/lib/supabaseClient';
import { Review } from '@/types';
import { Database } from '@/types/supabase';

type ReviewInsert = Database['public']['Tables']['reviews']['Insert'];

export const reviewsRepo = {
  async getReviewsForBusiness(businessId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('business_id', businessId)
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error.message);
      return [];
    }
    return (data as any) || [];
  },

  async createReview(review: ReviewInsert): Promise<void> {
    const { error } = await supabase.from('reviews').insert(review);
    if (error) {
      console.error('Error creating review:', error.message);
      throw error;
    }
  },

  async getPendingReviewsForBusiness(businessId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('business_id', businessId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching pending reviews:', error.message);
      return [];
    }
    return (data as any) || [];
  },
};