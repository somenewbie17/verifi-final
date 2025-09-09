import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@/src/hooks/useTheme';
import { initDatabase } from '@/src/db/index';
import { useAppStore } from '@/src/lib/store';

import SplashScreen from '@/src/screens/SplashScreen';
import LoginScreen from '@/core/login';
import TabNavigator from './TabNavigator';
import BusinessScreen from '@/src/screens/BusinessScreen';
import ReviewScreen from '@/src/screens/ReviewScreen';
import MapScreen from '@/src/screens/MapScreen';
import PricingScreen from '@/src/screens/PricingScreen';
import RoleSelectionScreen from '@/src/screens/RoleSelectionScreen'; // 1. Import
import SignUpScreen from '@/src/screens/SignUpScreen';           // 2. Import

const Stack = createStackNavigator();

export default function RootNavigator() {
  const { theme } = useTheme();
  const [dbLoaded, setDbLoaded] = useState(false);
  
  const user = useAppStore((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      await initDatabase();
      setDbLoaded(true);
      setTimeout(() => setLoading(false), 500);
    }
    initialize().catch(console.error);
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
  
  if (loading || !dbLoaded) {
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
            {/* 3. Add the new screens to the stack */}
            <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} options={{ title: 'Create Account' }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: '' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}