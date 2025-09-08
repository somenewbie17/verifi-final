import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { User } from '@/types';

// Get the Supabase credentials from our private .env file
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// A check to make sure our keys are loaded correctly.
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Please check your .env file.");
}

// Define the shape of our simplified user object for the app
interface AuthUser {
  id: string;
  email?: string;
  phone?: string;
  role: User['role'];
}

// Define the shape of the "context" that will be available to all components
interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
}

// Create the React Context object. Think of this as the "power outlet".
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * This is the AuthProvider component. It's the "power station" that will wrap
 * our entire app, providing authentication data to every component inside it.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Initialize the Supabase client once
  const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

  // This useEffect hook runs once when the app starts
  useEffect(() => {
    // onAuthStateChange is a listener. It tells us whenever a user logs in or logs out.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser = session?.user;
        
        // If a user is logged in, we create our own simplified user object.
        // We get the 'role' from the user's metadata, defaulting to 'consumer'.
        setUser(currentUser ? { 
            id: currentUser.id, 
            email: currentUser.email, 
            phone: currentUser.phone,
            role: (currentUser.user_metadata?.role || 'consumer') as User['role']
        } : null);
        
        setLoading(false);
      }
    );

    // This is a cleanup function. When the component unmounts, we unsubscribe
    // from the listener to prevent memory leaks.
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // This is the value that will be provided to all child components
  const value = {
    user,
    loading,
    login: (email: string, password: string) => supabase.auth.signInWithPassword({ email, password }),
    logout: () => supabase.auth.signOut(),
  };

  return (
    <AuthContext.Provider value={value}>
      {/* We wait until the initial loading is false before rendering the app */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

/**
 * This is the custom 'useAuth' hook. It's the "plug" that any component
 * can use to easily access the user's data and the login/logout functions.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};