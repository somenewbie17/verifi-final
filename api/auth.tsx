import { supabase } from '@/src/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Define the full shape of the context, including the login function
type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
  // --- FIX IS HERE ---
  // Add string types to the function definition
  login: (email: string, password: string) => Promise<any>; 
};

// Create the context with a default login function
const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
  login: async () => {}, // Default empty function
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setIsLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Define the login function
  // --- FIX IS HERE ---
  // Add string types to the function parameters
  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    // Note: The onAuthStateChange listener will handle setting the session
    return { error };
  };

  // Provide the login function in the context value
  const value = {
    session,
    isLoading,
    login,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};