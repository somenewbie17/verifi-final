import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Pressable } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import Button from '@/components/Button';
import Card from '@/src/components/ui/Card';
import Rating from '@/src/components/ui/Rating';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
// TODO: Fetch real search results from the local DB repository

const MOCK_RESULTS = [
  { id: '1', name: 'Bistro Cafe & Bar', rating: 4.5, categories: ['Food'], lat: 6.8098, lng: -58.1610, verified: false, photo: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2670&auto=format&fit=crop' },
  { id: '2', name: "Oasis Cafe", rating: 4.0, categories: ['Food'], lat: 6.8085, lng: -58.1633, verified: true, photo: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2574&auto=format&fit=crop' },
  { id: '3', name: "King's Jewellery World", rating: 5.0, categories: ['Services'], lat: 6.8115, lng: -58.1653, verified: true, photo: 'https://images.unsplash.com/photo-1610192134293-8a3561b00b0b?q=80&w=2670&auto=format&fit=crop' },
];

export default function SearchScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  const renderBusinessCard = ({ item }: { item: typeof MOCK_RESULTS[0] }) => (
    <Pressable onPress={() => navigation.navigate('Business', { businessId: item.id })}>
      <Card style={{ marginBottom: theme.spacing.m }}>
        {/* TODO: Replace with ImageWithFallback */}
        <View style={{ height: 120, backgroundColor: theme.colors.border, borderRadius: theme.radii.m, marginBottom: theme.spacing.m }} />
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
        <View style={styles.toggleContainer}>
           <Button 
                title="List" 
                onPress={() => setViewMode('list')} 
                variant={viewMode === 'list' ? 'primary' : 'secondary'} 
                style={{ flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            />
           <Button 
                title="Map" 
                onPress={() => setViewMode('map')} 
                variant={viewMode === 'map' ? 'primary' : 'secondary'}
                style={{ flex: 1, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            />
        </View>
      </View>
      
      {viewMode === 'list' && (
        <FlatList
          data={MOCK_RESULTS}
          keyExtractor={(item) => item.id}
          renderItem={renderBusinessCard}
          contentContainerStyle={{ padding: theme.spacing.l }}
          showsVerticalScrollIndicator={false}
        />
      )}
      
      {viewMode === 'map' && (
        <MapView
          style={StyleSheet.absoluteFill}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 6.8085,
            longitude: -58.1633,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
          customMapStyle={theme.dark ? mapStyleDark : []}
        >
          {MOCK_RESULTS.map(business => (
            <Marker
              key={business.id}
              coordinate={{ latitude: business.lat, longitude: business.lng }}
              title={business.name}
              onPress={() => navigation.navigate('Business', { businessId: business.id })}
            >
              <View style={[styles.pin, { backgroundColor: theme.colors.primary, borderColor: theme.colors.card }]}>
                  {business.verified && <Ionicons name="shield-checkmark" size={12} color={theme.colors.accent} style={styles.pinCheck} />}
              </View>
            </Marker>
          ))}
        </MapView>
      )}
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
  toggleContainer: { flexDirection: 'row', marginTop: 16 },
  pin: {
      width: 28,
      height: 28,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
  },
  pinCheck: {
      position: 'absolute',
      top: -5,
      right: -5,
  }
});

// A simple dark map style for Google Maps
const mapStyleDark = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
  { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
  { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] },
];