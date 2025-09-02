import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { StyleSheet as UnistylesStyleSheet } from "react-native-unistyles";

import { getUserActivityFeedQuery } from "../../api/query";
import { ActivityList, ActivityFilter } from "../../components";
import { ActivityFilters, ActivityFilterOption } from "../../types";

const filterOptions: ActivityFilterOption[] = [
  { label: "All", value: "all", icon: "📋" },
  { label: "Expenses", value: "expenses", icon: "💰" },
  { label: "Groups", value: "groups", icon: "👥" },
  { label: "Friends", value: "friends", icon: "🤝" },
  { label: "Payments", value: "payments", icon: "💳" },
];

export const ActivityScreen = () => {
  const [filters, setFilters] = useState<ActivityFilters>({ filter: "all" });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    refetch,
  } = useInfiniteQuery(getUserActivityFeedQuery(filters));

  const activities = data?.pages.flatMap((page) => page.activities) ?? [];

  const handleFilterChange = (newFilters: ActivityFilters) => {
    setFilters(newFilters);
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View style={styles.container}>
      <ActivityFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        filterOptions={filterOptions}
      />
      <ActivityList
        activities={activities}
        isLoading={isLoading}
        isError={isError}
        onEndReached={handleEndReached}
        isFetchingNextPage={isFetchingNextPage}
        onRefresh={refetch}
        refreshing={isFetchingNextPage}
        listEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No activities found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = UnistylesStyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
}));
