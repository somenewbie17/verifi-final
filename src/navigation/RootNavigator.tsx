import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@/src/hooks/useTheme';
import { useAppStore } from '@/src/lib/store';

import SplashScreen from '@/src/screens/SplashScreen';
import LoginScreen from '@/core/login';
import TabNavigator from './TabNavigator';
import BusinessScreen from '@/src/screens/BusinessScreen';
import ReviewScreen from '@/src/screens/ReviewScreen';
import MapScreen from '@/src/screens/MapScreen';
import PricingScreen from '@/src/screens/PricingScreen';
import RoleSelectionScreen from '@/src/screens/RoleSelectionScreen';
import SignUpScreen from '@/src/screens/SignUpScreen';

const Stack = createStackNavigator();

export default function RootNavigator() {
  const { theme } = useTheme();
  
  const user = useAppStore((state) => state.user);
  // We no longer need a delay for the database, so we can simplify the loading state.
  // This state is now managed by the AuthProvider.
  const [loading, setLoading] = useState(true);

  // The useEffect that called `initDatabase` has been removed.
  // We now rely on the AuthProvider to tell us when authentication is ready.
  useEffect(() => {
    // A small timeout to prevent the splash screen from flashing too quickly.
    const timer = setTimeout(() => setLoading(false), 500); 
    return () => clearTimeout(timer);
  }, [user]); // The loading state can react to user changes if needed.


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
  
  // The check for `dbLoaded` has been removed.
  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          cardStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.primary,
          headerTitleStyle: { color: theme.colors.text },
          headerStyle: { 
              backgroundColor: theme.colors.card, 
              borderBottomWidth: 0,
              elevation: 0,
              shadowOpacity: 0
            },
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="App" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Business" component={BusinessScreen} options={{ title: 'Details' }}/>
            <Stack.Screen name="Review" component={ReviewScreen} options={{ presentation: 'modal' }} />
            <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Map View' }} />
            <Stack.Screen name="Pricing" component={PricingScreen} options={{ presentation: 'modal' }}/>
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} options={{ title: 'Create Account' }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: '' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}