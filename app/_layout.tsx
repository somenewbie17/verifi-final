import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '../api/auth';
import { ThemeProvider } from '../src/hooks/useTheme';
import queryClient from '../src/lib/queryClient';
import 'react-native-url-polyfill/auto';
import Loading from '@/src/components/ui/Loading';

// This is the core component that manages navigation based on auth state
function RootLayoutNav() {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Wait until the session is loaded

    const inAuthGroup = segments[0] === '(auth)';

    if (session && inAuthGroup) {
      // If the user is signed in and on an auth screen, redirect them away
      router.replace('/(tabs)/home');
    } else if (!session) {
      // If the user is not signed in, redirect them to the login screen
      router.replace('/login');
    }
  }, [session, isLoading, segments, router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="business/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="review/[businessId]" options={{ presentation: 'modal', title: 'Leave a Review' }} />
    </Stack>
  );
}

// This is the main export that wraps the entire app in necessary providers
export default function AppLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <RootLayoutNav />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
