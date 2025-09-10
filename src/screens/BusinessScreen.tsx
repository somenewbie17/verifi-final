import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Linking,
  Alert,
  Share, // 1. Import the Share API
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useTheme } from '@/src/hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import VerifiedBadge from '@/src/components/ui/VerifiedBadge';
import useWhatsApp from '@/src/hooks/useWhatsApp';
import { useBusinessById } from '@/api/queries/businesses';
import Loading from '@/src/components/ui/Loading';
import ImageWithFallback from '@/src/components/ui/ImageWithFallback';

type BusinessScreenRouteProp =
  RouteProp<{ params: { businessId: string } }, 'params'>;

export default function BusinessScreen() {
  const { theme } = useTheme();
  const route = useRoute<BusinessScreenRouteProp>();
  const { openWhatsApp } = useWhatsApp();
  const { businessId } = route.params;
  const { data: business, isLoading, isError } = useBusinessById(businessId);

  const handleCallPress = () => {
    if (!business?.phone) return;
    // 2. We clean the phone number to remove any non-digit characters
    const phoneNumber = business.phone.replace(/[^0-9]/g, '');
    const phoneUrl = `tel:${phoneNumber}`;
    
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(phoneUrl);
        } else {
          Alert.alert('Error', 'Unable to make phone calls from this device.');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };
  
  const handleWhatsAppPress = () => {
    if (!business?.whatsapp) return;
    openWhatsApp(
      business.whatsapp,
      `Hi, I found ${business.name} on Verifi. I have a question.`
    );
  };
  
  // 3. This function handles the "Share" button press.
  const handleSharePress = async () => {
    if (!business) return;
    try {
      // It opens the native OS share dialog.
      await Share.share({
        message: `Check out ${business.name} on Verifi!`,
        // url: 'https://verifi.gy/business/123' // In the future, you'd add a deep link here
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share this business.');
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !business) {
    return (
      <View style={styles.centerContainer}>
        <Text style={{ color: theme.colors.text }}>
          Business not found or failed to load.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView>
        <View>
          <ImageWithFallback
            uri={business.photos[0]}
            style={styles.headerImage}
          />
          <View style={styles.headerOverlay} />

          <View style={styles.headerContent}>
            <Text style={[theme.typography.h1, styles.headerText]}>
              {business.name}
            </Text>
            {business.verified && <VerifiedBadge size={28} />}
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={[theme.typography.h3, { color: theme.colors.text }]}>
            About
          </Text>
          <Text
            style={[
              theme.typography.body,
              { color: theme.colors.textSecondary, marginTop: theme.spacing.s },
            ]}
          >
            {business.address}, {business.city}
          </Text>
        </View>
      </ScrollView>

      <SafeAreaView
        style={[
          styles.actionBar,
          {
            backgroundColor: theme.colors.card,
            borderTopColor: theme.colors.border,
          },
        ]}
        edges={['bottom']}
      >
        <Button
          title="Call"
          variant="secondary"
          onPress={handleCallPress}
          style={{ flex: 1 }}
        />
        <Button
          title="WhatsApp"
          variant="primary"
          onPress={handleWhatsAppPress}
          style={{ flex: 2, marginHorizontal: theme.spacing.m }}
        />
        <Button
          title="Share"
          variant="accent"
          onPress={handleSharePress} // 4. Hook up the new function
          style={{ flex: 1 }}
        />
      </SafeAreaView>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerImage: {
    width: width,
    height: 250,
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  headerContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    marginRight: 12,
  },
  contentContainer: {
    padding: 24,
  },
  actionBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});