import { Redirect } from 'expo-router';

export default function Index() {
  // This is the correct syntax for the redirect.
  // The previous TypeScript error will be gone now that the root layout is fixed.
  return <Redirect href={ { pathname: '/(tabs)/home' } as any } />;
}