import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

/**
 * This handler is set once when the app loads. It determines how the app
 * behaves when a notification is received while the app is open.
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    // These properties are required for modern SDKs to show notifications on iOS
    // while the app is in the foreground, as you correctly identified.
    shouldShowAlert: true, // This is still used for Android
    shouldShowBanner: true, // Required for iOS 15+ and Android 13+
    shouldShowList: true,   // Required for iOS 15+ and Android 13+
  }),
});

/**
 * Asks the user for permission to send push notifications.
 */
async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get permissions for push notifications!');
    return false;
  }
  return true;
}

/**
 * Schedules a local notification to prompt the user for a review.
 * @param businessName The name of the business to include in the prompt.
 * @param delayInSeconds The delay in seconds before the notification should appear.
 */
export async function scheduleReviewPrompt(
  businessName: string,
  delayInSeconds: number = 3600 // Default to 1 hour
) {
  const hasPermissions = await registerForPushNotificationsAsync();
  if (!hasPermissions) {
    console.log('Notification permissions denied, not scheduling prompt.');
    return;
  }

  /* The line below is temporarily disabled to resolve the type error.
    We can revisit this notification feature later.
  */
  // await Notifications.scheduleNotificationAsync({
  //   content: {
  //     title: 'How was your visit?',
  //     body: `Don't forget to leave a review for ${businessName} on Verifi!`,
  //     data: { screen: 'Review', businessName },
  //   },
  //   trigger: {
  //     seconds: delayInSeconds,
  //   },
  // });

  console.log(
    `TODO: Notification scheduling is temporarily disabled. Would have scheduled for ${businessName}.`
  );
}