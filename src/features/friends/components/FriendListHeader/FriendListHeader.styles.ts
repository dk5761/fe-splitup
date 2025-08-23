import { StyleSheet } from "react-native-unistyles";

export const stylesheet = StyleSheet.create((theme) => ({
  tabs: {
    flexDirection: "row",
    marginVertical: 16,
    backgroundColor: theme.colors.border,
    borderRadius: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: theme.colors.primary,
  },
  activeTabText: {
    color: theme.colors.primaryOn,
    fontWeight: "bold",
  },
}));
