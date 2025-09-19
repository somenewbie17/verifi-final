import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/hooks/useTheme';
import { useRouter } from 'expo-router';

// --- THIS IS THE FIX ---
// We define the types for the MetricCard's props to remove the 'any' error.
type MetricCardProps = {
  icon: keyof typeof Ionicons.glyphMap; // Ensures the icon name is valid
  label: string;
  value: string;
  color?: string;
};

const MetricCard = ({ icon, label, value, color }: MetricCardProps) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.metricCard, { backgroundColor: theme.colors.card }]}>
      <Ionicons name={icon} size={24} color={color || theme.colors.primary} />
      <Text style={[styles.metricValue, { color: theme.colors.text }]}>{value}</Text>
      <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{label}</Text>
    </View>
  );
};

export default function BusinessDashboardScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Dashboard</Text>

        <TouchableOpacity onPress={() => router.push('/pricing')}>
          <View style={[styles.card, { backgroundColor: '#1C2A4D' }]}>
              <View style={styles.subscriptionHeader}>
                  <Text style={[styles.cardTitle, { color: '#FFFFFF' }]}>Free Plan</Text>
                  <View style={styles.upgradeChip}>
                      <Text style={styles.upgradeChipText}>Upgrade Now</Text>
                      <Ionicons name="arrow-forward-outline" size={16} color="#000" />
                  </View>
              </View>
              <Text style={[styles.subscriptionText, { color: '#A0A0A0' }]}>
                  Unlock analytics, promotions, and verified status.
              </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.metricsContainer}>
            <MetricCard icon="eye-outline" label="Profile Views" value="1.2k" color="#007AFF" />
            <MetricCard icon="analytics-outline" label="Engagements" value="301" color="#34C759" />
            <MetricCard icon="star-outline" label="New Reviews" value="12" color="#FF9500" />
            <MetricCard icon="call-outline" label="Calls" value="45" color="#5856D6" />
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Quick Actions</Text>
          <TouchableOpacity style={styles.actionRow}>
            <Ionicons name="create-outline" size={22} color={theme.colors.textSecondary} />
            <Text style={[styles.actionText, {color: theme.colors.text}]}>Edit Business Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionRow}>
            <Ionicons name="megaphone-outline" size={22} color={theme.colors.textSecondary} />
            <Text style={[styles.actionText, {color: theme.colors.text}]}>Create a Promotion</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 16 },
  headerTitle: { fontSize: 32, fontWeight: 'bold', marginBottom: 24 },
  card: { borderRadius: 16, padding: 20, marginBottom: 24 },
  cardTitle: { fontSize: 20, fontWeight: '600' },
  subscriptionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  upgradeChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12 },
  upgradeChipText: { color: '#000', fontWeight: 'bold', marginRight: 4 },
  subscriptionText: { fontSize: 16, lineHeight: 22, marginTop: 16 },
  metricsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 8 },
  metricCard: { width: '48%', borderRadius: 16, padding: 16, marginBottom: 16, alignItems: 'flex-start' },
  metricValue: { fontSize: 28, fontWeight: 'bold', marginVertical: 8 },
  metricLabel: { fontSize: 14 },
  actionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  actionText: { fontSize: 16, marginLeft: 16 },
});