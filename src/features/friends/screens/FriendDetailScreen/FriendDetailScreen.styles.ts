import { StyleSheet } from "react-native-unistyles";

export const stylesheet = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
    alignItems: "center",
  },
  infoContainer: {
    flexDirection: "column",
    gap: 4,
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  email: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginTop: 8,
  },
  accountType: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  deleteButton: {
    minWidth: 170,
    borderColor: theme.colors.error,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  actionButtonsContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  bottomSheetContent: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 40,
    alignItems: "center",
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    marginBottom: 10,
  },
  bottomSheetMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  bottomSheetButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
}));
