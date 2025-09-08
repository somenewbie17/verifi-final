import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/hooks/useTheme';

interface RatingProps {
  rating: number;
  size?: number;
}

const Rating: React.FC<RatingProps> = ({ rating, size = 16 }) => {
  const { theme } = useTheme();
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  return (
    <View style={styles.container}>
      {[...Array(totalStars)].map((_, index) => {
        const starNumber = index + 1;
        let iconName: 'star' | 'star-half-sharp' | 'star-outline' = 'star-outline';

        if (starNumber <= fullStars) {
          iconName = 'star';
        } else if (halfStar && starNumber === fullStars + 1) {
          iconName = 'star-half-sharp';
        }

        return (
          <Ionicons
            key={starNumber}
            name={iconName}
            size={size}
            color={theme.colors.accent}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default Rating;