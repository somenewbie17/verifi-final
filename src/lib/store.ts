import { create } from 'zustand';
import { Category } from '@/types';

// Temporarily define AuthUser here to avoid circular dependencies
// This should match the one in api/auth.tsx
interface AuthUser {
  id: string;
  email?: string;
  phone?: string;
  role: 'consumer' | 'owner' | 'admin';
}

interface AppState {
  lastSelectedCategory: Category | null;
  setLastSelectedCategory: (category: Category) => void;
  // --- Add user state management ---
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
}

/**
 * A simple global state store for ephemeral UI state.
 */
export const useAppStore = create<AppState>((set) => ({
  // The initial state
  lastSelectedCategory: null,
  user: null,
  
  // Functions to update the state
  setLastSelectedCategory: (category) => set({ lastSelectedCategory: category }),
  setUser: (user) => set({ user }),
}));