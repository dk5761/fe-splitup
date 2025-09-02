import React from "react";
import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ArrowLeft, Users, CreditCard, DollarSign } from "lucide-react-native";

import { FriendsStackParamList } from "@/navigation/types";
import { getFriendBalanceQuery, getFriendBreakdownQuery } from "../../api/query";
import { BalanceBreakdown } from "../../types/friends.types";
import { GroupBalanceItem } from "../../components/GroupBalanceItem";
import { stylesheet as styles } from "./BalanceBreakdownScreen.styles";
import { useUnistyles } from "react-native-unistyles";

const BalanceBreakdownScreen = React.memo(() => {
  const route = useRoute<NativeStackNavigationProp<FriendsStackParamList, "BalanceBreakdownScreen">['route']>();
  const navigation = useNavigation();
  const { theme } = useUnistyles();
  
  const { friendId, friendName, currentBalance } = route.params;

  const { data: balanceData, refetch: refetchBalance } = useQuery(getFriendBalanceQuery(friendId));
  const { data: breakdownData, refetch: refetchBreakdown, isLoading } = useQuery(getFriendBreakdownQuery(friendId));

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchBalance(), refetchBreakdown()]);
    setRefreshing(false);
  }, [refetchBalance, refetchBreakdown]);

  const totalBalance = balanceData?.balance || currentBalance;

  const handleSettleUp = () => {
    // TODO: Navigate to settlement flow
    console.log('Settle up pressed');
  };

  const handleViewHistory = () => {
    // History feature not implemented yet
    console.log('History feature not implemented');
  };

  const handleGroupPress = (groupId: string) => {
    // TODO: Navigate to group details
    console.log('Group pressed:', groupId);
  };

  const isOwed = totalBalance >= 0;
  const displayAmount = Math.abs(totalBalance).toFixed(2);
  const balanceText = isOwed ? 'owes you' : 'you owe';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Balance Breakdown</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.friendName}>{friendName}</Text>
          <View style={styles.balanceContainer}>
            <DollarSign size={20} color={isOwed ? theme.colors.success : theme.colors.error} />
            <Text style={[
              styles.totalBalance,
              { color: isOwed ? theme.colors.success : theme.colors.error }
            ]}>
              {displayAmount}
            </Text>
          </View>
          <Text style={[
            styles.balanceText,
            { color: isOwed ? theme.colors.success : theme.colors.error }
          ]}>
            {balanceText}
          </Text>
        </View>

        {/* Group Balances */}
        {breakdownData?.groups && breakdownData.groups.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Users size={20} color={theme.colors.textSecondary} />
              <Text style={styles.sectionTitle}>Group Balances</Text>
            </View>
            {breakdownData.groups.map((group) => (
              <GroupBalanceItem
                key={group.group_id}
                group={group}
                onPress={handleGroupPress}
              />
            ))}
          </View>
        )}

        {/* Direct Balance */}
        {breakdownData?.direct_balance !== undefined && breakdownData.direct_balance !== 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <CreditCard size={20} color={theme.colors.textSecondary} />
              <Text style={styles.sectionTitle}>Direct Expenses</Text>
            </View>
            <View style={styles.directBalanceCard}>
              <Text style={styles.directBalanceLabel}>Direct Balance</Text>
              <View style={styles.directBalanceAmountContainer}>
                <DollarSign size={16} color={breakdownData.direct_balance >= 0 ? theme.colors.success : theme.colors.error} />
                <Text style={[
                  styles.directBalanceAmount,
                  { color: breakdownData.direct_balance >= 0 ? theme.colors.success : theme.colors.error }
                ]}>
                  {Math.abs(breakdownData.direct_balance).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.settleButton} onPress={handleSettleUp}>
            <Text style={styles.settleButtonText}>Settle Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.historyButton} onPress={handleViewHistory}>
            <Text style={styles.historyButtonText}>View History</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
});

export default BalanceBreakdownScreen;