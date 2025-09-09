import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function RoleSelectionScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Ionicons name="person-add-outline" size={64} color={theme.colors.primary} />
      <Text style={[styles.title, { color: theme.colors.text }]}>Join Verifi</Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
        How would you like to get started?
      </Text>

      <Button
        title="Sign up as a Consumer"
        onPress={() => navigation.navigate('SignUp', { role: 'consumer' })}
        variant="secondary"
        style={{ width: '100%', marginBottom: theme.spacing.l }}
      />
      <Button
        title="Register my Business"
        onPress={() => navigation.navigate('SignUp', { role: 'owner' })}
        variant="primary"
        style={{ width: '100%' }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 48,
    textAlign: 'center',
  },
});