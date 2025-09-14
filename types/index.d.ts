import { Json } from './supabase';

export type UserRole = 'customer' | 'business_owner' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
}

// THIS IS THE MAIN FIX for the promos.ts error.
// We are making several fields optional to match the partial data
// that comes back from a nested query.
export interface Business {
  id: string;
  name: string;
  description?: string | null; // Made optional
  address: string | null;
  city: string | null;
  phone: string | null;
  whatsapp: string | null;
  email?: string | null;      // Made optional
  website?: string | null;     // Made optional
  photos: string[];
  categories: string[];
  owner_id?: string;         // Made optional
  verified: boolean;
  created_at: string;
}

export interface Review {
  id: string;
  business_id: string;
  user_id: string;
  rating: number;
  text: string | null;
  photos: string[] | null; // Corrected from 'Json | null'
  status: string;
  created_at: string;
  users: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
}

export interface Promo {
  id: string;
  title: string;
  desc: string | null;
  starts_at: string;
  ends_at: string;
  active: boolean | null;
  business_id: string | null;
  businesses: Business | null;
}

export type Category = 'Food' | 'Salons' | 'Barbers' | 'Auto' | 'Hotels' | 'Services';