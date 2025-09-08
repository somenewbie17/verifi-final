import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';

const PromoBadge = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.accent }]}>
      <Text style={[theme.typography.caption, styles.text, { color: theme.colors.black }]}>
        DEAL
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  text: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default PromoBadge;