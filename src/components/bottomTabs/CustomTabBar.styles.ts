// src/components/CustomTabBar/CustomTabBar.styles.ts

import { StyleSheet } from "react-native-unistyles";

const CENTER_BUTTON_SIZE = 55;

export const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    height: 75,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.md,
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
