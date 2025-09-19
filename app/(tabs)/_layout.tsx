import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '@/src/lib/store';
import { useTheme } from '@/src/hooks/useTheme';

export default function TabLayout() {
  const { role } = useAppStore();
  const { theme } = useTheme();
  const isBusiness = role === 'business';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
        },
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTitleStyle: {
          color: theme.colors.text,
        },
        headerTintColor: theme.colors.text,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home-outline" color={color} />,
          href: isBusiness ? null : '/(tabs)/home',
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons size={28} name="search-outline" color={color} />,
        }}
      />
       <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          headerShown: false, // Hides the ugly map header
          tabBarIcon: ({ color }) => <Ionicons size={28} name="map-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons size={28} name="stats-chart-outline" color={color} />,
          href: isBusiness ? '/(tabs)/dashboard' : null,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons size={28} name="cog-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}