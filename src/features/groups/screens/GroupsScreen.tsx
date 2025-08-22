import { View, Text, StyleSheet } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  } = useInfiniteQuery(getGroupsQuery());
  const insets = useSafeAreaInsets();

  const groups = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <GroupsHeader />
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
        />
      )}
      <CreateGroupButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
