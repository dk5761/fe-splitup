import { StyleSheet } from "react-native-unistyles";

export const stylesheet = StyleSheet.create((theme) => ({
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userEmail: {
    color: theme.colors.textSecondary,
  },
  addButton: {
    paddingHorizontal: 12,
  },
}));
