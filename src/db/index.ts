import { openDatabaseSync, SQLiteRunResult } from 'expo-sqlite';
import { Platform } from 'react-native';
import { Business } from '@/types';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// This interface is a blueprint for our database object, fixing the type errors.
interface AppDatabase {
  execAsync: (source: string, ...params: any[]) => Promise<any>;
  getFirstAsync: <T>(source: string, ...params: any[]) => Promise<T | null>;
  getAllAsync: <T>(source: string, ...params: any[]) => Promise<T[]>;
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
    id TEXT PRIMARY KEY NOT NULL, business_id TEXT NOT NULL, title TEXT NOT NULL, desc TEXT, starts_at TEXT NOT NULL, ends_at TEXT NOT NULL, active BOOLEAN DEFAULT 1, FOREIGN KEY (business_id) REFERENCES businesses (id) ON DELETE CASCADE
);
`;

function getDb(): AppDatabase {
  if (Platform.OS === 'web') {
    // Return a mock object that matches our interface for web compatibility
    return {
      execAsync: async () => Promise.resolve(undefined),
      getFirstAsync: async () => Promise.resolve(null),
      getAllAsync: async () => Promise.resolve([]),
      runAsync: async () => Promise.resolve({ lastInsertRowId: 0, changes: 0 }),
    };
  }
  // Wrap the native DB to match AppDatabase interface
  const nativeDb = openDatabaseSync('verifi.db');
  return {
    execAsync: nativeDb.execAsync.bind(nativeDb),
    getFirstAsync: nativeDb.getFirstAsync.bind(nativeDb),
    getAllAsync: nativeDb.getAllAsync.bind(nativeDb),
    runAsync: nativeDb.runAsync.bind(nativeDb),
  };
}

const db: AppDatabase = getDb();
export default db;

async function seedDatabase() {
  try {
    const result = await db.getFirstAsync<{ count: number }>(
      'SELECT count(*) as count FROM businesses'
    );
    if (result && result.count === 0) {
      console.log('Seeding database with sample data...');
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
        photos: [
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670&auto=format&fit=crop',
        ],
        verified: true,
      };
      await db.runAsync(
        'INSERT INTO businesses (id, name, categories, phone, whatsapp, address, city, lat, lng, hours, price_band, photos, verified) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        uuidv4(),
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