import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider } from '@/src/hooks/useTheme'; // Corrected
import { AuthProvider } from '@/api/auth';
import queryClient from '@/src/lib/queryClient'; // Corrected
import RootNavigator from '@/src/navigation/RootNavigator'; // Corrected

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ThemeProvider>
              <>
                <RootNavigator />
                <StatusBar style="auto" />
              </>
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}