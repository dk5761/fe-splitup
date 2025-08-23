import { StyleSheet } from "react-native-unistyles";

export const stylesheet = StyleSheet.create((theme) => ({
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  friendInfo: {
    marginLeft: 16,
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  friendEmail: {
    color: theme.colors.textSecondary,
  },
}));
