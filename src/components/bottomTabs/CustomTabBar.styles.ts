// src/components/CustomTabBar/CustomTabBar.styles.ts

import { StyleSheet } from "react-native-unistyles";

const CENTER_BUTTON_SIZE = 55;

export const styles = StyleSheet.create((theme) => ({
  container: {
    // position: "absolute", // Remove absolute positioning
    // The 'bottom' value will now be set dynamically in the component

    backgroundColor: "transparent",

    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    height: 100,
    flexDirection: "row",
  },
  pillContainer: {
    flexDirection: "row",
    height: 70,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: theme.typography.weights.medium,
    variants: {
      active: {
        true: {
          color: theme.colors.primary,
        },
        default: {
          color: theme.colors.textSecondary,
        },
      },
    },
  },
  centerActionButton: {
    width: CENTER_BUTTON_SIZE,
    height: CENTER_BUTTON_SIZE,
    borderRadius: CENTER_BUTTON_SIZE / 2,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
}));
