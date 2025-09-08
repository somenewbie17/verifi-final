import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useTheme } from '@/src/hooks/useTheme';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/Button';
import VerifiedBadge from '@/src/components/ui/VerifiedBadge';
import useWhatsApp from '@/src/hooks/useWhatsApp';
// TODO: Fetch real business details using React Query based on route.params.businessId

type BusinessScreenRouteProp = RouteProp<{ params: { businessId: string } }, 'params'>;

export default function BusinessScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<BusinessScreenRouteProp>();
  const { businessId } = route.params;
  const { openWhatsApp } = useWhatsApp();

  // --- Mock Data (replace with React Query fetch) ---
  const business = {
    id: businessId,
    name: "German's Restaurant",
    verified: true,
    photos: ["https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2574&auto=format&fit=crop"], // Placeholder image
    phone: "5922253972",
    whatsapp: "5926001234",
  };
  // ---

  const handleWhatsAppPress = () => {
    openWhatsApp(business.whatsapp, `Hi, I found ${business.name} on Verifi. I have a question.`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView>
        <View>
          <Image
            source={{ uri: business.photos[0] }}
            style={styles.headerImage}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.headerOverlay} />
          
          <SafeAreaView style={styles.headerTopBar} edges={['top']}>
             <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back-circle" size={40} color="#FFFFFF" />
             </Pressable>
          </SafeAreaView>

          <View style={styles.headerContent}>
            <Text style={[theme.typography.h1, styles.headerText]}>{business.name}</Text>
            {business.verified && <VerifiedBadge size={28} />}
          </View>
        </View>
        
        {/* TODO: Add Tab View for About, Reviews, Promotions */}
        <View style={styles.contentContainer}>
             <Text style={[theme.typography.h3, { color: theme.colors.text }]}>About</Text>
             <Text style={[theme.typography.body, { color: theme.colors.textSecondary, marginTop: theme.spacing.s }]}>
                More details about the business, hours, address, etc. will go here.
             </Text>
        </View>

      </ScrollView>

      {/* Sticky Action Bar */}
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
  headerTopBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  backButton: {
    opacity: 0.8,
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