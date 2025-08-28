import { StyleSheet } from "react-native-unistyles";

export const stylesheet = StyleSheet.create((theme) => ({
  dropdownTrigger: {
    padding: theme.spacing.md,

    borderRadius: theme.radii.sm,
    minHeight: 50,
    justifyContent: "center",
  },
  dropdownTriggerText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
  },
  dropdownItem: {
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.sm,
  },
  dropdownItemText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
  },
  dropdownItemTextUsername: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  dropdownItemTextContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: theme.spacing.sm,
    flex: 1,
  },
}));
