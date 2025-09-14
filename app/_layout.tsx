import 'react-native-url-polyfill/auto';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/src/hooks/useTheme';
import queryClient from '@/src/lib/queryClient';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/api/auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ThemeProvider>
              <StatusBar style="auto" />
              <Stack>
                {/* Main app screens */}
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="business/[id]" options={{ title: 'Business Profile' }} />
                <Stack.Screen name="review/[businessId]" options={{ title: 'Leave a Review', presentation: 'modal' }} />
                
                {/* Standalone screens */}
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="dashboard" options={{ title: 'Dashboard' }} />
                <Stack.Screen name="pricing" options={{ title: 'Pricing', presentation: 'modal' }} />

                {/* Authentication flow screens */}
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              </Stack>
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}