import db from '@/src/db/index';
import { Review } from '@/types';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// Helper to safely parse the 'photos' field
function parseReview(raw: any): Review {
  try {
    return { 
      ...raw, 
      photos: JSON.parse(raw.photos || '[]'),
      rating: Number(raw.rating),
    };
  } catch (e) {
    console.error("Failed to parse review:", e);
    return { ...raw, photos: [] };
  }
}

export const reviewsRepo = {
  async getReviewsForBusiness(businessId: string): Promise<Review[]> {
    const results = await db.getAllAsync<any>(
      'SELECT * FROM reviews WHERE business_id = ? AND status = "approved" ORDER BY created_at DESC',
      [businessId]
    );
    return results.map(parseReview);
  },

  async createReview(review: Omit<Review, 'id' | 'created_at' | 'status'>): Promise<void> {
    await db.runAsync(
      'INSERT INTO reviews (id, business_id, user_id, rating, text, photos) VALUES (?, ?, ?, ?, ?, ?)',
      [
        uuidv4(),
        review.business_id,
        review.user_id,
        review.rating,
        review.text || null,
        JSON.stringify(review.photos || []),
      ]
    );
  },
};