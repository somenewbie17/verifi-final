import db from '@/src/db/index';
import { Promo } from '@/types';

export const promosRepo = {
  async getActivePromos(): Promise<Promo[]> {
    const now = new Date().toISOString();
    const results = await db.getAllAsync<Promo>(
      'SELECT * FROM promos WHERE active = 1 AND starts_at <= ? AND ends_at >= ?',
      [now, now]
    );
    return results;
  },
};