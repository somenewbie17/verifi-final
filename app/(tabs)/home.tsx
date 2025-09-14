import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Category, Promo } from '@/types';
import Card from '@/src/components/ui/Card';
import Chip from '@/src/components/ui/Chip';
import { useNavigation } from '@react-navigation/native';
import PromoBadge from '@/src/components/ui/PromoBadge';
import { useActivePromos } from '@/api/queries/promos';

const CATEGORIES: Category[] = [
  'Food', 'Salons', 'Barbers', 'Auto', 'Hotels', 'Services',
];

export default function HomeScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  // 1. We call our custom hook to fetch live promo data from Supabase.
  // The MOCK_PROMOS array is now completely gone.
  const { data: promos, isLoading } = useActivePromos();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top']}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[theme.typography.h1, { color: theme.colors.text }]}>Discover</Text>
          <Text style={[theme.typography.h1, { color: theme.colors.textSecondary }]}>Guyana</Text>
        </View>

        <Pressable onPress={() => navigation.navigate('Search')}>
          <View
            style={[
              styles.searchContainer,
              theme.shadows.medium,
              { backgroundColor: theme.colors.card },
            ]}
          >
            <Feather name="search" size={20} color={theme.colors.textSecondary} />
            <TextInput
              placeholder="What are you looking for?"
              placeholderTextColor={theme.colors.textSecondary}
              style={[styles.searchInput, { color: theme.colors.text }]}
              editable={false}
              pointerEvents="none"
            />
          </View>
        </Pressable>

        <View style={styles.section}>
          <Text style={[theme.typography.h3, { color: theme.colors.text, marginBottom: theme.spacing.m }]}>
            Categories
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: theme.spacing.s }}
          >
            {CATEGORIES.map((category) => (
              <Chip key={category} label={category} onPress={() => navigation.navigate('Search')} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={[theme.typography.h3, { color: theme.colors.text, marginBottom: theme.spacing.m }]}>
            Today’s Deals
          </Text>
          {/* 2. We now handle the loading state from the database call. */}
          {isLoading ? (
            <ActivityIndicator color={theme.colors.primary} style={{ marginTop: 20 }} />
          ) : (
            promos?.map((promo) => (
              <Pressable
                key={promo.id}
                onPress={() =>
                  navigation.navigate('Business', {
                    businessId: promo.business_id,
                  })
                }
              >
                <Card style={{ marginBottom: theme.spacing.m }}>
                  <View style={styles.promoCard}>
                    <Ionicons name="pricetag-outline" size={24} color={theme.colors.primary} />
                    <View style={{ flex: 1 }}>
                      <Text style={[theme.typography.bodyBold, { color: theme.colors.text }]}>
                        {promo.title}
                      </Text>
                      {/* 3. We access the business name from the nested object */}
                      <Text style={[theme.typography.caption, { color: theme.colors.textSecondary }]}>
                        {promo.businesses?.name}
                      </Text>
                    </View>
                    <PromoBadge text="ACTIVE" />
                  </View>
                </Card>
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 54,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  section: {
    marginTop: 32,
  },
  promoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});