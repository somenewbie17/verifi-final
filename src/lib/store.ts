import { create } from 'zustand';
import { Category } from '@/types';

interface AppState {
  lastSelectedCategory: Category | null;
  setLastSelectedCategory: (category: Category) => void;
}

/**
 * A simple global state store for ephemeral UI state.
 * Components can "subscribe" to this store and automatically re-render
 * when the state they care about changes.
 */
export const useAppStore = create<AppState>((set) => ({
  // The initial state
  lastSelectedCategory: null,
  
  // A function that components can call to update the state
  setLastSelectedCategory: (category) => set({ lastSelectedCategory: category }),
}));