import { Platform } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export type AppBreakpoints = typeof breakpoints;

// Breakpoints for responsive design (in dp)
const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;

// Shared scales and tokens
const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

const radii = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  pill: 9999,
  round: 9999,
};

const elevations = {
  none: 0,
  s: 1,
  m: 3,
  l: 6,
  xl: 10,
};

const shadows = {
  s: {
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  m: {
    shadowColor: "#000000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  l: {
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  xl: {
    shadowColor: "#000000",
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 10,
  },
};

const zIndices = {
  base: 0,
  dropdown: 10,
  sticky: 50,
  modal: 100,
  toast: 1000,
};

const opacities = {
  disabled: 0.4,
  hover: 0.85,
  pressed: 0.7,
};

const typography = {
  // When using Expo Google Fonts, prefer explicit families below
  fontFamily: Platform.select({
    ios: "System",
    android: "Roboto",
    default: "System",
  })!,
  weights: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
  sizes: {
    h1: 24,
    h2: 20,
    h3: 18,
    body: 16,
    caption: 12,
    button: 16,
    label: 14,
  },
  lineHeights: {
    h1: 32,
    h2: 28,
    h3: 24,
    body: 22,
    caption: 16,
    button: 20,
    label: 16,
  },
  families: {
    regular: "Roboto_400Regular",
    medium: "Roboto_500Medium",
    semibold: "Roboto_500Medium",
    bold: "Roboto_700Bold",
  },
};

// Color palettes based on the design system
const palette = {
  // Brand Colors
  yellow: "#FDBA2D",

  // Neutral Colors
  white: "#FFFFFF",

  // Light Theme Neutrals
  gray50: "#F8F8F8", // background
  gray100: "#E5E7EB", // border
  gray500: "#6B7280", // textSecondary
  gray800: "#212121", // text / onSurface

  // Dark Theme Neutrals
  dark900: "#121212", // background
  dark800: "#1F1F1F", // surface
  dark700: "#4B5563", // border
  dark400: "#9CA3AF", // textSecondary
  dark100: "#E5E5E5", // text / onSurface

  // System Colors
  greenLight: "#16A34A",
  greenDark: "#22C55E",
  redLight: "#DC2626",
  redDark: "#EF4444",
};

const light = {
  colors: {
    primary: palette.yellow,
    primaryOn: palette.gray800,
    background: palette.gray50,
    surface: palette.white,
    onSurface: palette.gray800,
    text: palette.gray800,
    textSecondary: palette.gray500,
    border: palette.gray100,
    success: palette.greenLight,
    warning: palette.yellow, // Using primary yellow for warnings
    error: palette.redLight,
  },
  spacing,
  radii,
  elevations,
  shadows,
  zIndices,
  opacities,
  typography,
  components: {
    button: {
      height: 44,
      paddingHorizontal: spacing.lg,
      radius: radii.md,
    },
    card: {
      radius: radii.lg,
      padding: spacing.lg,
    },
    input: {
      height: 44,
      radius: radii.md,
      paddingHorizontal: spacing.md,
    },
    bottomSheet: {
      radius: radii.xl,
      backgroundColor: palette.white,
      handleColor: "#E5E5E5",
      headerBorderColor: palette.gray100,
      headerPadding: spacing.lg,
      contentPaddingHorizontal: spacing.lg,
      backdropOpacity: 0.5,
    },
  },
};

const dark = {
  colors: {
    primary: palette.yellow,
    primaryOn: palette.gray800,
    background: palette.dark900,
    surface: palette.dark800,
    onSurface: palette.dark100,
    text: palette.dark100,
    textSecondary: palette.dark400,
    border: palette.dark700,
    success: palette.greenDark,
    warning: palette.yellow, // Using primary yellow for warnings
    error: palette.redDark,
  },
  spacing,
  radii,
  elevations,
  shadows,
  zIndices,
  opacities,
  typography,
  components: {
    button: {
      height: 44,
      paddingHorizontal: spacing.lg,
      radius: radii.md,
    },
    card: {
      radius: radii.lg,
      padding: spacing.lg,
    },
    input: {
      height: 44,
      radius: radii.md,
      paddingHorizontal: spacing.md,
    },
    bottomSheet: {
      radius: radii.xl,
      backgroundColor: palette.dark800,
      handleColor: palette.dark700,
      headerBorderColor: palette.dark700,
      headerPadding: spacing.lg,
      contentPaddingHorizontal: spacing.lg,
      backdropOpacity: 0.6,
    },
  },
};

// Register themes and breakpoints once on app start
StyleSheet.configure({
  themes: { light, dark },
  breakpoints,
  settings: {
    initialTheme: "light", // Changed to light to match designs, can be changed back
  },
});

export type AppTheme = typeof light;
