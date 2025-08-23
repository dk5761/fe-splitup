import { View, Text } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

import { getGroupsQuery } from "../api";
import { GroupList } from "../components/GroupList";
import { EmptyGroups } from "../components/EmptyGroups";
import { GroupsHeader } from "../components/GroupsHeader";
import { CreateGroupButton } from "../components/CreateGroupButton";

export const GroupsScreen = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery(getGroupsQuery());
  const insets = useSafeAreaInsets();

  const groups = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <View style={[styles.container]}>
      {groups.length === 0 && !isLoading ? (
        <EmptyGroups />
      ) : (
        <GroupList
          groups={groups}
          isLoading={isLoading}
          isError={isError}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onRefresh={refetch}
          isRefreshing={isRefetching}
        />
      )}
      <CreateGroupButton />
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));
