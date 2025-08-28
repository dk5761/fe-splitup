import React from "react";
import { Text, View } from "react-native";
import { stylesheet as styles } from "./RequestsList.styles";
import { FriendRequest } from "../../types/friends.types";
import { Button } from "@/components/ui";
import { useUnistyles } from "react-native-unistyles";
import { useRespondToFriendRequest } from "../../api";

interface RequestListItemProps {
  item: FriendRequest;
}

const RequestListItem = ({ item }: RequestListItemProps) => {
  const { theme } = useUnistyles();
  const { mutate: respondToRequest, isPending } = useRespondToFriendRequest();

  const handleAccept = () => {
    respondToRequest({ requesterId: item.user.id, action: "accept" });
  };

  const handleDecline = () => {
    respondToRequest({ requesterId: item.user.id, action: "decline" });
  };

  return (
    <View style={{ padding: 12, flexDirection: "row", alignItems: "center" }}>
      <View style={{ flex: 1 }}>
        <Text
          style={{ fontSize: 16, fontWeight: "bold", color: theme.colors.text }}
        >
          {item.user.name}
        </Text>
        <Text style={{ color: theme.colors.textSecondary }}>
          {item.user.username}
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 8 }}>
        <Button
          title="Accept"
          variant="primary"
          onPress={handleAccept}
          disabled={isPending}
        />
        <Button
          title="Decline"
          variant="outline"
          onPress={handleDecline}
          disabled={isPending}
        />
      </View>
    </View>
  );
};

export default RequestListItem;
