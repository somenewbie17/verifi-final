import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Business } from '@/types';
import { useTheme } from '@/src/hooks/useTheme';
import ImageWithFallback from './ImageWithFallback';
import VerifiedBadge from './VerifiedBadge';
import Rating from './Rating';
import Card from './Card';

const BusinessCard = ({ business }: { business: Business }) => {
  const { theme } = useTheme();
  const hasPhoto = business.photos && Array.isArray(business.photos) && business.photos.length > 0;

  return (
    <Link href={`/business/${business.id}`}>
      <Pressable>
        <Card style={{ marginBottom: theme.spacing.m }}>
          {hasPhoto && (
            <ImageWithFallback
              uri={business.photos[0]}
              style={{ width: '100%', height: 150, borderTopLeftRadius: theme.radii.m, borderTopRightRadius: theme.radii.m }}
            />
          )}
          <View style={{ padding: theme.spacing.m }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={[theme.typography.h3, { color: theme.colors.text, flex: 1 }]}>{business.name}</Text>
              {business.verified && <VerifiedBadge />}
            </View>
            <Text style={[theme.typography.caption, { color: theme.colors.textSecondary, marginTop: 4 }]}>
              {business.address}, {business.city}
            </Text>
            <View style={{ marginTop: theme.spacing.s }}>
              <Rating rating={4} />
            </View>
          </View>
        </Card>
      </Pressable>
    </Link>
  );
};

export default BusinessCard;