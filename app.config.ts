import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
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
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: "com.verifi.gy",
    versionCode: 1,
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
  // This section is now updated with your real Project ID
  extra: {
    eas: {
      projectId: "20b289ca-0a48-4ae9-bb2d-616806b3ef50"
    }
  }
});