import { Link, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerifyEmailScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>✉️</Text>
        <Text style={styles.title}>Check your inbox</Text>
        <Text style={styles.message}>
          We've sent a confirmation link to{' '}
          <Text style={styles.email}>{email}</Text>.
        </Text>
        <Text style={styles.subMessage}>
          Please click the link in that email to complete your registration.
        </Text>
        <Link href="/login" asChild>
           <Text style={styles.backLink}>Back to Login</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    fontSize: 64,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#555',
    lineHeight: 24,
  },
  subMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#555',
    lineHeight: 24,
  },
  email: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
  backLink: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: '600',
  },
});