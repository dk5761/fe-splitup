import { StyleSheet } from "react-native-unistyles";

export const stylesheet = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  summaryCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    alignItems: "center",
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  friendName: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 12,
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  totalBalance: {
    fontSize: 32,
    fontWeight: "700",
    marginLeft: 4,
  },
  balanceText: {
    fontSize: 16,
    fontWeight: "500",
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
    marginLeft: 8,
  },
  directBalanceCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  directBalanceLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.text,
  },
  directBalanceAmountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  directBalanceAmount: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 2,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 32,
    marginBottom: 24,
  },
  settleButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  settleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.background,
  },
  historyButton: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  historyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
  },
}));