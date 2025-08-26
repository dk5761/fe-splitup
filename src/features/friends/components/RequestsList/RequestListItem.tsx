import React from "react";
import { Text, View } from "react-native";
import { stylesheet as styles } from "./RequestsList.styles";
import { FriendRequest } from "../../types/friends.types";
import { Button } from "@/components/ui";

interface RequestListItemProps {
  item: FriendRequest;
}

const RequestListItem = ({ item }: RequestListItemProps) => {
  return (
    <View style={{ padding: 12, flexDirection: "row", alignItems: "center" }}>
      <View style={{ flex: 1 }}>
        <Text>{item.user.name}</Text>
        <Text style={{ color: "gray" }}>{item.user.username}</Text>
      </View>

      <View style={{ flexDirection: "row", gap: 8 }}>
        <Button title="Accept" variant="primary" onPress={() => {}} />
        <Button title="Decline" variant="outline" onPress={() => {}} />
      </View>
    </View>
  );
};

export default RequestListItem;
