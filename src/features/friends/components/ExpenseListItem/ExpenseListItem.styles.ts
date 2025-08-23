import { StyleSheet } from "react-native-unistyles";

export const stylesheet = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  date: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  share: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
}));
