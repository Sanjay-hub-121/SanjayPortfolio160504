import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';

type AuthContextType = {
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  isAdmin: false,
  loading: true,
  signIn: async () => ({ error: null }),
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    // Try sign in first, if user doesn't exist (for first time setup) try sign up
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      // If user not found, auto-register the admin account on first use
      if (signInError.message.toLowerCase().includes('invalid') || signInError.message.toLowerCase().includes('not found')) {
        const { error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) {
          return { error: signUpError.message };
        }
        // Sign in after signup
        const { error: finalSignInError } = await supabase.auth.signInWithPassword({ email, password });
        if (finalSignInError) return { error: finalSignInError.message };
        return { error: null };
      }
      return { error: signInError.message };
    }
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, isAdmin: !!session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
