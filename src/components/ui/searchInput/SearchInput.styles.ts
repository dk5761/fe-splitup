// src/components/SearchInput/SearchInput.styles.ts

import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    borderWidth: 1.5,
    borderColor: "transparent", // Default border
    paddingHorizontal: theme.spacing.md,

    variants: {
      focused: {
        true: {
          borderColor: theme.colors.primary,
        },
      },
    },
  },
  input: {
    flex: 1,
    height: "100%",
    color: theme.colors.text,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.regular,
    marginLeft: theme.spacing.sm,
  },
  icon: {
    // Used for both search and clear icons
  },
  clearButton: {
    padding: theme.spacing.xs, // Makes the touch target larger
  },
}));
