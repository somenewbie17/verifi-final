import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/src/components/ui/Card';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/Button';
import { useAppStore } from '@/src/lib/store';
import { useNavigation } from '@react-navigation/native';

const StatCard = ({ icon, label, value, change }: { icon: any; label: string; value: string; change: string }) => {
  const { theme } = useTheme();
  const isPositive = !change.startsWith('-');

  return (
    <Card style={styles.statCard}>
      <Ionicons name={icon} size={24} color={theme.colors.textSecondary} />
      <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.statValue, { color: theme.colors.text }]}>{value}</Text>
      <Text style={{ color: isPositive ? theme.colors.primary : 'red' }}>{change}</Text>
    </Card>
  );
};

const ConsumerDashboard = () => {
    const { theme } = useTheme();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
            <Ionicons name="person-circle-outline" size={64} color={theme.colors.textSecondary} />
            <Text style={[theme.typography.h3, { color: theme.colors.text, marginTop: 16, textAlign: 'center' }]}>
                Welcome to Verifi
            </Text>
            <Text style={[theme.typography.body, { color: theme.colors.textSecondary, textAlign: 'center', marginTop: 8 }]}>
                Your dashboard for reviews and claims will appear here once you own a business.
            </Text>
        </View>
    );
}

export default function DashboardScreen() {
  const { theme } = useTheme();
  const user = useAppStore((state) => state.user);
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <Text style={[theme.typography.h1, { color: theme.colors.text, paddingHorizontal: 24 }]}>Dashboard</Text>
      
      {user?.role === 'owner' ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.statsGrid}>
            <StatCard icon="eye-outline" label="Profile Views" value="1,204" change="+12%" />
            <StatCard icon="logo-whatsapp" label="WhatsApp Clicks" value="89" change="+5%" />
            <StatCard icon="call-outline" label="Calls" value="23" change="-2%" />
            <StatCard icon="star-outline" label="Reviews" value="15" change="+3" />
          </View>

          <View style={styles.ctaContainer}>
              <Text style={[theme.typography.h3, { color: theme.colors.text, textAlign: 'center' }]}>Get More Customers</Text>
              <Text style={[theme.typography.body, { color: theme.colors.textSecondary, textAlign: 'center', marginVertical: theme.spacing.m }]}>
                  Upgrade your listing to appear at the top of search results and promotions.
              </Text>
              <Button title="Upgrade to Premium" variant='primary' onPress={() => navigation.navigate('Pricing')} />
          </View>
        </ScrollView>
      ) : (
        <ConsumerDashboard />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 24, paddingTop: 12 },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  statCard: {
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    gap: 8,
  },
  statLabel: {
    fontWeight: '500',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  ctaContainer: {
    marginTop: 16,
    padding: 24,
    borderRadius: 18,
    backgroundColor: 'rgba(30, 139, 87, 0.1)',
  }
});