import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Category } from '@/types';
import Card from '@/src/components/ui/Card';
import Chip from '@/src/components/ui/Chip';
import { useNavigation } from '@react-navigation/native';

const CATEGORIES: Category[] = ['Food', 'Salons', 'Barbers', 'Auto', 'Hotels', 'Services'];

export default function HomeScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[theme.typography.h1, { color: theme.colors.text }]}>
            Discover
          </Text>
          <Text style={[theme.typography.h1, { color: theme.colors.textSecondary }]}>
            Georgetown
          </Text>
        </View>

        <View style={[styles.searchContainer, theme.shadows.medium, { backgroundColor: theme.colors.card }]}>
          <Feather name="search" size={20} color={theme.colors.textSecondary} />
          <TextInput
            placeholder="What are you looking for?"
            placeholderTextColor={theme.colors.textSecondary}
            style={[styles.searchInput, { color: theme.colors.text }]}
            onFocus={() => navigation.navigate('Search')}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={[theme.typography.h3, { color: theme.colors.text, marginBottom: theme.spacing.m }]}>
            Categories
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: theme.spacing.s }}>
            {CATEGORIES.map(category => (
              <Chip key={category} label={category} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={[theme.typography.h3, { color: theme.colors.text, marginBottom: theme.spacing.m }]}>
            Today’s Deals
          </Text>
          <Card style={{ marginBottom: theme.spacing.m }}>
            <View style={styles.promoCard}>
                <Ionicons name="pricetag-outline" size={24} color={theme.colors.primary} />
                <View style={{flex: 1}}>
                    <Text style={[theme.typography.bodyBold, { color: theme.colors.text }]}>2-for-1 Lunch Special</Text>
                    <Text style={[theme.typography.caption, { color: theme.colors.textSecondary }]}>German's Restaurant</Text>
                </View>
                <View style={{backgroundColor: theme.colors.accent, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6}}>
                    <Text style={[theme.typography.caption, {color: theme.colors.black, fontWeight: 'bold'}]}>ENDS TODAY</Text>
                </View>
            </View>
          </Card>
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
  }
});