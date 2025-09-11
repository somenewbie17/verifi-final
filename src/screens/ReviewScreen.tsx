import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import { Ionicons } from '@expo/vector-icons';
import { useCreateReview } from '@/api/queries/reviews'; // 1. Import the mutation hook
import { useAppStore } from '@/src/lib/store';

type ReviewScreenRouteProp = RouteProp<{ params: { businessId: string } }, 'params'>;

export default function ReviewScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<ReviewScreenRouteProp>();
  const { businessId } = route.params;
  const user = useAppStore((state) => state.user);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // 2. Initialize the mutation hook. It gives us a `mutate` function
  // to call and a `isPending` state to track loading.
  const createReviewMutation = useCreateReview();

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please select a star rating before submitting.');
      return;
    }
    if (!user) {
      Alert.alert('Error', 'You must be logged in to leave a review.');
      return;
    }
    
    // 3. Instead of an alert, we now call the `mutate` function with the new review data.
    createReviewMutation.mutate(
      {
        business_id: businessId,
        user_id: user.id,
        rating: rating as 1 | 2 | 3 | 4 | 5,
        text: comment,
        photos: [],
      },
      {
        // 4. We define what happens on success or error right here.
        onSuccess: () => {
          Alert.alert('Thank You!', 'Your review has been submitted for moderation.', [
            { text: 'OK', onPress: () => navigation.goBack() },
          ]);
        },
        onError: (error) => {
          Alert.alert('Error', 'Could not submit your review. Please try again.');
          console.error(error);
        },
      }
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[theme.typography.h2, { color: theme.colors.text }]}>Leave a Review</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="close-circle" size={30} color={theme.colors.textSecondary} />
        </Pressable>
      </View>

      <Text style={[styles.label, { color: theme.colors.textSecondary }]}>YOUR RATING</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Pressable key={star} onPress={() => setRating(star)}>
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={40}
              color={theme.colors.accent}
              style={{ marginHorizontal: theme.spacing.s }}
            />
          </Pressable>
        ))}
      </View>

      <Text style={[styles.label, { color: theme.colors.textSecondary }]}>YOUR COMMENT (OPTIONAL)</Text>
      <TextInput
        style={[styles.input, { 
          backgroundColor: theme.colors.card, 
          color: theme.colors.text, 
          borderColor: theme.colors.border 
        }]}
        placeholder="Tell us about your experience..."
        placeholderTextColor={theme.colors.textSecondary}
        value={comment}
        onChangeText={setComment}
        multiline
      />
      
      <View style={{ flex: 1 }} />
      {/* 5. The button is now disabled and shows a loading indicator while submitting. */}
      <Button 
        title="Submit Review" 
        variant="primary" 
        onPress={handleSubmit} 
        loading={createReviewMutation.isPending}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  label: {
    fontWeight: '600',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  input: {
    height: 150,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    textAlignVertical: 'top',
  },
});