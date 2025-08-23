import { View, Text } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

import { getGroupsQuery } from "../api/query";
import { GroupList } from "../components/GroupList";
import { EmptyGroups } from "../components/EmptyGroups";
import { useNavigation } from "@react-navigation/native";
import { Fab } from "@/components/ui";

const GroupsScreen = () => {
  const navigation = useNavigation();
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
  const navigate = useNavigation();

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
      <Fab onPress={() => navigate.navigate("CreateGroup" as never)} />
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
