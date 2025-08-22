import { StyleSheet } from "react-native-unistyles";

export const stylesheet = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.typography.sizes.h3,
    color: theme.colors.text,
    textAlign: "center",
    flex: 1,
  },
  backButton: {
    padding: theme.spacing.xs,
  },
}));
