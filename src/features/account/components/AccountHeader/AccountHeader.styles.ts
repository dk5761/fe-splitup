import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: theme.colors.background,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: theme.typography.sizes.h3,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  userEmail: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
  },
}));
