import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  recipientContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.radii.lg,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: theme.spacing.md,
  },
  recipientName: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  recipientEmail: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  amountInput: {
    fontSize: 36,
    fontWeight: "bold",
    color: theme.colors.text,
    textAlign: "center",

    borderRadius: theme.radii.lg,
  },
  footer: {
    paddingVertical: theme.spacing.lg,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },
}));
