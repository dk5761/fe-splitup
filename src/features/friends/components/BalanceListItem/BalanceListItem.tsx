import { Image } from "expo-image";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Friend } from "../../types";
import { stylesheet as styles } from "./BalanceListItem.styles";
import { FriendsStackParamList } from "@/navigation/types";
import { ChevronRight } from "lucide-react-native";
import { useUnistyles } from "react-native-unistyles";

interface BalanceListItemProps {
  friend: Friend;
  balance: number;
}

export const BalanceListItem = React.memo(({ friend, balance }: BalanceListItemProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<FriendsStackParamList>>();
  const { theme } = useUnistyles();

  const handlePress = () => {
    navigation.navigate("BalanceBreakdownScreen", {
      friendId: friend.id,
      friendName: friend.name,
      currentBalance: balance,
    });
  };

  const isOwed = balance >= 0;
  const displayAmount = Math.abs(balance).toFixed(2);
  const balanceText = isOwed ? 'owes you' : 'you owe';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
    >
      <Image
        source={{ uri: `https://i.pravatar.cc/150?u=${friend.id}` }}
        style={styles.avatar}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{friend.name}</Text>
        <Text style={[
          styles.balance,
          { color: isOwed ? theme.colors.success : theme.colors.error }
        ]}>
          {balanceText} ₹{displayAmount}
        </Text>
      </View>
      <ChevronRight size={20} color={theme.colors.textSecondary} />
    </TouchableOpacity>
  );
});