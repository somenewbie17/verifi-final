import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import { Review } from '@/types';
import Card from '@/src/components/ui/Card';
import Rating from '@/src/components/ui/Rating';
import { formatDate } from '@/utils/formatDate';
import ImageWithFallback from './ImageWithFallback';

const ReviewCard = ({ review }: { review: Review }) => {
  const { theme } = useTheme();
  // This check now works perfectly with our updated Review type
  const hasPhoto = review.photos && review.photos.length > 0;

  return (
    <Card style={{ marginBottom: theme.spacing.m }}>
      <View style={styles.header}>
        <Rating rating={review.rating} />
        <Text style={[theme.typography.caption, { color: theme.colors.textSecondary }]}>
          {formatDate(review.created_at)}
        </Text>
      </View>
      {review.text && (
        <Text style={[theme.typography.body, styles.reviewText]}>
          {review.text}
        </Text>
      )}

      {/* If a photo exists, we can now safely access review.photos[0] */}
      {hasPhoto && (
        <ImageWithFallback
          uri={review.photos[0]}
          style={[styles.reviewImage, { borderRadius: theme.radii.m }]}
        />
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewText: {
    marginTop: 8,
  },
  reviewImage: {
    width: '100%',
    height: 200,
    marginTop: 12,
  },
});

export default ReviewCard;