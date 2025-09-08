import { Linking, Alert } from 'react-native';
import { useCallback } from 'react';

const GUYANA_COUNTRY_CODE = '592';

const useWhatsApp = () => {
  const openWhatsApp = useCallback(async (phone: string, message?: string) => {
    // Basic cleanup: remove non-numeric characters from the phone number
    let formattedPhone = phone.replace(/[^0-9]/g, '');

    // If the number doesn't start with the country code, add it.
    if (!formattedPhone.startsWith(GUYANA_COUNTRY_CODE)) {
      formattedPhone = `${GUYANA_COUNTRY_CODE}${formattedPhone}`;
    }
    
    let url = `whatsapp://send?phone=${formattedPhone}`;
    if (message) {
      url += `&text=${encodeURIComponent(message)}`;
    }
    
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
        // TODO: This is where you could trigger a state change
        // to schedule a review prompt notification later.
      } else {
        Alert.alert('Error', 'WhatsApp is not installed on your device.');
      }
    } catch (error) {
      console.error('An error occurred while opening WhatsApp', error);
      Alert.alert('Error', 'Could not open WhatsApp.');
    }
  }, []);

  return { openWhatsApp };
};

export default useWhatsApp;