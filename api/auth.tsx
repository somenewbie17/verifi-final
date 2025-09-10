import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { createClient } from '@supabase/supabase-js';
import { User, UserRole } from '@/types';
import { useAppStore } from '@/src/lib/store';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Supabase URL or Anon Key is missing. Please check your .env file.'
  );
}

interface AuthContextType {
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  signUp: (email: string, password: string, role: UserRole) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const { setUser } = useAppStore();

  const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user;
      const appUser: User | null = currentUser
        ? {
            id: currentUser.id,
            email: currentUser.email,
            phone: currentUser.phone ?? undefined,
            role: (currentUser.user_metadata?.role ||
              'consumer') as User['role'],
          }
        : null;
      setUser(appUser);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const value = {
    login: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (data.user) {
        const appUser: User = {
          id: data.user.id,
          email: data.user.email,
          phone: data.user.phone,
          role: (data.user.user_metadata?.role || 'consumer') as User['role'],
        };
        setUser(appUser);
      }
      return { data, error };
    },
    logout: async () => {
      await supabase.auth.signOut();
      setUser(null);
    },
    signUp: (email: string, password: string, role: UserRole) => {
      return supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role,
          },
        },
      });
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};