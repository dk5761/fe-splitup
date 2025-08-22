// src/components/AppDropdown/AppDropdown.styles.ts

import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  // The main container that looks like an input
  triggerContainer: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
  },
  // Text for the placeholder or single selected item
  triggerText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
  },
  placeholderText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
  },
  // Container for multi-select chips
  chipsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
    overflow: "hidden",
  },
  // Individual chip for multi-select view
  chip: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radii.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  chipText: {
    color: theme.colors.primaryOn,
    fontWeight: theme.typography.weights.medium,
  },
  // The small "+2" overflow indicator chip
  overflowChip: {
    backgroundColor: theme.colors.border,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radii.sm,
  },
  overflowChipText: {
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.weights.medium,
  },
  separator: {
    padding: theme.spacing.xs,
  },
  listContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.lg, // Increased padding for a more spacious feel
    borderWidth: 1,
    padding: theme.spacing.md,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
  },
  listItemText: {
    flex: 1,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
    marginLeft: theme.spacing.md, // Add margin if there's a checkbox
  },
  // Style for the checkmark in single-select mode
  checkIcon: {
    color: theme.colors.primary, // Use the primary theme color
  },
}));
