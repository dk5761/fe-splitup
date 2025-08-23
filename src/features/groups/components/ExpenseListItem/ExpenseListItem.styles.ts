import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  detailsContainer: {
    flex: 1,
  },
  description: {
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.text,
  },
  paidBy: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
  },
  date: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
}));
