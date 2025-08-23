import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    marginBottom: theme.spacing.lg,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: theme.colors.surface,
  },
  chipsContainer: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
}));
