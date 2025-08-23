import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

import { Friend } from "../../types/friends.types";
import { stylesheet as styles } from "./FriendListItem.styles";

interface FriendListItemProps {
  item: Friend;
}

export const FriendListItem = React.memo(({ item }: FriendListItemProps) => {
  return (
    <View style={styles.friendItem}>
      <Image
        source={{ uri: `https://i.pravatar.cc/150?u=${item.id}` }}
        style={styles.avatar}
      />
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{item.name}</Text>
        <Text style={styles.friendEmail}>{item.email}</Text>
      </View>
    </View>
  );
});
