// src/components/AppBottomSheet/AppBottomSheet.styles.ts

import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  background: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.xl,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.border,
    alignSelf: "center",
    marginTop: theme.spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    minHeight: 56,
    marginBottom: theme.spacing.md,
  },
  headerTitle: {
    fontSize: theme.typography.sizes.h2,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    variants: {
      variant: {
        destructive: { color: theme.colors.error },
        default: {},
      },
    },
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
  },
}));
