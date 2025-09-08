import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, Easing } from 'react-native-reanimated';
import { useTheme } from '@/src/hooks/useTheme'; // Corrected Path
import { Ionicons } from '@expo/vector-icons';

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export default function SplashScreen() {
  const { theme } = useTheme();
  
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);
  const checkScale = useSharedValue(0);
  
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
  
  const checkStyle = useAnimatedStyle(() => ({
      transform: [{ scale: checkScale.value }],
  }));

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.exp) });
    opacity.value = withTiming(1, { duration: 800 });
    checkScale.value = withDelay(500, withTiming(1, { duration: 500, easing: Easing.elastic(1.5) }));
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animated.View style={[styles.logoContainer, animatedStyle]}>
        <Text style={[styles.logoText, { color: theme.colors.text }]}>
          Verif<Text style={{ color: theme.colors.primary }}>i</Text>
        </Text>
        <AnimatedIcon 
          name="checkmark-circle" 
          size={28} 
          color={theme.colors.accent} 
          style={[styles.check, checkStyle]}
        />
      </Animated.View>
      <Animated.Text style={[styles.tagline, { color: theme.colors.textSecondary }, animatedStyle]}>
        The Check That Counts.
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 64,
    fontWeight: '800',
    letterSpacing: -2,
  },
  check: {
    position: 'absolute',
    right: -24,
    top: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
    letterSpacing: 0.5,
  },
});