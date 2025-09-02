import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { Activity } from "../../types";

interface ActivityListItemProps {
  activity: Activity;
}

export const ActivityListItem: React.FC<ActivityListItemProps> = ({
  activity,
}) => {
  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case "expense_created":
        return "💰";
      case "expense_updated":
        return "✏️";
      case "expense_deleted":
        return "🗑️";
      case "group_created":
        return "👥";
      case "member_added":
        return "➕";
      case "member_removed":
        return "➖";
      case "friend_request_sent":
      case "friend_request_accepted":
        return "🤝";
      case "payment_recorded":
        return "💳";
      case "expense_settled":
        return "✅";
      default:
        return "📋";
    }
  };

  const formatTimeAgo = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

      if (diffInSeconds < 60) {
        return "just now";
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes}m ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours}h ago`;
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days}d ago`;
      }
    } catch {
      return dateString;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>
          {getActivityIcon(activity.activity_type)}
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.actorName}>{activity.actor_user.name}</Text>
          <Text style={styles.timestamp}>
            {formatTimeAgo(activity.created_at)}
          </Text>
        </View>

        <Text style={styles.description}>{activity.description}</Text>

        {activity.group && (
          <Text style={styles.groupName}>Group: {activity.group.name}</Text>
        )}

        {activity.target_user && (
          <Text style={styles.targetUser}>
            With: {activity.target_user.name}
          </Text>
        )}

        {activity.metadata?.amount && (
          <Text style={styles.amount}>Amount: ₹{activity.metadata.amount}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  actorName: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
  },
  timestamp: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  description: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 4,
    lineHeight: 20,
  },
  groupName: {
    fontSize: 12,
    color: theme.colors.primary,
    marginBottom: 2,
  },
  targetUser: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  amount: {
    fontSize: 12,
    color: theme.colors.success,
    fontWeight: "500",
  },
}));
