import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { GroupBalance } from "../../types/friends.types";
import { stylesheet as styles } from "./GroupBalanceItem.styles";
import { useUnistyles } from "react-native-unistyles";
import { ChevronRight } from "lucide-react-native";

interface GroupBalanceItemProps {
  group: GroupBalance;
  onPress?: (groupId: string) => void;
}

export const GroupBalanceItem = React.memo(({ group, onPress }: GroupBalanceItemProps) => {
  const { theme } = useUnistyles();
  const isOwed = group.balance >= 0;
  const displayAmount = Math.abs(group.balance).toFixed(2);
  const balanceText = isOwed ? 'owes you' : 'you owe';

  const handlePress = () => {
    if (onPress) {
      onPress(group.group_id);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      disabled={!onPress}
    >
      <View style={styles.groupInfo}>
        <Text style={styles.groupName}>{group.group_name}</Text>
        <Text style={[
          styles.balance,
          { color: isOwed ? theme.colors.success : theme.colors.error }
        ]}>
          {balanceText} ₹{displayAmount}
        </Text>
      </View>
      {onPress && <ChevronRight size={20} color={theme.colors.textSecondary} />}
    </TouchableOpacity>
  );
});