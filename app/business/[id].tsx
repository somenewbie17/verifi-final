import React from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/src/hooks/useTheme';
// Corrected hook names
import { useBusinessById } from '@/api/queries/businesses';
import { useReviewsForBusiness } from '@/api/queries/reviews';
import ImageWithFallback from '@/src/components/ui/ImageWithFallback';
import VerifiedBadge from '@/src/components/ui/VerifiedBadge';
import Rating from '@/src/components/ui/Rating';
import ReviewCard from '@/src/components/ui/ReviewCard';
import Button from '@/components/Button';
import { Ionicons } from '@expo/vector-icons';
// Corrected import for default export
import useWhatsApp from '@/src/hooks/useWhatsApp';
import { Review } from '@/types'; // Import the Review type

export default function BusinessScreen() {
  const { theme } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { openWhatsApp } = useWhatsApp();

  // Use the correct hook name
  const { data: business } = useBusinessById(id);
  // Use the correct hook name
  const { data: reviews } = useReviewsForBusiness(id);

  if (!business) return <Text>Loading...</Text>;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ImageWithFallback
        uri={business.photos?.[0]}
        style={{ width: '100%', height: 250 }}
      />
      <View style={{ padding: theme.spacing.l }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={[theme.typography.h1, { color: theme.colors.text, flex: 1 }]}>{business.name}</Text>
          {/* Corrected size prop to be a number */}
          {business.verified && <VerifiedBadge size={24} />}
        </View>
        {/* Corrected typography to use 'body' instead of 'subtitle' */}
        <Text style={[theme.typography.body, { color: theme.colors.textSecondary, marginTop: 4 }]}>
          {business.address}, {business.city}
        </Text>
        <View style={{ marginVertical: theme.spacing.m }}>
          {/* Removed the unsupported 'count' prop from Rating */}
          <Rating rating={4} />
        </View>

        <View style={{ flexDirection: 'row', gap: theme.spacing.m }}>
          {business.phone && (
            // Removed the unsupported 'icon' prop from Button
            <Button
              title="Call"
              onPress={() => Linking.openURL(`tel:${business.phone}`)}
              style={{ flex: 1 }}
            />
          )}
          {business.whatsapp && (
             // Removed the unsupported 'icon' prop from Button
            <Button
              title="WhatsApp"
              onPress={() => openWhatsApp(business.whatsapp || '', 'Hello, I have a question.')}
              variant="secondary"
              style={{ flex: 1 }}
            />
          )}
        </View>

        <View style={{ marginTop: theme.spacing.xl }}>
          <Text style={[theme.typography.h3, { color: theme.colors.text, marginBottom: theme.spacing.m }]}>
            Reviews
          </Text>
          {/* Added the correct type for the 'review' parameter */}
          {reviews?.map((review: Review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          <Button
            title="Leave a Review"
            onPress={() => router.push(`/review/${id}`)}
            variant="outline"
            style={{ marginTop: theme.spacing.m }}
          />
        </View>
      </View>
    </ScrollView>
  );
}