// src/components/ui/CategoryBox.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

// This defines the props that the component accepts
type CategoryBoxProps = {
  category: string;
  iconName?: React.ComponentProps<typeof Ionicons>['name'];
};

// The component now correctly uses the defined props
export default function CategoryBox({ category, iconName = 'pricetag-outline' }: CategoryBoxProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { borderColor: theme.colors.border }]}>
      <Ionicons name={iconName} size={20} color={theme.colors.textSecondary} />
      <Text style={[styles.text, { color: theme.colors.textSecondary }]}>{category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    minWidth: 100,
  },
  text: {
    marginTop: 6,
    fontWeight: '600',
    fontSize: 12,
  },
});