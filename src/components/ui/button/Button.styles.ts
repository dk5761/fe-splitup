// src/components/Button/Button.styles.ts

import { StyleSheet, UnistylesVariants } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    height: 52,
    borderRadius: theme.radii.pill,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,

    // V3: Variants are defined directly inside the style object
    variants: {
      variant: {
        primary: {
          backgroundColor: theme.colors.primary,
        },
        secondary: {
          backgroundColor: theme.colors.secondary,
        },
        destructive: {
          backgroundColor: "red",
        },
        outline: {
          backgroundColor: "transparent",
          borderWidth: 1.5,
          borderColor: theme.colors.primary,
        },
        social: {
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        ghost: {
          height: "auto",
          paddingHorizontal: 0,
          paddingVertical: theme.spacing.xs,
          backgroundColor: "transparent",
        },
      },
      disabled: {
        true: {
          opacity: theme.opacities.disabled,
        },
      },
    },
  },
  text: {
    fontSize: theme.typography.sizes.button,
    fontWeight: theme.typography.weights.semibold,

    // V3: Text styles can have their own variants that respond to the same props
    variants: {
      variant: {
        primary: {
          color: theme.colors.primaryOn,
        },
        secondary: {
          color: theme.colors.secondaryOn,
        },
        destructive: {
          color: theme.colors.primaryOn,
        },
        outline: {
          color: theme.colors.primaryOn,
        },
        social: {
          color: theme.colors.text,
          fontWeight: theme.typography.weights.medium,
        },
        ghost: {
          color: theme.colors.primary,
          fontWeight: theme.typography.weights.medium,
        },
      },
    },
  },
  iconContainer: {
    marginRight: theme.spacing.md,
  },
}));

// V3: Use the UnistylesVariants helper to infer props from the stylesheet
export type ButtonVariants = UnistylesVariants<typeof styles>;
