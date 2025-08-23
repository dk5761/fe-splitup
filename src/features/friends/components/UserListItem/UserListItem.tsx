import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

import { useSendFriendRequest } from "../api/mutationFn";
import { Friend } from "../types/friends.types";
import { stylesheet as styles } from "./UserListItem.styles";

import { Button } from "@/components/ui/button";

interface UserListItemProps {
  user: Friend;
}

export const UserListItem = React.memo(({ user }: UserListItemProps) => {
  const { mutate: sendFriendRequest, isPending } = useSendFriendRequest();

  const handleAddFriend = (userId: string) => {
    sendFriendRequest(userId);
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
      <Button
        title="Add to My Contact"
        onPress={() => handleAddFriend(user.id)}
        disabled={isPending}
        style={styles.addButton}
      />
    </View>
  );
});
