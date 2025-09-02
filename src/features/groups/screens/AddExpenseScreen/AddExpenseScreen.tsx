import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

import { stylesheet as styles } from "./AddExpense.styles";
import { AddGroupExpenseForm } from "../../forms/AddGroupExpenseForm";
import { ExpenseStackParamList } from "@/navigation/ExpenseStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export const AddExpenseScreen: React.FC<
  NativeStackScreenProps<ExpenseStackParamList, "AddExpense">
> = ({ route }) => {
  const { groupId } = route.params || {};

  return (
    <View style={styles.container}>
      <AddGroupExpenseForm groupId={groupId} />
    </View>
  );
};
