// src/components/Checkbox/Checkbox.styles.ts

import { StyleSheet } from "react-native-unistyles";

const boxSize = 24;

export const styles = StyleSheet.create((theme) => ({
  // The main container for the checkbox and label
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  // The touchable box itself
  box: {
    width: boxSize,
    height: boxSize,
    borderRadius: theme.radii.sm,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",

    // V3 Variants control the checked/unchecked appearance
    variants: {
      checked: {
        true: {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        },
        false: {
          backgroundColor: "transparent",
          borderColor: theme.colors.primary,
        },
      },
    },
  },
  // The text part of the component
  labelContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Allows text to wrap to the next line
  },
  labelText: {
    fontSize: theme.typography.sizes.label,
    color: theme.colors.text,
  },
  linkText: {
    fontSize: theme.typography.sizes.label,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.semibold,
    textDecorationLine: "underline",
  },
}));
