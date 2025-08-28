import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    justifyContent: "space-between",
  },
  saveButtonWrapper: {
    marginTop: theme.spacing.xl,
  },
}));
