import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/src/lib/supabaseClient';
import { useAppStore } from '@/src/lib/store';

export default function RoleSelectionScreen() {
  const router = useRouter();
  const setRole = useAppStore((state) => state.setRole);

  const handleSelectRole = async (role: 'customer' | 'business') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Update the 'profiles' table with the selected role
      const { error } = await supabase
        .from('profiles')
        .update({ role: role })
        .eq('id', user.id);

      if (error) throw error;

      // Update the role in our app's state
      setRole(role);

      // Navigate to the correct part of the app
      if (role === 'business') {
        router.replace('/(tabs)/dashboard');
      } else {
        router.replace('/(tabs)/home');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not save your role. Please try again.');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>How will you use Verifi?</Text>
        <Text style={styles.subtitle}>Choose your role to get started.</Text>

        <TouchableOpacity style={styles.card} onPress={() => handleSelectRole('customer')}>
          <Ionicons name="people-outline" size={40} color="#007AFF" />
          <Text style={styles.cardTitle}>I'm a Customer</Text>
          <Text style={styles.cardDescription}>
            Discover and review local businesses
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => handleSelectRole('business')}>
          <Ionicons name="business-outline" size={40} color="#34C759" />
          <Text style={styles.cardTitle}>I'm a Business</Text>
          <Text style={styles.cardDescription}>
            Manage your profile and connect with customers
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#A0A0A0',
    textAlign: 'center',
    marginBottom: 48,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2C2C2C',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
  },
  cardDescription: {
    fontSize: 16,
    color: '#A0A0A0',
    textAlign: 'center',
    marginTop: 8,
  },
});