import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    // paddingHorizontal: theme.spacing.xl,
    backgroundColor: theme.colors.background,
    // borderBottomWidth: 1,
    // borderBottomColor: theme.colors.border,
  },
  iconContainer: {
    marginRight: theme.spacing.md,
  },
  titleText: {
    flex: 1,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
  },
}));
