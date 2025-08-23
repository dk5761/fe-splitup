import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    marginBottom: theme.spacing.lg,
  },
  imageContainer: {
    width: "90%",
    height: 200,
    backgroundColor: theme.colors.surface,
    alignSelf: "center",
    borderRadius: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden",
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
