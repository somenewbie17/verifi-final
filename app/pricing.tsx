import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import { Ionicons } from '@expo/vector-icons';
import Card from '@/src/components/ui/Card';

export default function PricingScreen() {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[theme.typography.h1, { color: theme.colors.text, textAlign: 'center' }]}>
        Upgrade to Premium
      </Text>
      <Text style={[theme.typography.body, { color: theme.colors.textSecondary, textAlign: 'center', marginVertical: theme.spacing.m }]}>
        Unlock powerful features to grow your business.
      </Text>

      <Card style={{ marginTop: theme.spacing.xl }}>
        <View style={styles.featureRow}>
            <Ionicons name="analytics-outline" size={24} color={theme.colors.primary} />
            <Text style={styles.featureText}>Advanced Analytics</Text>
        </View>
        <View style={styles.featureRow}>
            <Ionicons name="pricetags-outline" size={24} color={theme.colors.primary} />
            <Text style={styles.featureText}>Unlimited Promotions</Text>
        </View>
        <View style={styles.featureRow}>
            <Ionicons name="ribbon-outline" size={24} color={theme.colors.primary} />
            <Text style={styles.featureText}>Top Placement in Search</Text>
        </View>
        <Button title="Choose Plan" variant='primary' onPress={() => {}} style={{ marginTop: theme.spacing.l }} />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
      flex: 1, 
      padding: 24,
    },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 16,
    color: '#FFFFFF' // This should be theme.colors.text, but for simplicity
  }
});