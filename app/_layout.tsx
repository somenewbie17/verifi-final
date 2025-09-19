import React, { useEffect } from 'react';
import { Stack, useRouter, usePathname } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '@/api/auth';
import { ThemeProvider } from '@/src/hooks/useTheme';
import queryClient from '@/src/lib/queryClient';
import 'react-native-url-polyfill/auto';
import Loading from '@/src/components/ui/Loading';

function RootLayoutNav() {
  const { session, profile, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const isRoleSelected = !!profile?.role;

    // A user is logged in, but their role is not set in the database.
    // This means they are a new user who needs to choose a role.
    if (session && !isRoleSelected) {
      // Don't redirect if they are already on the role selection screen
      if (pathname !== '/(auth)/role-selection') {
        router.replace('/(auth)/role-selection');
      }
      return;
    }

    const publicRoutes = ['/login', '/sign-up', '/verify-email'];
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    if (session && isPublicRoute) {
      // User is logged in and on a public auth page, send them to the correct dashboard.
      const destination = profile?.role === 'business' ? '/(tabs)/dashboard' : '/(tabs)/home';
      router.replace(destination);
    } else if (!session && !isPublicRoute) {
      // User is not logged in and not on a public page, send them to login.
      router.replace('/login');
    }
  }, [session, profile, isLoading, pathname]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false, presentation: 'modal' }} />
      <Stack.Screen name="business/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="review/[businessId]" options={{ presentation: 'modal', title: 'Leave a Review' }} />
    </Stack>
  );
}

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