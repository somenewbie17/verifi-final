declare module '*.png';
declare module '*.jpg';

export type Category = 'Food' | 'Salons' | 'Barbers' | 'Auto' | 'Hotels' | 'Services';
export type PriceBand = '$' | '$$' | '$$$' | '$$$$';
export type UserRole = 'consumer' | 'owner' | 'admin';
export type ReviewStatus = 'pending' | 'approved' | 'rejected';
export type ClaimStatus = 'pending' | 'verified' | 'rejected';
export type ClaimMethod = 'phone' | 'document';

export interface Business {
  id: string;
  name: string;
  categories: Category[];
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  hours: Record<string, string>; // e.g., { "Monday": "9:00 AM - 5:00 PM" }
  price_band: PriceBand;
  photos: string[]; // URLs
  verified: boolean;
  created_at: string;
}

export interface Review {
  id: string;
  business_id: string;
  user_id: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text?: string;
  photos: string[]; // URLs
  status: ReviewStatus;
  created_at: string;
}

export interface Promo {
  id: string;
  business_id: string;
  title: string;
  desc: string;
  starts_at: string;
  ends_at: string;
  active: boolean;
  // Add this line to include the nested business object
  businesses: { name: string } | null;
}

export interface User {
  id: string;
  email?: string;
  phone?: string;
  role: UserRole;
  full_name?: string;
}

export interface Claim {
  id: string;
  business_id: string;
  user_id: string;
  method: ClaimMethod;
  status: ClaimStatus;
  evidence_url?: string;
}

export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };