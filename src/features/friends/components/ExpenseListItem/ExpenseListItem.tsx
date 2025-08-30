import React from "react";
import { View, Text } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { Newspaper } from "lucide-react-native";
import { format } from "date-fns";

import { Expense } from "../../types";
import { stylesheet } from "./ExpenseListItem.styles";

interface ExpenseListItemProps {
  expense: Expense;
}

export const ExpenseListItem = ({ expense }: ExpenseListItemProps) => {
  const { theme } = useUnistyles();
  const styles = stylesheet;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Newspaper size={24} color={theme.colors.primaryOn} />
      </View>
      <View style={styles.details}>
        <Text style={styles.description}>{expense.description}</Text>
        <Text style={styles.date}>
          {format(new Date(expense.expense_date), "MMM dd, yyyy")}
        </Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>${expense.total_amount}</Text>
        {/* <Text style={styles.share}>Your share: ${userShare.toFixed(2)}</Text> */}
      </View>
    </View>
  );
};
