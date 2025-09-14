import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { useBusinessById } from '@/api/queries/businesses';
import { useReviewsForBusiness } from '@/api/queries/reviews';
import { useTheme } from '@/src/hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '@/src/components/ui/Loading';
import ImageWithFallback from '@/src/components/ui/ImageWithFallback';
import ReviewCard from '@/src/components/ui/ReviewCard';
import Button from '@/components/Button';
import { Ionicons } from '@expo/vector-icons';
import VerifiedBadge from '@/src/components/ui/VerifiedBadge';
import Card from '@/src/components/ui/Card';

// This is a new component inspired by the "Action Buttons" in the Flutter app.
const ActionButton = ({ icon, text, onPress }: { icon: any; text: string; onPress?: () => void }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={styles.actionButton}>
      <View style={[styles.actionIconContainer, { backgroundColor: theme.colors.primary }]}>
        <Ionicons name={icon} size={22} color="black" />
      </View>
      <Text style={[styles.actionButtonText, { color: theme.colors.textSecondary }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default function BusinessProfileScreen() {
  const { id } = useLocalSearchParams();
  const businessId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();

  const { data: business, isLoading: isLoadingBusiness } = useBusinessById(businessId);
  const { data: reviews, isLoading: isLoadingReviews } = useReviewsForBusiness(businessId);
  const { theme } = useTheme();

  if (isLoadingBusiness || isLoadingReviews) return <Loading />;

  if (!business) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: theme.colors.text }}>Business not found.</Text>
      </SafeAreaView>
    );
  }

  const openDirections = () => {
    const url = `http://maps.apple.com/?address=${encodeURIComponent(business.address || '')}`;
    Linking.openURL(url);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* --- Header Section --- */}
        <View style={styles.headerContainer}>
          <ImageWithFallback uri={business.photos?.[0]} style={styles.headerImage} />
          <View style={styles.headerOverlay} />
          <View style={styles.headerContent}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[theme.typography.h1, styles.headerText]}>{business.name}</Text>
              {business.verified && <VerifiedBadge size={24} />}
            </View>
            <Text style={[theme.typography.body, styles.headerSubText]}>
              {business.address}, {business.city}
            </Text>
          </View>
        </View>

        {/* --- Main Content Below Header --- */}
        <View style={styles.contentContainer}>
          {/* Action Buttons Section */}
          <View style={styles.actionsRow}>
            {business.phone && (
              <ActionButton
                icon="call"
                text="Call"
                onPress={() => Linking.openURL(`tel:${business.phone}`)}
              />
            )}
            <ActionButton icon="navigate" text="Directions" onPress={openDirections} />
            <ActionButton icon="share-social" text="Share" />
            <ActionButton icon="heart-outline" text="Save" />
          </View>

          {/* About Section */}
          <Card style={styles.sectionCard}>
            <Text style={[theme.typography.h3, { color: theme.colors.text }]}>About</Text>
            <Text style={[theme.typography.body, { color: theme.colors.textSecondary, marginTop: theme.spacing.m }]}>
              {(business as any).description || 'No description available.'}
            </Text>
          </Card>

          {/* Reviews Section */}
          <Card style={styles.sectionCard}>
            <Text style={[theme.typography.h3, { color: theme.colors.text, marginBottom: theme.spacing.m }]}>
              Reviews
            </Text>
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => <ReviewCard key={review.id} review={review} />)
            ) : (
              <Text style={{ color: theme.colors.textSecondary, textAlign: 'center' }}>
                No reviews yet. Be the first!
              </Text>
            )}
            <Button
              title="Leave a Review"
              onPress={() => router.push(`/review/${businessId}`)}
              variant="outline"
              style={{ marginTop: theme.spacing.m }}
            />
          </Card>
        </View>
      </ScrollView>

      {/* Back button floats on top */}
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </Pressable>
    </View>
  );
}

// --- NEW STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 300,
    width: '100%',
    backgroundColor: 'black',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  headerContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  headerText: {
    color: 'white',
    marginRight: 8,
  },
  headerSubText: {
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  contentContainer: {
    padding: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  actionButton: {
    alignItems: 'center',
    gap: 8,
  },
  actionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  sectionCard: {
    padding: 16,
    marginTop: 16,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});