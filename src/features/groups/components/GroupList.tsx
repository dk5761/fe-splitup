import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { Group } from "../types";
import { GroupListItem } from "./GroupListItem";

interface GroupListProps {
  groups: Group[];
  onGroupPress: (group: Group) => void;
  isLoading: boolean;
  isError: boolean;
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const GroupList = ({
  groups,
  onGroupPress,
  isLoading,
  isError,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  onRefresh,
  isRefreshing,
}: GroupListProps) => {
  if (isLoading && groups.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text>Error fetching groups</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={groups}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <GroupListItem item={item} onPress={() => onGroupPress(item)} />
      )}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      contentContainerStyle={{ padding: 20 }}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
