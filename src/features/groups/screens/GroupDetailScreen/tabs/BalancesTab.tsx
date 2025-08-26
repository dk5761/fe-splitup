import React from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getGroupBalancesQuery } from "@/features/groups/api/query";
import { GroupBalanceMember, GroupDebt } from "@/features/groups/types";
import { styles } from "./styles"; // Reusing existing styles for contentContainer
import { StyleSheet, useUnistyles } from "react-native-unistyles";

interface BalancesTabProps {
  groupId: string;
}

const renderMemberBalance = ({
  item,
  theme,
}: {
  item: GroupBalanceMember;
  theme: typeof useUnistyles extends () => { theme: infer T } ? T : never;
}) => {
  const balanceColor =
    parseFloat(item.balance) >= 0 ? theme.colors.success : theme.colors.error;

  return (
    <View style={balancesTabStyles.memberItem}>
      <Text style={balancesTabStyles.memberName}>{item.user_name}</Text>
      <Text style={[balancesTabStyles.memberBalance, { color: balanceColor }]}>
        ₹{parseFloat(item.balance).toFixed(2)}
      </Text>
    </View>
  );
};

const renderDebt = ({
  item,
  theme,
}: {
  item: GroupDebt;
  theme: typeof useUnistyles extends () => { theme: infer T } ? T : never;
}) => {
  return (
    <View style={balancesTabStyles.debtItem}>
      <Text style={balancesTabStyles.debtText}>
        <Text style={{ fontWeight: theme.typography.weights.bold }}>
          {item.from.name}
        </Text>{" "}
        owes{" "}
        <Text style={{ fontWeight: theme.typography.weights.bold }}>
          {item.to.name}
        </Text>
      </Text>
      <Text style={balancesTabStyles.debtAmount}>
        ₹{parseFloat(item.amount).toFixed(2)}
      </Text>
    </View>
  );
};

export const BalancesTab = ({ groupId }: BalancesTabProps) => {
  const {
    data: balancesData,
    isLoading,
    isError,
  } = useQuery(getGroupBalancesQuery(groupId));
  const { theme } = useUnistyles();

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  if (isError) {
    return (
      <View style={styles.contentContainer}>
        <Text>Error loading balances.</Text>
      </View>
    );
  }

  if (
    !balancesData ||
    (!balancesData.members.length && !balancesData.debts.length)
  ) {
    return (
      <View style={[styles.contentContainer, balancesTabStyles.emptyState]}>
        <Text style={balancesTabStyles.emptyStateText}>
          No balances or debts to display yet.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={[]} // Using empty data as we render custom sections
      ListHeaderComponent={() => (
        <View style={styles.contentContainer}>
          <Text style={balancesTabStyles.sectionTitle}>
            Total Group Expense
          </Text>
          <Text style={balancesTabStyles.totalExpense}>
            ₹{parseFloat(balancesData.total_expense).toFixed(2)}
          </Text>

          {balancesData.members.length > 0 && (
            <>
              <Text style={balancesTabStyles.sectionTitle}>
                Member Balances
              </Text>
              <FlatList
                data={balancesData.members}
                keyExtractor={(item) => item.user_id}
                renderItem={({ item }) => renderMemberBalance({ item, theme })}
                ItemSeparatorComponent={() => (
                  <View style={balancesTabStyles.separator} />
                )}
              />
            </>
          )}

          {balancesData.debts && balancesData.debts.length > 0 && (
            <>
              <Text style={balancesTabStyles.sectionTitle}>
                Simplified Debts
              </Text>
              <FlatList
                data={balancesData.debts}
                keyExtractor={(item, index) =>
                  `${item.from.id}-${item.to.id}-${index}`
                }
                renderItem={({ item }) => renderDebt({ item, theme })}
                ItemSeparatorComponent={() => (
                  <View style={balancesTabStyles.separator} />
                )}
              />
            </>
          )}
        </View>
      )}
      renderItem={() => null} // No actual items to render in the main FlatList
      contentContainerStyle={{ paddingBottom: 80 }} // To avoid fab overlap
    />
  );
};

const balancesTabStyles = StyleSheet.create((theme) => ({
  sectionTitle: {
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  totalExpense: {
    fontSize: theme.typography.sizes.h3,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    textAlign: "center",
    marginBottom: theme.spacing.lg,
  },
  memberItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radii.md,
  },
  memberName: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
  },
  memberBalance: {
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.bold,
  },
  debtItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radii.md,
  },
  debtText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
  },
  debtAmount: {
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.error,
  },
  separator: {
    height: theme.spacing.sm,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
  },
}));
