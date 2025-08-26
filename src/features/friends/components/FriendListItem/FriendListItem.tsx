import { Image } from "expo-image";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Friend } from "../../types";
import { stylesheet as styles } from "./FriendListItem.styles";

import { FriendsStackParamList } from "@/navigation/types";
import { ChevronRight } from "lucide-react-native";
import { useUnistyles } from "react-native-unistyles";

interface FriendListItemProps {
  item: Friend;
}

export const FriendListItem = React.memo(({ item }: FriendListItemProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<FriendsStackParamList>>();
  const { theme } = useUnistyles();

  return (
    <TouchableOpacity
      style={styles.friendItem}
      onPress={() =>
        navigation.navigate("FriendDetailScreen", { friend: item })
      }
    >
      <Image
        source={{ uri: `https://i.pravatar.cc/150?u=${item.id}` }}
        style={styles.avatar}
      />
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{item.name}</Text>
        <Text style={styles.friendEmail}>{item.email}</Text>
      </View>
      <ChevronRight size={24} color={theme.colors.text} />
    </TouchableOpacity>
  );
});
