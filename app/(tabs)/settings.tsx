import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import { useAuth } from '@/api/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/Button';
import { useAppStore } from '@/src/lib/store'; // 1. Import the store

export default function SettingsScreen() {
  const { theme, themeMode, toggleTheme } = useTheme();
  const { logout } = useAuth(); // 2. Only get the logout function here
  const user = useAppStore((state) => state.user); // 3. Get user state from the store

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: logout },
    ]);
  };

  const themeOptions = [
    { mode: 'light', icon: 'sunny-outline', label: 'Light' },
    { mode: 'dark', icon: 'moon-outline', label: 'Dark' },
    { mode: 'system', icon: 'cog-outline', label: 'System' },
  ] as const;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top']}
    >
      <Text
        style={[
          theme.typography.h1,
          { color: theme.colors.text, marginBottom: 24 },
        ]}
      >
        Settings
      </Text>

      <Text
        style={[
          theme.typography.h3,
          styles.sectionTitle,
          { color: theme.colors.text },
        ]}
      >
        Appearance
      </Text>
      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        {themeOptions.map((option, index) => (
          <Pressable
            key={option.mode}
            onPress={() => toggleTheme(option.mode)}
            style={[
              styles.optionRow,
              {
                borderBottomWidth: index === themeOptions.length - 1 ? 0 : 1,
                borderBottomColor: theme.colors.border,
              },
            ]}
          >
            <Ionicons
              name={option.icon}
              size={22}
              color={theme.colors.textSecondary}
            />
            <Text style={[styles.optionText, { color: theme.colors.text }]}>
              {option.label}
            </Text>
            {themeMode === option.mode && (
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={theme.colors.primary}
              />
            )}
          </Pressable>
        ))}
      </View>

      <Text
        style={[
          theme.typography.h3,
          styles.sectionTitle,
          { color: theme.colors.text },
        ]}
      >
        Account
      </Text>
      <View
        style={[
          styles.card,
          { backgroundColor: theme.colors.card, padding: 16 },
        ]}
      >
        <Text style={{ color: theme.colors.textSecondary }}>Logged in as:</Text>
        <Text
          style={[
            theme.typography.bodyBold,
            { color: theme.colors.text, marginTop: 4, marginBottom: 16 },
          ]}
        >
          {user?.email}
        </Text>
        <Button title="Log Out" onPress={handleLogout} variant="secondary" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  sectionTitle: { marginTop: 24, marginBottom: 12 },
  card: { borderRadius: 16 },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: { flex: 1, marginLeft: 16, fontSize: 16 },
});