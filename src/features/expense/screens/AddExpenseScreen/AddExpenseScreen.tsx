import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { stylesheet as styles } from "./AddExpense.styles";
import { AddExpenseForm } from "../../forms/AddExpenseForm";
import { getGroupMembersQuery } from "@/features/groups/api/query";
import { ExpenseStackParamList } from "@/navigation/ExpenseStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export const AddExpenseScreen: React.FC<
  NativeStackScreenProps<ExpenseStackParamList, "AddExpense">
> = ({ route }) => {
  const { groupId } = route.params || {};

  return (
    <View style={styles.container}>
      <AddExpenseForm groupId={groupId} />
    </View>
  );
};
