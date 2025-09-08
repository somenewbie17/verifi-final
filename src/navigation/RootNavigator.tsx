import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '@/api/auth';
import { useTheme } from '@/src/hooks/useTheme'; // Corrected Path
import { initDatabase } from '@/src/db/index'; // Corrected Path

import SplashScreen from '@/src/screens/SplashScreen'; // Corrected Path
import LoginScreen from '@/core/login'; // Corrected Path
import TabNavigator from './TabNavigator';
import BusinessScreen from '@/src/screens/BusinessScreen'; // Corrected Path
import ReviewScreen from '@/src/screens/ReviewScreen'; // Corrected Path

const Stack = createStackNavigator();

export default function RootNavigator() {
  const { user, loading: authLoading } = useAuth();
  const { theme } = useTheme();
  const [dbLoaded, setDbLoaded] = useState(false);

  useEffect(() => {
    initDatabase().then(() => setDbLoaded(true)).catch(console.error);
  }, []);

  const navigationTheme = {
    dark: theme.dark,
    colors: {
      primary: theme.colors.primary,
      background: theme.colors.background_nav,
      card: theme.colors.card_bg,
      text: theme.colors.text_nav,
      border: theme.colors.border_nav,
      notification: theme.colors.notification,
    },
  };
  
  if (authLoading || !dbLoaded) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: theme.colors.background },
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="App" component={TabNavigator} />
            <Stack.Screen name="Business" component={BusinessScreen} />
            <Stack.Screen name="Review" component={ReviewScreen} options={{ presentation: 'modal' }} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}