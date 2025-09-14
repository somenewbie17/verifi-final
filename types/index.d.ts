// types/index.d.ts

// ... other types
import { Business } from './'; // Make sure Business type is imported if in the same file

export interface Promo {
  id: string;
  title: string;
  desc: string | null;
  starts_at: string;
  ends_at: string;
  
  // --- FIX IS HERE ---
  // Replaced 'status' with the correct 'active' property from your database
  active: boolean | null; 
  
  business_id: string | null;
  businesses: Business | null; 
}

// ... rest of the file