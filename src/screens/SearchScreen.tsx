import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Pressable } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import Button from '@/components/Button';
import Card from '@/src/components/ui/Card';
import Rating from '@/src/components/ui/Rating';
import { useNavigation } from '@react-navigation/native';
import ImageWithFallback from '@/src/components/ui/ImageWithFallback';

const MOCK_RESULTS = [
  { id: '1', name: 'Bistro Cafe & Bar', rating: 4.5, categories: ['Food'], lat: 6.8098, lng: -58.1610, verified: false, photo: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2670&auto-format&fit=crop' },
  { id: '2', name: "Oasis Cafe", rating: 4.0, categories: ['Food'], lat: 6.8085, lng: -58.1633, verified: true, photo: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2574&auto=format&fit=crop' },
  { id: '3', name: "King's Jewellery World", rating: 5.0, categories: ['Services'], lat: 6.8115, lng: -58.1653, verified: true, photo: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2574&auto=format&fit=crop' },
];

export default function SearchScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState(MOCK_RESULTS);

  // This effect runs whenever the user stops typing
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredResults(MOCK_RESULTS);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = MOCK_RESULTS.filter(business => 
        business.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredResults(filtered);
    }
  }, [searchQuery]);

  const renderBusinessCard = ({ item }: { item: typeof MOCK_RESULTS[0] }) => (
    <Pressable onPress={() => navigation.navigate('Business', { businessId: item.id })}>
      <Card style={{ marginBottom: theme.spacing.m }}>
        <ImageWithFallback
          uri={item.photo}
          style={{ height: 120, width: '100%', borderRadius: theme.radii.m, marginBottom: theme.spacing.m }}
        />
        <Text style={[theme.typography.h3, { color: theme.colors.text }]}>{item.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: theme.spacing.s, gap: theme.spacing.s }}>
          <Rating rating={item.rating} />
          <Text style={[theme.typography.caption, { color: theme.colors.textSecondary }]}>{item.rating.toFixed(1)}</Text>
        </View>
      </Card>
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <View style={[styles.searchContainer, { backgroundColor: theme.colors.card }]}>
          <Feather name="search" size={20} color={theme.colors.textSecondary} />
          <TextInput
            placeholder="Search businesses or categories"
            placeholderTextColor={theme.colors.textSecondary}
            style={[styles.searchInput, { color: theme.colors.text }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <Button 
            title="View on Map" 
            onPress={() => navigation.navigate('Map')} 
            variant='primary'
            style={{ marginTop: 16 }}
        />
      </View>
      
      <FlatList
        data={filteredResults}
        keyExtractor={(item) => item.id}
        renderItem={renderBusinessCard}
        contentContainerStyle={{ padding: theme.spacing.l }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
  },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 16 },
});