import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';

interface ChipProps {
  label: string;
  onPress?: () => void;
  selected?: boolean;
}

const Chip: React.FC<ChipProps> = ({ label, onPress, selected = false }) => {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: selected ? theme.colors.primary : theme.colors.card,
          borderColor: selected ? theme.colors.primary : theme.colors.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Text
        style={[
          theme.typography.caption,
          styles.label,
          { color: selected ? theme.colors.white : theme.colors.text },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999, // Pill shape
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '600',
  },
});

export default Chip;