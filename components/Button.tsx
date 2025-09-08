import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme'; // Corrected Path

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();
  
  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        };
      case 'secondary':
        return {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
        };
      case 'accent':
        return {
          backgroundColor: theme.colors.accent,
          borderColor: theme.colors.accent,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: theme.colors.primary,
        }
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return { color: theme.colors.white };
      case 'secondary':
        return { color: theme.colors.text };
      case 'accent':
        return { color: theme.colors.black };
      case 'outline':
        return { color: theme.colors.primary };
    }
  };

  const isDisabled = loading || disabled;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        getButtonStyles(),
        { opacity: isDisabled ? 0.6 : pressed ? 0.8 : 1 },
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      {loading ? (
        <ActivityIndicator color={getTextStyle().color} />
      ) : (
        <Text style={[styles.text, theme.typography.button, getTextStyle(), textStyle]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1.5,
    paddingHorizontal: 24,
  },
  text: {
    textAlign: 'center',
  },
});

export default Button;