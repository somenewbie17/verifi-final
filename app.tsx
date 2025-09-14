import 'react-native-url-polyfill/auto';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './src/hooks/useTheme';
import queryClient from './src/lib/queryClient';
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <StatusBar style="auto" />
          <Slot />
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}