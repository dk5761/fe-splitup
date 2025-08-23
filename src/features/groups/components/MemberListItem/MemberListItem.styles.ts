import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.surface,
    marginRight: theme.spacing.md,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.text,
  },
  username: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  role: {
    fontSize: theme.typography.sizes.caption,
    textTransform: "capitalize",
    variants: {
      role: {
        admin: {
          color: "white",
        },
        member: {
          color: "black",
        },
      },
    },
  },
  roleContainer: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.spacing.sm,
    variants: {
      role: {
        admin: {
          backgroundColor: theme.colors.success,
        },
        member: {
          backgroundColor: theme.colors.secondary,
        },
      },
    },
  },
}));
