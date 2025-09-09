import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useTheme } from '@/src/hooks/useTheme';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import VerifiedBadge from '@/src/components/ui/VerifiedBadge';
import useWhatsApp from '@/src/hooks/useWhatsApp';

// Mock data - in a real app, this would be a fetch based on businessId
const MOCK_RESULTS = [
  { id: '1', name: 'Bistro Cafe & Bar', categories: ['Food'], photo: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2670&auto=format&fit=crop', phone: "5922251234", whatsapp: "5926001234", verified: false },
  { id: '2', name: "Oasis Cafe", categories: ['Food'], photo: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2574&auto=format&fit=crop', phone: "5922255678", whatsapp: "5926005678", verified: true },
  { id: '3', name: "King's Jewellery World", categories: ['Services'], photo: 'https://images.unsplash.com/photo-1610192134293-8a3561b00b0b?q=80&w=2670&auto=format&fit=crop', phone: "5922259999", whatsapp: "5926009999", verified: true },
];

type BusinessScreenRouteProp = RouteProp<{ params: { businessId: string } }, 'params'>;

export default function BusinessScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<BusinessScreenRouteProp>();
  const { businessId } = route.params;
  const { openWhatsApp } = useWhatsApp();

  // Find the correct business from our mock data
  const business = MOCK_RESULTS.find(b => b.id === businessId);

  // Handle case where business is not found
  if (!business) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Business not found!</Text>
      </View>
    );
  }

  const handleWhatsAppPress = () => {
    openWhatsApp(business.whatsapp, `Hi, I found ${business.name} on Verifi. I have a question.`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView>
        <View>
          <Image
            source={{ uri: business.photo }}
            style={styles.headerImage}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.headerOverlay} />
          
          {/* The manual back button has been removed from here */}

          <View style={styles.headerContent}>
            <Text style={[theme.typography.h1, styles.headerText]}>{business.name}</Text>
            {business.verified && <VerifiedBadge size={28} />}
          </View>
        </View>
        
        <View style={styles.contentContainer}>
             <Text style={[theme.typography.h3, { color: theme.colors.text }]}>About</Text>
             <Text style={[theme.typography.body, { color: theme.colors.textSecondary, marginTop: theme.spacing.s }]}>
                More details about the business, hours, address, etc. will go here.
             </Text>
        </View>

      </ScrollView>

      <SafeAreaView style={[styles.actionBar, { backgroundColor: theme.colors.card, borderTopColor: theme.colors.border }]} edges={['bottom']}>
        <Button title="Call" variant='secondary' onPress={() => { /* TODO */ }} style={{ flex: 1 }}/>
        <Button title="WhatsApp" variant='primary' onPress={handleWhatsAppPress} style={{ flex: 2, marginHorizontal: theme.spacing.m }}/>
        <Button title="Share" variant='accent' onPress={() => { /* TODO */ }} style={{ flex: 1 }}/>
      </SafeAreaView>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerImage: {
    width: width,
    height: 250,
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  headerContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    marginRight: 12,
  },
  contentContainer: {
    padding: 24,
  },
  actionBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
});