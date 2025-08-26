import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";

import { Balance } from "../types";
import { ActivityListItem } from "./ActivityListItem";

interface ActivityListProps {
  balances: Balance[];
  isLoading: boolean;
  isError: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
}

export const ActivityList = ({
  balances,
  isLoading,
  isError,
  onRefresh,
  refreshing,
}: ActivityListProps) => {
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text>Error fetching activities</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={balances}
      keyExtractor={(item) => item.friend_id}
      renderItem={({ item }) => <ActivityListItem item={item} />}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      refreshControl={
        <RefreshControl
          refreshing={refreshing ?? false}
          onRefresh={onRefresh ?? (() => {})}
        />
      }
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
