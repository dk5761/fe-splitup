// src/components/StatsCard/StatsCard.styles.ts

import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.surface, // Will be white in light mode
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    gap: theme.spacing.xs,
    flexBasis: "48%",

    // ADD THIS: Apply a subtle shadow from the theme
    ...theme.shadows.s,
  },
  title: {
    fontSize: theme.typography.sizes.label,
    color: theme.colors.textSecondary, // Medium gray in light mode
    fontWeight: theme.typography.weights.medium,
  },
  value: {
    fontSize: theme.typography.sizes.h1,
    color: theme.colors.text, // Dark gray in light mode
    fontWeight: theme.typography.weights.bold,
  },
}));
