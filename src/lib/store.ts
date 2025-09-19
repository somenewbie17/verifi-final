import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

// Define the shape of our state, now including the user's role
export interface AppState {
  user: User | null;
  role: 'customer' | 'business' | null; // The user can be one of these roles or null initially
  setUser: (user: User | null) => void;
  setRole: (role: 'customer' | 'business' | null) => void; // A function to update the role
}

// Create the store with the new properties
export const useAppStore = create<AppState>((set) => ({
  user: null,
  role: null, // Start with a null role
  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }), // Implement the setRole function
}));