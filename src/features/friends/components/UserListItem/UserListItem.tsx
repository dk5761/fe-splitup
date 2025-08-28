import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

import { useSendFriendRequest } from "../../api/mutationFn";
import { Friend } from "../../types/friends.types";
import { stylesheet as styles } from "./UserListItem.styles";
import { UserPlus } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { useUnistyles } from "react-native-unistyles";
import { useAuth } from "@/features/auth";

interface UserListItemProps {
  user: Friend;
}

export const UserListItem = React.memo(({ user }: UserListItemProps) => {
  const { mutate: sendFriendRequest, isPending } = useSendFriendRequest();
  const { theme } = useUnistyles();
  const { user: currentUser } = useAuth();

  const handleAddFriend = (userId: string) => {
    sendFriendRequest(userId);
  };

  const getFriendshipStatus = (status: string) => {
    switch (status) {
      case "pending_sent":
        return "Request Sent";
      case "pending_received":
        return "Request Received";
    }
  };

  return (
    <View style={styles.userItem}>
      <Image
        source={{ uri: `https://i.pravatar.cc/150?u=${user.id}` }}
        style={styles.avatar}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>
      {user.friendship_status === "not_friends" &&
        user.id !== currentUser?.id && (
          <Button
            onPress={() => handleAddFriend(user.id)}
            disabled={isPending}
            style={styles.addButton}
          >
            <UserPlus size={20} color={theme.colors.black} />
            <Text style={styles.addButtonText}>Add Friend</Text>
          </Button>
        )}
      {user.friendship_status !== "not_friends" && user.friendship_status && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            {getFriendshipStatus(user.friendship_status)}
          </Text>
        </View>
      )}
    </View>
  );
});
