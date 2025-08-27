import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

import { useSendFriendRequest } from "../../api/mutationFn";
import { Friend } from "../../types/friends.types";
import { stylesheet as styles } from "./UserListItem.styles";
import { UserPlus } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { useUnistyles } from "react-native-unistyles";

interface UserListItemProps {
  user: Friend;
}

export const UserListItem = React.memo(({ user }: UserListItemProps) => {
  const { mutate: sendFriendRequest, isPending } = useSendFriendRequest();
  const { theme } = useUnistyles();

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
        onPress={() => handleAddFriend(user.id)}
        disabled={isPending}
        style={styles.addButton}
      >
        <UserPlus size={20} color={theme.colors.black} />
        <Text style={styles.addButtonText}>Add Friend</Text>
      </Button>
    </View>
  );
});
