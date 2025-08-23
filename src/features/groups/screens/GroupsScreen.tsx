import { View } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { StyleSheet } from "react-native-unistyles";

import { getGroupsQuery } from "../api/query";
import { GroupList } from "../components/GroupList";
import { EmptyGroups } from "../components/EmptyGroups";
import { useNavigation } from "@react-navigation/native";
import { Fab } from "@/components/ui";
import { Group, GroupsListResponse } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GroupStackParamList } from "@/navigation/types";

type GroupsScreenNavigationProp = NativeStackNavigationProp<
  GroupStackParamList,
  "GroupsScreen"
>;

const GroupsScreen = () => {
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
  const navigation = useNavigation<GroupsScreenNavigationProp>();

  const groups =
    data?.pages.flatMap((page: GroupsListResponse) => page.data) ?? [];

  const handleGroupPress = (group: Group) => {
    navigation.navigate("GroupDetailScreen", { groupId: group.id });
  };

  return (
    <View style={[styles.container]}>
      {groups.length === 0 && !isLoading ? (
        <EmptyGroups />
      ) : (
        <GroupList
          groups={groups}
          onGroupPress={handleGroupPress}
          isLoading={isLoading}
          isError={isError}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onRefresh={refetch}
          isRefreshing={isRefetching}
        />
      )}
      <Fab onPress={() => navigation.navigate("CreateGroupScreen")} />
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));

export default GroupsScreen;
