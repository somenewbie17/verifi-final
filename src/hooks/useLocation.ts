import { useState, useEffect } from 'react';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  Accuracy,
} from 'expo-location';

export const useLocation = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      try {
        const currentLocation = await getCurrentPositionAsync({
          accuracy: Accuracy.Balanced,
        });
        setLocation(currentLocation);
      } catch (error) {
        setErrorMsg('Could not fetch location');
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { location, errorMsg, loading };
};