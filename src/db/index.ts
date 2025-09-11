import { openDatabaseSync, SQLiteRunResult } from 'expo-sqlite';
import { Platform } from 'react-native';
import { Business } from '@/types';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// 1. This interface is the blueprint for our database object.
// The fix is changing `...params: any[]` to `params: any[]` for the `get` functions.
// This tells TypeScript that these functions expect a single array for their parameters.
interface AppDatabase {
  execAsync: (source: string) => Promise<any>;
  getFirstAsync: <T>(source: string, params: any[]) => Promise<T | null>;
  getAllAsync: <T>(source: string, params: any[]) => Promise<T[]>;
  runAsync: (source: string, ...params: any[]) => Promise<SQLiteRunResult>;
}

const SCHEMA_SQL = `
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS businesses (
    id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, categories TEXT, phone TEXT, whatsapp TEXT NOT NULL, address TEXT, city TEXT NOT NULL, lat REAL, lng REAL, hours TEXT, price_band TEXT, photos TEXT, verified BOOLEAN DEFAULT 0, created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY NOT NULL, business_id TEXT NOT NULL, user_id TEXT NOT NULL, rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5), text TEXT, photos TEXT, status TEXT DEFAULT 'pending', created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')), FOREIGN KEY (business_id) REFERENCES businesses (id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS promos (
    id TEXT PRIMARY KEY NOT NULL, business_id TEXT NOT NULL, title TEXT NOT NULL, "desc" TEXT, starts_at TEXT NOT NULL, ends_at TEXT NOT NULL, active BOOLEAN DEFAULT 1, FOREIGN KEY (business_id) REFERENCES businesses (id) ON DELETE CASCADE
);
`;

function getDb(): AppDatabase {
  if (Platform.OS === 'web') {
    return {
      execAsync: async () => Promise.resolve(undefined),
      getFirstAsync: async () => Promise.resolve(null),
      getAllAsync: async () => Promise.resolve([]),
      runAsync: async () => Promise.resolve({ lastInsertRowId: 0, changes: 0 }),
    };
  }

  const nativeDb = openDatabaseSync('verifi.db');

  // 2. This part implements the interface.
  // We've updated it to match the corrected definitions above.
  return {
    execAsync: (source: string) => nativeDb.execAsync(source),
    getFirstAsync: <T>(source: string, params: any[]) => nativeDb.getFirstAsync<T>(source, params),
    getAllAsync: <T>(source: string, params: any[]) => nativeDb.getAllAsync<T>(source, params),
    runAsync: (source: string, ...params: any[]) => nativeDb.runAsync(source, ...params),
  };
}

const db: AppDatabase = getDb();
export default db;

const sampleBusinessId = 'd8f8f8f8-8f8f-8f8f-8f8f-8f8f8f8f8f8f';

async function seedDatabase() {
  try {
    // 3. We also update the calls here to pass an empty array `[]`
    // for queries that don't have any parameters.
    const businessCount = await db.getFirstAsync<{ count: number }>(
      'SELECT count(*) as count FROM businesses', []
    );

    if (businessCount && businessCount.count === 0) {
      console.log('Seeding database with sample business...');
      // ... (seeding logic remains the same)
      const sampleBusiness: Omit<Business, 'id' | 'created_at'> = {
        name: "German's Restaurant",
        categories: ['Food'],
        phone: '592-225-3792',
        whatsapp: '5926001234',
        address: '8 New Market St, Georgetown',
        city: 'Georgetown',
        lat: 6.8075,
        lng: -58.1633,
        hours: { 'Mon-Sat': '8:00 AM - 9:00 PM' },
        price_band: '$$',
        photos: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670&auto=format&fit=crop'],
        verified: true,
      };
      await db.runAsync(
        'INSERT INTO businesses (id, name, categories, phone, whatsapp, address, city, lat, lng, hours, price_band, photos, verified) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        sampleBusinessId,
        sampleBusiness.name,
        JSON.stringify(sampleBusiness.categories),
        sampleBusiness.phone,
        sampleBusiness.whatsapp,
        sampleBusiness.address,
        sampleBusiness.city,
        sampleBusiness.lat,
        sampleBusiness.lng,
        JSON.stringify(sampleBusiness.hours),
        sampleBusiness.price_band,
        JSON.stringify(sampleBusiness.photos),
        sampleBusiness.verified ? 1 : 0
      );
    }

    const promoCount = await db.getFirstAsync<{ count: number }>(
      'SELECT count(*) as count FROM promos', []
    );
    
    if (promoCount && promoCount.count === 0) {
      console.log('Seeding database with sample promo...');
      await db.runAsync(
        'INSERT INTO promos (id, business_id, title, "desc", starts_at, ends_at, active) VALUES (?, ?, ?, ?, ?, ?, ?)',
        uuidv4(),
        sampleBusinessId,
        '25% Off All Soups',
        'Enjoy a hearty discount on our world-famous soups.',
        new Date().toISOString(),
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        1
      );
    }
  } catch (error) {
    console.error('Seeding error:', error);
  }
}

export async function initDatabase() {
  try {
    await db.execAsync(SCHEMA_SQL);
    console.log('Database initialized successfully.');
    await seedDatabase();
  } catch (error) {
    console.error('DB Init Error:', error);
  }
}