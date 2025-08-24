import React from "react";
import { View, Text } from "react-native";
import { styles } from "./ExpenseListItem.styles";
import { Expense } from "@/features/groups/types";
import { Feather } from "@expo/vector-icons";
import { format, isToday, isYesterday } from "date-fns";

interface ExpenseListItemProps {
  expense: Expense;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isToday(date)) {
    return "Today";
  }
  if (isYesterday(date)) {
    return "Yesterday";
  }
  return format(date, "MMM d, yyyy");
};

export const ExpenseListItem = ({ expense }: ExpenseListItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name="shopping-cart" size={24} color="black" />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.description}>{expense.description}</Text>
        <Text style={styles.paidBy}>Paid by {expense.payer.name}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>₹{expense.total_amount}</Text>
        <Text style={styles.date}>{formatDate(expense.expense_date)}</Text>
      </View>
    </View>
  );
};
