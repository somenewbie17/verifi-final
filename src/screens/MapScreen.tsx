import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Using the same mock data for now
const MOCK_RESULTS = [
  { id: '1', name: 'Bistro Cafe & Bar', rating: 4.5, categories: ['Food'], lat: 6.8098, lng: -58.1610, verified: false },
  { id: '2', name: "Oasis Cafe", rating: 4.0, categories: ['Food'], lat: 6.8085, lng: -58.1633, verified: true },
  { id: '3', name: "King's Jewellery World", rating: 5.0, categories: ['Services'], lat: 6.8115, lng: -58.1653, verified: true },
];

export default function MapScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  return (
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
          description={business.categories.join(', ')}
          pinColor={business.verified ? theme.colors.accent : theme.colors.primary}
          onPress={() => navigation.navigate('Business', { businessId: business.id })}
        />
      ))}
    </MapView>
  );
}

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