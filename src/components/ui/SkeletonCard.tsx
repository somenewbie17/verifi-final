import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '@/src/hooks/useTheme';
import Card from './Card';

// This is the animated shimmering bar that will move across the placeholders.
const Shimmer = () => {
  const shimmer = useSharedValue(-1);

  // This `useEffect` starts the animation when the component mounts.
  useEffect(() => {
    // `withRepeat` and `withTiming` create a smooth, looping animation.
    shimmer.value = withRepeat(
      withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1, // -1 means repeat infinitely
      true // `true` means the animation will reverse back and forth
    );
  }, []);

  // This animated style will move the shimmer from left to right.
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: shimmer.value * 400, // Move across a 400px width
      },
    ],
  }));

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.shimmer, animatedStyle]} />
  );
};

// This is the main SkeletonCard component.
export const SkeletonCard = () => {
  const { theme } = useTheme();
  return (
    <Card style={{ marginBottom: theme.spacing.m }}>
      <View style={[styles.imagePlaceholder, { backgroundColor: theme.colors.border }]} >
        <Shimmer />
      </View>
      <View style={[styles.textPlaceholder, { backgroundColor: theme.colors.border, width: '80%' }]} >
         <Shimmer />
      </View>
      <View style={[styles.textPlaceholder, { backgroundColor: theme.colors.border, width: '50%', marginTop: 8 }]} >
        <Shimmer />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  imagePlaceholder: {
    height: 120,
    width: '100%',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden', // This is important to contain the shimmer
  },
  textPlaceholder: {
    height: 20,
    borderRadius: 6,
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});