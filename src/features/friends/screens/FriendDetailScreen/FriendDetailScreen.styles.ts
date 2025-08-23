// src/screens/FriendDetailScreen.styles.ts

import { StyleSheet } from "react-native-unistyles";
import { Platform } from "react-native";

export const MAIN_HEADER_HEIGHT = 280;
// FIX: Increase the sticky header height for a more spacious look
const STICKY_HEADER_HEIGHT = Platform.OS === "ios" ? 120 : 80;

export const stylesheet = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  // --- Sticky Header ---
  stickyHeaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: STICKY_HEADER_HEIGHT,
    paddingTop: Platform.OS === "ios" ? 50 : 10, // Adjust top padding
    backgroundColor: theme.colors.surface,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  // --- ADD THIS NEW STYLE ---
  mainHeaderBackButton: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 5, // Add some padding to make it easier to tap
  },
  // FIX: Add a container for the avatar and title for better alignment
  stickyHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
    marginLeft: 10,
  },
  stickyHeaderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  stickyHeaderTitle: {
    // This no longer needs to be flex: 1 or centered
    fontSize: theme.typography.sizes.h3,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
  },
  stickyHeaderRight: {
    marginLeft: "auto", // Push this to the far right
  },

  // ... (All other styles for Main Header, List, etc. remain the same)
  mainHeaderContainer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  },
  infoContainer: {
    flexDirection: "column",
    gap: 4,
    alignItems: "center",
    marginBottom: 20,
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
    color: theme.colors.error,
  },
  listHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.text,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  transactionItem: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  transactionText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  bottomSheetContent: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 40,
    alignItems: "center",
  },
  bottomSheetMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: theme.colors.textSecondary,
  },
  bottomSheetButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: theme.spacing.md,
  },
}));
