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

// Color palettes
const palette = {
  primary: "#2196F3", // Blue
  secondary: "#FFC107", // Amber
  background: "#F5F5F5", // Light Gray
  surface: "#EEEEEE", // Very Light Gray
  onSurface: "#212121", // Dark Gray
  textSecondary: "#757575", // Medium Gray
  white: "#FFFFFF",
  black: "#000000",
  success: "#2E7D32",
  warning: "#ED6C02",
  error: "#D32F2F",
  info: "#0288D1",
};

const light = {
  colors: {
    primary: palette.primary,
    primaryOn: palette.white,
    secondary: palette.secondary,
    secondaryOn: palette.black,
    background: palette.background,
    surface: palette.surface,
    onSurface: palette.onSurface,
    text: palette.onSurface,
    textSecondary: palette.textSecondary,
    border: "#E0E0E0",
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    info: palette.info,
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
      headerBorderColor: "#E0E0E0",
      headerPadding: spacing.lg,
      contentPaddingHorizontal: spacing.lg,
      backdropOpacity: 0.5,
    },
  },
};

const dark = {
  colors: {
    primary: palette.primary,
    primaryOn: palette.white,
    secondary: palette.secondary,
    secondaryOn: palette.black,
    background: "#121212",
    surface: "#1E1E1E",
    onSurface: "#E0E0E0",
    text: "#E0E0E0",
    textSecondary: "#B0B0B0",
    border: "#2A2A2A",
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#EF5350",
    info: "#29B6F6",
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
      backgroundColor: "#1E1E1E",
      handleColor: "#3A3A3A",
      headerBorderColor: "#2A2A2A",
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
    initialTheme: "dark",
  },
});

export type AppTheme = typeof light;
