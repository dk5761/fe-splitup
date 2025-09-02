import React from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

import { ActivityListItem } from "../ActivityListItem";
import { Activity } from "../../types";

interface ActivityListProps {
  activities: Activity[];
  isLoading: boolean;
  isError: boolean;
  onEndReached: () => void;
  isFetchingNextPage: boolean;
  onRefresh: () => void;
  refreshing: boolean;
  listEmptyComponent?:
    | React.ComponentType<any>
    | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
    | null
    | undefined;
}

export const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  isLoading,
  isError,
  onEndReached,
  isFetchingNextPage,
  onRefresh,
  refreshing,
  listEmptyComponent,
}) => {
  const { theme } = useUnistyles();

  if (isLoading && activities.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error loading activities</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={activities}
      renderItem={({ item }) => <ActivityListItem activity={item} />}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator style={styles.footerLoader} />
        ) : null
      }
      ListEmptyComponent={listEmptyComponent}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={theme.colors.primary}
        />
      }
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create((theme) => ({
  contentContainer: {
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.error,
    textAlign: "center",
  },
  footerLoader: {
    marginVertical: 16,
  },
}));
