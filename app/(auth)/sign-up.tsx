import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useAuth } from '@/api/auth';
import { useTheme } from '@/src/hooks/useTheme';
import Button from '@/components/Button';
import { useRoute, RouteProp } from '@react-navigation/native';
import { UserRole } from '@/types';

type SignUpScreenRouteProp = RouteProp<{ params: { role: UserRole } }, 'params'>;

export default function SignUpScreen() {
  const { theme } = useTheme();
  const { signUp } = useAuth();
  const route = useRoute<SignUpScreenRouteProp>();
  const { role } = route.params;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, role);
    if (error) {
      Alert.alert('Sign Up Failed', error.message);
    } else {
      Alert.alert('Success!', 'Please check your email to confirm your account.');
    }
    setLoading(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Create {role === 'owner' ? 'Business' : 'Consumer'} Account</Text>
        <TextInput
          style={[styles.input, { 
            backgroundColor: theme.colors.card, 
            color: theme.colors.text, 
            borderColor: theme.colors.border 
          }]}
          placeholder="Email Address"
          placeholderTextColor={theme.colors.textSecondary}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, { 
            backgroundColor: theme.colors.card, 
            color: theme.colors.text, 
            borderColor: theme.colors.border 
          }]}
          placeholder="Password"
          placeholderTextColor={theme.colors.textSecondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          title="Create Account"
          onPress={handleSignUp}
          variant="primary"
          loading={loading}
          style={{ marginTop: theme.spacing.l }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 16,
  },
});