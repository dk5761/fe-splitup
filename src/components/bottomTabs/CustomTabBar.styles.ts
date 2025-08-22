// src/components/CustomTabBar/CustomTabBar.styles.ts
// NO CHANGES NEEDED HERE

import { StyleSheet } from "react-native-unistyles";

const CENTER_BUTTON_SIZE = 55;

export const styles = StyleSheet.create((theme) => ({
  container: {
    position: "absolute",
    // The 'bottom' value will now be set dynamically in the component
    left: 20,
    right: 20,
    paddingBottom: 10,
    backgroundColor: "transparent",
  },
  pillContainer: {
    flexDirection: "row",
    height: 70,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    ...theme.shadows.s,
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
