import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import { Ionicons } from '@expo/vector-icons';

export default function ReviewScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please select a star rating before submitting.');
      return;
    }
    // TODO: Add logic to submit the review to the database
    Alert.alert('Thank You!', 'Your review has been submitted for moderation.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
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
      <Button title="Submit Review" variant="primary" onPress={handleSubmit} />
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