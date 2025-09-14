import React from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/src/hooks/useTheme';
import { useBusinessById } from '@/api/queries/businesses';
import { useReviewsForBusiness } from '@/api/queries/reviews';
import ImageWithFallback from '@/src/components/ui/ImageWithFallback';
import VerifiedBadge from '@/src/components/ui/VerifiedBadge';
import Rating from '@/src/components/ui/Rating';
import ReviewCard from '@/src/components/ui/ReviewCard';
import Button from '@/components/Button';
import { Ionicons } from '@expo/vector-icons';
import useWhatsApp from '@/src/hooks/useWhatsApp';
import { Review } from '@/types';

export default function BusinessScreen() {
  const { theme } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { openWhatsApp } = useWhatsApp();

  const { data: business } = useBusinessById(id);
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
          {business.verified && <VerifiedBadge size={24} />}
        </View>
        <Text style={[theme.typography.body, { color: theme.colors.textSecondary, marginTop: 4 }]}>
          {business.address}, {business.city}
        </Text>
        <View style={{ marginVertical: theme.spacing.m }}>
          <Rating rating={4} />
        </View>

        <View style={{ flexDirection: 'row', gap: theme.spacing.m }}>
          {business.phone && (
            <Button
              title="Call"
              onPress={() => Linking.openURL(`tel:${business.phone}`)}
              style={{ flex: 1 }}
            />
          )}
          {business.whatsapp && (
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