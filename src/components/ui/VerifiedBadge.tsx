import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/hooks/useTheme';

interface VerifiedBadgeProps {
  size?: number;
}

const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ size = 24 }) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container]}>
      <Ionicons 
        name="shield-checkmark" 
        size={size} 
        color={theme.colors.accent} 
        style={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  }
});

export default VerifiedBadge;