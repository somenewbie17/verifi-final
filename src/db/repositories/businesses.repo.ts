import db from '@/src/db/index';
import { Business } from '@/types';

// Helper to safely parse JSON columns from the database
function parseBusiness(raw: any): Business {
  try {
    return {
      ...raw,
      categories: JSON.parse(raw.categories || '[]'),
      photos: JSON.parse(raw.photos || '[]'),
      hours: JSON.parse(raw.hours || '{}'),
      verified: Boolean(raw.verified),
    };
  } catch (error) {
    console.error('Failed to parse business data:', error);
    // Return a fallback object so the app doesn't crash
    return { ...raw, categories: [], photos: [], hours: {} };
  }
}

export const businessesRepo = {
  async getBusinessById(id: string): Promise<Business | null> {
    const result = await db.getFirstAsync<any>(
      'SELECT * FROM businesses WHERE id = ?',
      [id]
    );
    return result ? parseBusiness(result) : null;
  },

  async searchBusinesses(query: string): Promise<Business[]> {
    const searchTerm = `%${query.toLowerCase()}%`;
    const results = await db.getAllAsync<any>(
      'SELECT * FROM businesses WHERE lower(name) LIKE ? OR lower(categories) LIKE ? LIMIT 20',
      [searchTerm, searchTerm]
    );
    return results.map(parseBusiness);
  },
};