import React, { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getFriendRequestsQuery } from "../../api/query";
import { FriendRequest } from "../../types/friends.types";
import { stylesheet as styles } from "./RequestsList.styles";
import RequestListItem from "./RequestListItem";

interface RequestsListProps {
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
}

const RequestsList = ({ ListEmptyComponent = null }: RequestsListProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(getFriendRequestsQuery());

  const requests = data?.pages.flatMap((p) => p.requests ?? []) ?? [];

  const onEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: FriendRequest }) => <RequestListItem item={item} />,
    []
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlatList
      data={requests}
      renderItem={renderItem}
      keyExtractor={(item, idx) => `${item.user.id}-${idx}`}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() =>
        isFetchingNextPage ? (
          <ActivityIndicator style={{ padding: 20 }} />
        ) : null
      }
      ListEmptyComponent={ListEmptyComponent}
      removeClippedSubviews
      maxToRenderPerBatch={8}
      windowSize={7}
    />
  );
};

export default RequestsList;
