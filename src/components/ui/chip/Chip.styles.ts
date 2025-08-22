// src/components/Chip/Chip.styles.ts
// NO CODE CHANGES NEEDED - The theme handles it automatically.

import { StyleSheet, UnistylesVariants } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radii.pill,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40,
    borderWidth: 1,
    borderColor: theme.colors.border,

    variants: {
      selected: {
        true: {
          backgroundColor: theme.colors.primary,
        },
        // In LIGHT mode, theme.colors.border is light gray.
        // In DARK mode, it's a darker gray.
        default: {
          backgroundColor: "transparent",
          borderWidth: 1.5,
          borderColor: theme.colors.border,
        },
      },
      size: {
        small: {
          minHeight: 36,
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.md,
        },
        default: {},
      },
    },
  },
  text: {
    fontSize: theme.typography.sizes.label,
    fontWeight: theme.typography.weights.semibold,

    variants: {
      selected: {
        true: {
          color: theme.colors.primaryOn,
        },
        false: {
          color: theme.colors.text,
        },
        // In LIGHT mode, theme.colors.textSecondary is a medium gray.
        // In DARK mode, it's a light gray.
        default: {
          color: theme.colors.textSecondary,
        },
      },
    },
  },
  icon: {
    marginLeft: theme.spacing.sm,
  },
}));

export type ChipVariants = UnistylesVariants<typeof styles>;
