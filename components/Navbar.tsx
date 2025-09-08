import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface NavbarProps {
  title: string;
  canGoBack?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ title, canGoBack = false }) => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <SafeAreaView 
      edges={['top']} 
      style={[styles.safeArea, { backgroundColor: theme.colors.card }]}
    >
      <View style={[styles.container, { borderBottomColor: theme.colors.border }]}>
        {canGoBack && (
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color={theme.colors.primary} />
          </Pressable>
        )}
        <Text style={[theme.typography.h3, styles.title, { color: theme.colors.text }]}>
          {title}
        </Text>
        <View style={styles.rightAction} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  title: {
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  rightAction: {
    width: 28, // to balance the back button
  },
});

export default Navbar;