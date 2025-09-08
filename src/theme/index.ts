import { TextStyle } from 'react-native';

const palette = {
  primaryGreen: '#1E8B57',
  accentGold: '#E6C642',
  black: '#000000',
  white: '#FFFFFF',
  grey1: '#F4F4F5', // Light background
  grey2: '#E4E4E7', // Light border
  grey3: '#A1A1AA', // Secondary text
  grey4: '#52525B', // Darker secondary text / borders
  grey5: '#27272A', // Dark card
  grey6: '#18181B', // Dark background
};

const commonTokens = {
  spacing: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    xxl: 32,
  },
  radii: {
    s: 6,
    m: 12,
    l: 18,
    round: 999,
  },
  shadows: {
    soft: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 5,
      elevation: 2,
    },
    medium: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 10,
      elevation: 5,
    },
  },
  typography: {
    h1: { fontSize: 32, fontWeight: '800' } as TextStyle,
    h2: { fontSize: 24, fontWeight: '700' } as TextStyle,
    h3: { fontSize: 20, fontWeight: '600' } as TextStyle,
    body: { fontSize: 16, fontWeight: '400' } as TextStyle,
    bodyBold: { fontSize: 16, fontWeight: '600' } as TextStyle,
    caption: { fontSize: 12, fontWeight: '500' } as TextStyle,
    button: { fontSize: 16, fontWeight: '700' } as TextStyle,
  },
};

export const lightTheme = {
  ...commonTokens,
  dark: false,
  colors: {
    primary: palette.primaryGreen,
    accent: palette.accentGold,
    background: palette.grey1,
    card: palette.white,
    text: palette.black,
    textSecondary: palette.grey4,
    border: palette.grey2,
    notification: palette.accentGold,
    // Add generic colors
    white: palette.white,
    black: palette.black,
    // Navigation theme compatibility
    card_bg: palette.white,
    primary_text: palette.primaryGreen,
    text_nav: palette.black,
    background_nav: palette.grey1,
    border_nav: palette.grey2,
  },
};

export const darkTheme = {
  ...commonTokens,
  dark: true,
  colors: {
    primary: palette.primaryGreen,
    accent: palette.accentGold,
    background: palette.grey6,
    card: palette.grey5,
    text: palette.white,
    textSecondary: palette.grey3,
    border: palette.grey4,
    notification: palette.accentGold,
    // Add generic colors
    white: palette.white,
    black: palette.black,
    // Navigation theme compatibility
    card_bg: palette.grey5,
    primary_text: palette.primaryGreen,
    text_nav: palette.white,
    background_nav: palette.grey6,
    border_nav: palette.grey4,
  },
};

export type Theme = typeof lightTheme;