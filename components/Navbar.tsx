import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; // Import Link from expo-router
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Navbar() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <Text style={[styles.logo, { color: theme.colors.text }]}>Verifi</Text>
      <View style={styles.icons}>
        {/* Use the Link component for navigation */}
        <Link href="/(tabs)/search" asChild>
          <Pressable>
            <Ionicons name="search" size={24} color={theme.colors.text} style={styles.icon} />
          </Pressable>
        </Link>
        <Pressable onPress={() => console.log('Notifications pressed')}>
          <Ionicons name="notifications-outline" size={24} color={theme.colors.text} style={styles.icon} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 20,
  },
});