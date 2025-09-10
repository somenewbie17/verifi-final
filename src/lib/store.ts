import { create } from 'zustand';
import { Category, User } from '@/types'; // Import User type

interface AppState {
  lastSelectedCategory: Category | null;
  setLastSelectedCategory: (category: Category) => void;
  // --- Use the imported User type ---
  user: User | null;
  setUser: (user: User | null) => void;
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