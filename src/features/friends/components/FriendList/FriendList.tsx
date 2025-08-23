import React, { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { Friend } from "../../types/friends.types";
import { FriendListItem } from "../FriendListItem";
import { stylesheet as styles } from "./FriendList.styles";

interface FriendListProps {
  friends: Friend[];
  onEndReached: () => void;
  isFetchingNextPage: boolean;
  ListEmptyComponent: React.ComponentType<any> | React.ReactElement | null;
}

export const FriendList = React.memo(
  ({
    friends,
    onEndReached,
    isFetchingNextPage,
    ListEmptyComponent,
  }: FriendListProps) => {
    const renderItem = useCallback(
      ({ item }: { item: Friend }) => <FriendListItem item={item} />,
      []
    );

    const renderFooter = () => {
      if (!isFetchingNextPage) return null;
      return <ActivityIndicator style={{ paddingVertical: 20 }} />;
    };

    return (
      <FlatList
        data={friends}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={ListEmptyComponent}
      />
    );
  }
);
