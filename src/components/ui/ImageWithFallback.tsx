import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image, ImageStyle } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/hooks/useTheme';

interface ImageWithFallbackProps {
  uri: string | undefined | null;
  style: ImageStyle;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ uri, style }) => {
  const { theme } = useTheme();
  const [hasError, setHasError] = useState(false);

  const onError = () => {
    setHasError(true);
  };

  if (hasError || !uri) {
    return (
      <View style={[styles.fallbackContainer, style, { backgroundColor: theme.colors.border }]}>
        <Ionicons name="image-outline" size={32} color={theme.colors.textSecondary} />
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={style}
      contentFit="cover"
      transition={300}
      onError={onError}
    />
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageWithFallback;