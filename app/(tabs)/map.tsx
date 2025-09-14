import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { useAllBusinesses } from '@/api/queries/businesses';
import Loading from '@/src/components/ui/Loading';
import { useLocation } from '@/src/hooks/useLocation'; // Import the location hook
import { Business } from '@/types';
import Card from '@/src/components/ui/Card';
import ImageWithFallback from '@/src/components/ui/ImageWithFallback';
import Button from '@/components/Button';
import Rating from '@/src/components/ui/Rating';

// --- How the new code works ---
// 1. This is a new, self-contained component for the preview card.
// It receives a `business` object and displays its key information.
const BusinessPreviewCard = ({ business }: { business: Business }) => {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.previewContainer}>
      <Card style={styles.previewCard}>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <ImageWithFallback
            uri={business.photos ? business.photos[0] : undefined}
            style={styles.previewImage}
          />
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={[theme.typography.h3, { color: theme.colors.text }]}>
              {business.name}
            </Text>
            {/* This is a placeholder rating. We'll connect this to real data later. */}
            <Rating rating={4.5} />
          </View>
        </View>
        <Button
          title="View Details"
          variant="primary"
          onPress={() => navigation.navigate('Business', { businessId: business.id })}
          style={{ marginTop: 12 }}
        />
      </Card>
    </View>
  );
};


export default function MapScreen() {
  const { theme } = useTheme();

  // 2. We fetch all businesses and the user's location concurrently.
  const { data: businesses, isLoading: isLoadingBusinesses } = useAllBusinesses();
  const { location, loading: isLoadingLocation, errorMsg } = useLocation();
  
  // 3. A new state variable is added to track which business is currently selected by the user.
  // It starts as `null` (no business selected).
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  if (isLoadingBusinesses || isLoadingLocation) {
    return <Loading />;
  }
  
  if (errorMsg) {
    return (
      <View style={styles.centerContainer}>
        <Text style={{ color: theme.colors.textSecondary, textAlign: 'center', padding: 20 }}>
          {errorMsg}. Please enable location services to use the map.
        </Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        // The map is now centered on the user's location, with a fallback to Georgetown.
        initialRegion={{
          latitude: location?.coords.latitude || 6.8085,
          longitude: location?.coords.longitude || -58.1633,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
        customMapStyle={theme.dark ? mapStyleDark : []}
        // If the user taps the map background, we clear the selected business.
        onPress={() => setSelectedBusiness(null)}
      >
        {businesses?.map(business => (
          <Marker
            key={business.id}
            coordinate={{ latitude: business.lat, longitude: business.lng }}
            pinColor={business.verified ? theme.colors.accent : theme.colors.primary}
            // 4. When a marker is tapped, it now updates the `selectedBusiness` state
            // instead of navigating away from the screen.
            onPress={() => setSelectedBusiness(business)}
          />
        ))}
      </MapView>
      
      {/* 5. This is a conditional render. The preview card only appears if a business is selected. */}
      {selectedBusiness && (
        <BusinessPreviewCard business={selectedBusiness} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  // New styles for the preview card
  previewContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  previewCard: {
    padding: 12,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});


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