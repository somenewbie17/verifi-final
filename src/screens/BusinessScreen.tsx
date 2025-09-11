import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Linking,
  Alert,
  Share,
  ActivityIndicator,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useTheme } from '@/src/hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import VerifiedBadge from '@/src/components/ui/VerifiedBadge';
import useWhatsApp from '@/src/hooks/useWhatsApp';
import { useBusinessById } from '@/api/queries/businesses';
import { useReviewsForBusiness } from '@/api/queries/reviews';
import Loading from '@/src/components/ui/Loading';
import ImageWithFallback from '@/src/components/ui/ImageWithFallback';
import { Review } from '@/types';
import ReviewCard from '@/src/components/ui/ReviewCard';
import { Ionicons } from '@expo/vector-icons';
import { postEvent } from '@/src/services/analytics';

type BusinessScreenRouteProp =
  RouteProp<{ params: { businessId: string } }, 'params'>;

export default function BusinessScreen() {
  const { theme } = useTheme();
  const route = useRoute<BusinessScreenRouteProp>();
  const navigation = useNavigation<any>();
  const { openWhatsApp } = useWhatsApp();
  const { businessId } = route.params;

  // --- Data Fetching ---
  // These custom hooks use react-query to fetch data from your Supabase backend.
  // They handle loading, error, and caching states automatically.
  const { data: business, isLoading: isLoadingBusiness, isError } = useBusinessById(businessId);
  const { data: reviews, isLoading: isLoadingReviews } = useReviewsForBusiness(businessId);
  
  // --- Analytics ---
  // This `useEffect` hook runs once when the component loads.
  // It logs a "PROFILE_VIEWED" event to your analytics table in Supabase.
  useEffect(() => {
    if (businessId) {
      postEvent({ name: 'PROFILE_VIEWED', payload: { businessId } });
    }
  }, [businessId]);

  // --- Action Handlers ---
  // These functions are called when the user presses the buttons in the action bar.
  const handleCallPress = () => {
    if (!business?.phone || !businessId) return;
    postEvent({ name: 'CONTACT_CALL', payload: { businessId } });
    const phoneNumber = business.phone.replace(/[^0-9]/g, '');
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl).catch(() => Alert.alert('Error', 'Unable to make phone calls.'));
  };
  
  const handleWhatsAppPress = () => {
    if (!business?.whatsapp || !businessId) return;
    postEvent({ name: 'CONTACT_WHATSAPP', payload: { businessId } });
    openWhatsApp(
      business.whatsapp,
      `Hi, I found ${business.name} on Verifi. I have a question.`
    );
  };
  
  const handleSharePress = async () => {
    if (!business) return;
    try {
      await Share.share({ message: `Check out ${business.name} on Verifi!` });
    } catch (error) {
      Alert.alert('Error', 'Could not share this business.');
    }
  };

  // --- Loading and Error States ---
  if (isLoadingBusiness) return <Loading />;

  if (isError || !business) {
    return (
      <View style={styles.centerContainer}>
        <Text style={{ color: theme.colors.text }}>Business not found or failed to load.</Text>
      </View>
    );
  }

  // --- Render UI ---
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView>
        {/* Header Image and Title */}
        <View>
          <ImageWithFallback uri={business.photos ? business.photos[0] : undefined} style={styles.headerImage} />
          <View style={styles.headerOverlay} />
          <View style={styles.headerContent}>
            <Text style={[theme.typography.h1, styles.headerText]}>{business.name}</Text>
            {business.verified && <VerifiedBadge size={28} />}
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* Business Details Section */}
          <Text style={[theme.typography.h3, { color: theme.colors.text }]}>Details</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={20} color={theme.colors.textSecondary} />
              <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>
                {business.address}, {business.city}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="cash-outline" size={20} color={theme.colors.textSecondary} />
              <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>
                Price: {business.price_band}
              </Text>
            </View>
            {business.hours && Object.entries(business.hours).map(([day, time]) => (
              <View style={styles.detailRow} key={day}>
                <Ionicons name="time-outline" size={20} color={theme.colors.textSecondary} />
                <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>
                  {day}: {time as string}
                </Text>
              </View>
            ))}
          </View>

          {/* Reviews Section */}
          <View style={styles.reviewsSection}>
            <View style={styles.reviewsHeader}>
              <Text style={[theme.typography.h3, { color: theme.colors.text }]}>Reviews</Text>
              <Button 
                title="Leave a Review" 
                variant="outline"
                onPress={() => navigation.navigate('Review', { businessId })}
              />
            </View>
            {isLoadingReviews ? (
              <ActivityIndicator style={{marginTop: 16}} color={theme.colors.primary} />
            ) : reviews && reviews.length > 0 ? (
              reviews.map(review => <ReviewCard key={review.id} review={review} />)
            ) : (
              <Text style={[theme.typography.body, { color: theme.colors.textSecondary, marginTop: 16 }]}>
                Be the first to leave a review!
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <SafeAreaView
        style={[styles.actionBar, { backgroundColor: theme.colors.card, borderTopColor: theme.colors.border }]}
        edges={['bottom']}
      >
        <Button title="Call" variant="secondary" onPress={handleCallPress} style={{ flex: 1 }} />
        <Button title="WhatsApp" variant="primary" onPress={handleWhatsAppPress} style={{ flex: 2, marginHorizontal: theme.spacing.m }} />
        <Button title="Share" variant="accent" onPress={handleSharePress} style={{ flex: 1 }} />
      </SafeAreaView>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerImage: { width, height: 250 },
  headerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  headerContent: { position: 'absolute', bottom: 20, left: 20, flexDirection: 'row', alignItems: 'center' },
  headerText: { color: '#FFFFFF', marginRight: 12 },
  contentContainer: { padding: 24 },
  actionBar: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  reviewsSection: { marginTop: 32 },
  reviewsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  detailsContainer: {
    marginTop: 8,
    gap: 12,
    marginBottom: 16,
    paddingLeft: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
  }
});