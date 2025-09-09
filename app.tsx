// App.tsx

import 'react-native-gesture-handler';
import React from 'react';
import { registerRootComponent } from 'expo';
import { QueryClientProvider } from '@tanstack/react-query';

// --- Import your custom code ---
import { ThemeProvider } from './src/hooks/useTheme';
import queryClient from "./src/lib/queryClient"
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './api/auth'; // 1. ADD THIS IMPORT

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {/* 2. ADD THE AUTH PROVIDER WRAPPER */}
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

registerRootComponent(App);