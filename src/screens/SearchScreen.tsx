import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import Button from '@/components/Button';
import Card from '@/src/components/ui/Card';
import { useNavigation } from '@react-navigation/native';
import ImageWithFallback from '@/src/components/ui/ImageWithFallback';
import { useSearchBusinesses } from '@/api/queries/businesses';
import { useDebounce } from '@/src/hooks/useDebounce';
import Loading from '@/src/components/ui/Loading';
import { Business } from '@/types';

export default function SearchScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');

  // 1. This uses the hook we created to delay the search until the user stops typing.
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // 2. This hook fetches live data from your database using the search query.
  // The old `MOCK_RESULTS` array and `useEffect` for filtering are now completely gone.
  const {
    data: businesses,
    isLoading,
    isError,
  } = useSearchBusinesses(debouncedSearchQuery);

  // 3. This function renders a card for each business returned from the database.
  const renderBusinessCard = ({ item }: { item: Business }) => (
    <Pressable
      // It passes the REAL database ID (a long UUID string) to the Business screen.
      // This is the key part of the fix.
      onPress={() => navigation.navigate('Business', { businessId: item.id })}
    >
      <Card style={{ marginBottom: theme.spacing.m }}>
        <ImageWithFallback
          uri={item.photos[0]}
          style={{
            height: 120,
            width: '100%',
            borderRadius: theme.radii.m,
            marginBottom: theme.spacing.m,
          }}
        />
        <Text style={[theme.typography.h3, { color: theme.colors.text }]}>
          {item.name}
        </Text>
        <Text
          style={[
            theme.typography.caption,
            { color: theme.colors.textSecondary, marginTop: theme.spacing.s },
          ]}
        >
          {item.categories.join(', ')}
        </Text>
      </Card>
    </Pressable>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top']}
    >
      <View style={styles.header}>
        <View
          style={[styles.searchContainer, { backgroundColor: theme.colors.card }]}
        >
          <Feather name="search" size={20} color={theme.colors.textSecondary} />
          <TextInput
            placeholder="Search businesses or categories"
            placeholderTextColor={theme.colors.textSecondary}
            style={[styles.searchInput, { color: theme.colors.text }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={true}
          />
        </View>
        <Button
          title="View on Map"
          onPress={() => navigation.navigate('Map')}
          variant="primary"
          style={{ marginTop: 16 }}
        />
      </View>

      {/* 4. This section now properly handles the loading and error states from the database query. */}
      {isLoading && searchQuery ? (
        <Loading />
      ) : isError ? (
        <View style={styles.centerContainer}>
          <Text style={{ color: theme.colors.text }}>
            Failed to fetch businesses.
          </Text>
        </View>
      ) : (
        <FlatList
          data={businesses}
          keyExtractor={(item) => item.id}
          renderItem={renderBusinessCard}
          contentContainerStyle={{ padding: theme.spacing.l }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.centerContainer}>
              <Text style={{ color: theme.colors.textSecondary }}>
                {searchQuery
                  ? 'No businesses found.'
                  : 'Start typing to search...'}
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
  },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 16 },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});