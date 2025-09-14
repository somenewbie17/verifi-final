import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import { Review } from '@/types';
import Card from '@/src/components/ui/Card';
import Rating from '@/src/components/ui/Rating';
import { formatDate } from '@/utils/formatDate';
import ImageWithFallback from './ImageWithFallback'; // Import the image component

const ReviewCard = ({ review }: { review: Review }) => {
  const { theme } = useTheme();
  const hasPhoto = review.photos && Array.isArray(review.photos) && review.photos.length > 0;

  return (
    <Card style={{ marginBottom: theme.spacing.m }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Rating rating={review.rating} />
        <Text style={[theme.typography.caption, { color: theme.colors.textSecondary }]}>
          {formatDate(review.created_at)}
        </Text>
      </View>
      {review.text ? (
        <Text style={[theme.typography.body, { color: theme.colors.text, marginTop: theme.spacing.s }]}>
          {review.text}
        </Text>
      ) : null}

      {/* This new block will display the image if it exists */}
      {hasPhoto && (
        <ImageWithFallback
          uri={review.photos[0]}
          style={{
            width: '100%',
            height: 200,
            borderRadius: theme.radii.m,
            marginTop: theme.spacing.m,
          }}
        />
      )}
    </Card>
  );
};

export default ReviewCard;