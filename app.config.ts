import { ExpoConfig } from 'expo/config';
import 'dotenv/config'; // Ensures your .env variables are loaded

export default (): ExpoConfig => ({
  name: "Verifi",
  slug: "verifi-final",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  scheme: "verifi",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.verifi.gy",
    buildNumber: "1.0.0",
    infoPlist: {
      "ITSAppUsesNonExemptEncryption": false
    },
    // --- How It Works: iOS ---
    // This `config` block is the key. It tells Expo to inject your
    // Google Maps API key directly into the native iOS project files during the build process.
    // This is what fixes the "AirGoogleMaps dir must be added" error.
    config: {
      googleMapsApiKey: "AIzaSyAX-AZhqdp-llSQ5mIBAJPmkghObp8ali4"
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: "com.verifi.gy",
    versionCode: 1,
    // --- How It Works: Android ---
    // This block does the same thing for your Android app, ensuring Google Maps
    // will work correctly on both platforms.
    config: {
      googleMaps: {
        apiKey: process.env.MAPS_KEY_ANDROID
      }
    }
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  plugins: [
    "expo-dev-client",
    [
      "expo-location",
      {
        "locationAlwaysAndWhenInUsePermission": "Allow Verifi to use your location to find nearby businesses."
      }
    ]
  ],
  extra: {
    eas: {
      projectId: "20b289ca-0a48-4ae9-bb2d-616806b3ef50"
    }
  }
});