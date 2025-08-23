import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { stylesheet as styles } from "./AddFriendButton.styles";

import { FriendsStackParamList } from "@/navigation/types";

export const AddFriendButton = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<FriendsStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={() => navigation.navigate("AddFriendScreen")}
    >
      <Text style={styles.fabText}>+</Text>
    </TouchableOpacity>
  );
};
