import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: theme.spacing.xl,
  },
  imagePicker: {
    width: "100%",
    height: 200,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderStyle: "dashed",
    marginTop: theme.spacing.lg,
  },
  imagePickerText: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
    fontSize: theme.typography.sizes.body,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  saveButtonWrapper: {
    position: "absolute",
    bottom: theme.spacing.xl,
    width: "100%",
    paddingHorizontal: theme.spacing.md,
  },
}));
