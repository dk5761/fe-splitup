import { StyleSheet } from "react-native-unistyles";

export const stylesheet = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    position: "relative",
  },
  title: {
    fontSize: theme.typography.sizes.h1,
    color: theme.colors.text,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  backButton: {
    // backgroundColor: "red",
    position: "absolute",
    left: 10,
    zIndex: 100,
  },
}));
