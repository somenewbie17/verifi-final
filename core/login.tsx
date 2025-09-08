import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '@/api/auth';
import { useTheme } from '@/src/hooks/useTheme'; // Corrected Path
import Button from '@/components/Button';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const { theme } = useTheme();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    setLoading(true);
    const { error } = await login(email, password);
    if (error) {
      Alert.alert('Login Failed', error.message);
    }
    // Note: If login is successful, the RootNavigator will automatically
    // switch to the main app view. We don't need to navigate here.
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <Ionicons name="shield-checkmark" size={64} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>Welcome to Verifi</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          The Check That Counts.
        </Text>

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
          title="Login"
          onPress={handleLogin}
          variant="primary"
          loading={loading}
          style={{ marginTop: theme.spacing.l }}
        />
        <Pressable onPress={() => { /* TODO: Forgot Password Flow */ }}>
          <Text style={[styles.link, { color: theme.colors.accent, marginTop: theme.spacing.m }]}>
            Forgot Password?
          </Text>
        </Pressable>
        <Pressable onPress={() => { /* TODO: Sign Up Flow */ }}>
          <Text style={[styles.link, { color: theme.colors.textSecondary, marginTop: theme.spacing.xl }]}>
            Don't have an account? <Text style={{color: theme.colors.primary, fontWeight: 'bold'}}>Sign Up</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
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
  link: {
    fontSize: 14,
    fontWeight: '500',
  },
});