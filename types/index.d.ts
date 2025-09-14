import { Json } from './supabase';

// Exported UserRole type
export type UserRole = 'customer' | 'business_owner' | 'admin';

// Exported User interface
export interface User {
  id: string;
  email: string;
  role: UserRole;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
}

// Exported Business interface
export interface Business {
  id: string;
  name: string;
  description: string | null;
  address: string | null;
  city: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  website: string | null;
  photos: string[];
  categories: string[];
  owner_id: string;
  verified: boolean;
  created_at: string;
}

// Exported Review interface with corrected 'photos' type
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

// Exported Promo interface with corrected 'active' property
export interface Promo {
  id: string;
  title: string;
  desc: string | null;
  starts_at: string;
  ends_at: string;
  active: boolean | null; // Corrected from 'status'
  business_id: string | null;
  businesses: Business | null;
}

// Exported Category type
export type Category = 'Food' | 'Salons' | 'Barbers' | 'Auto' | 'Hotels' | 'Services';