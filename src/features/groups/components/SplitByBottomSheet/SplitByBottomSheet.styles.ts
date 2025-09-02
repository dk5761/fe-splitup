import { StyleSheet } from "react-native-unistyles";

export const stylesheet = StyleSheet.create((theme) => ({
  container: {
    padding: 20,
    backgroundColor: theme.colors.surface,
    height: "100%",
    width: "100%",
  },
  contentContainer: {
    flex: 1,
  },
  chipContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
    gap: 10,
  },
  participantContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    height: 70,
  },
  participantName: {
    flex: 1,
    marginLeft: 10,
    color: theme.colors.text,
    fontSize: 16,
  },
  input: {
    width: 80,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 10,
    textAlign: "right",
    fontSize: 16,
  },
  splitSummaryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
    paddingTop: 20,
  },
}));
