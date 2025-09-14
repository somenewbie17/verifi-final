// app/(tabs)/home.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useActivePromos } from '@/api/queries/promos';
import BusinessCard from '@/src/components/ui/BusinessCard';
import { Category } from '@/types';

const CATEGORIES: Category[] = [
  'Food', 'Salons', 'Barbers', 'Auto', 'Hotels', 'Services',
];

const CategoryChip = ({ category }: { category: string }) => {
  const { theme } = useTheme();
  return (
    <Pressable style={[styles.chipContainer, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.chipText, { color: theme.colors.text }]}>{category}</Text>
    </Pressable>
  );
};

export default function HomeScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { data: promos, isLoading } = useActivePromos();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[theme.typography.h1, { color: theme.colors.text }]}>Discover</Text>
          <Text style={[theme.typography.h1, { color: theme.colors.primary }]}>Guyana</Text>
        </View>

        <Pressable onPress={() => router.push('/search')} style={styles.searchPressable}>
          <View style={[styles.searchContainer, { backgroundColor: theme.colors.card }]}>
            <Feather name="search" size={20} color={theme.colors.textSecondary} />
            <Text style={[styles.searchInput, { color: theme.colors.textSecondary }]}>
              What are you looking for?
            </Text>
          </View>
        </Pressable>

        <View style={styles.section}>
          <Text style={[theme.typography.h3, { color: theme.colors.text, marginBottom: theme.spacing.m }]}>
            Categories
          </Text>
          <FlatList
            data={CATEGORIES}
            renderItem={({ item }) => <CategoryChip category={item} />}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={[theme.typography.h3, { color: theme.colors.text, marginBottom: theme.spacing.m }]}>
            Featured Today
          </Text>
          {isLoading ? (
            <ActivityIndicator color={theme.colors.primary} style={{ marginTop: 20 }} />
          ) : (
            Array.isArray(promos) ? (
              promos.map((promo) =>
                promo.businesses ? (
                  <BusinessCard
                    key={promo.id}
                    business={promo.businesses}
                  />
                ) : null
              )
            ) : null
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
        marginBottom: 24,
    },
    searchPressable: {
        marginBottom: 24,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
    },
    section: {
        marginTop: 16,
        marginBottom: 16,
    },
    chipContainer: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#eee'
    },
    chipText: {
        fontWeight: '600',
    },
});