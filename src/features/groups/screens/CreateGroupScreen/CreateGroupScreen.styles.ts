import { StyleSheet } from "react-native-unistyles";

export const stylesheet = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  form: {
    gap: theme.spacing.lg,
  },
  imagePicker: {
    height: 150,
    borderRadius: theme.radii.lg,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderStyle: "dashed",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: theme.radii.lg,
  },
  imagePickerText: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  footer: {
    paddingVertical: theme.spacing.lg,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
}));
