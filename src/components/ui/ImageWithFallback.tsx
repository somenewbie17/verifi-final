import React, { useState, useEffect } from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet } from 'react-native';

// Local asset for the fallback image
const placeholder = require('@/assets/icon.png');

type ImageWithFallbackProps = {
  uri: string | null | undefined;
  // THIS IS THE FIX: Use StyleProp<ImageStyle> to allow style arrays
  style: StyleProp<ImageStyle>;
};

export default function ImageWithFallback({ uri, style }: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState<any>(placeholder);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset error state when URI changes
    setHasError(false);
  }, [uri]);

  const handleError = () => {
    if (!hasError) {
      setImageSrc(placeholder);
      setHasError(true);
    }
  };

  return (
    <Image
      source={hasError || !uri ? placeholder : { uri }}
      style={style}
      onError={handleError}
    />
  );
}