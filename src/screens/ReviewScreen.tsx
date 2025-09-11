import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert, Image } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import { Ionicons } from '@expo/vector-icons';
import { useCreateReview } from '@/api/queries/reviews';
import { useAppStore } from '@/src/lib/store';
import * as ImagePicker from 'expo-image-picker';
import { storageRepo } from '@/api/repositories/storage.repo';
import { Database } from '@/types/supabase';

type ReviewInsert = Database['public']['Tables']['reviews']['Insert'];

type ReviewScreenRouteProp = RouteProp<{ params: { businessId: string } }, 'params'>;

export default function ReviewScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<ReviewScreenRouteProp>();
  const { businessId } = route.params;
  const user = useAppStore((state) => state.user);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const createReviewMutation = useCreateReview();

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (rating === 0 || !user) {
      return Alert.alert('Error', 'Please provide a rating and be logged in.');
    }

    let photoUrl: string | null = null;
    if (imageUri) {
      photoUrl = await storageRepo.uploadReviewImage(imageUri, user.id);
    }
    
    const newReview: ReviewInsert = {
      business_id: businessId,
      user_id: user.id,
      rating: rating,
      text: comment || null,
      photos: photoUrl ? [photoUrl] : [],
    };

    createReviewMutation.mutate(newReview, {
      onSuccess: () => {
        Alert.alert('Thank You!', 'Your review has been submitted.', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      },
      onError: (e) => {
        console.error(e);
        Alert.alert('Error', 'Could not submit your review.');
      },
    });
  }; // <-- This closing brace was missing

  // --- THIS ENTIRE RETURN STATEMENT WAS MISSING ---
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

      {/* UI for Image Picking */}
      <Button title="Add Photo" onPress={handlePickImage} variant="secondary" style={{ marginTop: 16 }} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}
      
      <View style={{ flex: 1 }} />
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
  container: { flex: 1, padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  label: { fontWeight: '600', marginBottom: 12 },
  starsContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 32 },
  input: { height: 150, borderWidth: 1, borderRadius: 12, padding: 16, fontSize: 16, textAlignVertical: 'top' },
  imagePreview: { width: 100, height: 100, borderRadius: 8, marginTop: 16, alignSelf: 'center' },
});