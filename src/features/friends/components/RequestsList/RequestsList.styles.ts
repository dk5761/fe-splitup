import { StyleSheet } from "react-native-unistyles";

export const stylesheet = StyleSheet.create((theme) => ({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
    borderRadius: theme.radii.pill,
    backgroundColor: theme.colors.surface,
  },
  tabWrapper: {
    flex: 1,
    margin: theme.spacing.xs,
  },
  tabPressable: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  tabTextActive: {
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.semibold,
  },
  tabTextInactive: {
    color: theme.colors.text,
  },
}));

export type RequestsListStyles = typeof stylesheet;
