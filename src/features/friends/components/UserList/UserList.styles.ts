import { StyleSheet } from "react-native-unistyles";

export const stylesheet = StyleSheet.create((theme) => ({
  resultsContainer: {
    marginTop: 20,
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    color: theme.colors.textSecondary,
  },
}));
