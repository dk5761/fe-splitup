// src/components/Input/Input.styles.ts

import { StyleSheet, UnistylesVariants } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    width: "100%",
  },
  label: {
    fontFamily: theme.typography.families.medium,
    fontSize: theme.typography.sizes.label,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
    marginLeft: theme.spacing.xs,
  },
  container: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    borderWidth: 1.5,
    borderColor: "transparent", // Default border is transparent
    paddingHorizontal: theme.spacing.md,

    variants: {
      focused: {
        true: {
          borderColor: theme.colors.primary,
          // You could add a subtle shadow on focus if desired
          // ...theme.shadows.s,
        },
      },
      error: {
        true: {
          borderColor: theme.colors.error,
        },
      },
      disabled: {
        true: {
          backgroundColor: theme.colors.border,
          opacity: 0.6,
        },
      },
    },
  },
  input: {
    flex: 1,
    height: "100%",
    color: theme.colors.text,
    fontSize: theme.typography.sizes.body,
    fontFamily: theme.typography.families.regular,
  },
  icon: {
    marginHorizontal: theme.spacing.sm,
  },
}));

// Export the inferred variant types
export type InputVariants = UnistylesVariants<typeof styles>;
