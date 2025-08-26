import React from "react";
import { FlatList, ActivityIndicator, View, Text } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getGroupExpensesQuery } from "@/features/groups/api/query";
import { ExpenseListItem } from "@/features/groups/components/ExpenseListItem";
import { styles } from "./styles";

interface ExpensesTabProps {
  groupId: string;
}

export const ExpensesTab = ({ groupId }: ExpensesTabProps) => {
  const {
    data: expensesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(getGroupExpensesQuery(groupId));

  const expenses = expensesData?.pages.flatMap((page) => page.data) ?? [];

  if (expenses.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>No expenses found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ExpenseListItem expense={item} />}
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      contentContainerStyle={styles.contentContainer}
    />
  );
};
