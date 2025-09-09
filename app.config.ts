import { ExpoConfig } from 'expo/config';
import 'dotenv/config'; // Make sure this is imported

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
    // Using the secure environment variable
    config: {
      googleMapsApiKey: process.env.MAPS_KEY_IOS
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: "com.verifi.gy",
    versionCode: 1,
    // Using the secure environment variable
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