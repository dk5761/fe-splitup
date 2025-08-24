import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React from "react";
import { AddExpenseScreen } from "@/features/expense/screens/AddExpenseScreen/AddExpenseScreen";
import { useUnistyles } from "react-native-unistyles";
import Header from "@/components/layout/header/Header";

export type ExpenseStackParamList = {
  AddExpense: { groupId?: string; friendId?: string };
};

export type ExpenseStackScreenProps =
  NativeStackScreenProps<ExpenseStackParamList>;

const ExpenseStack = createNativeStackNavigator<ExpenseStackParamList>();

export function ExpenseStackNavigator() {
  const { theme } = useUnistyles();
  return (
    <ExpenseStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <ExpenseStack.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={{
          title: "Add New Expense",
          headerShown: true,
          header: (props) => (
            <Header title={props.options.title || ""} canGoBack={true} />
          ),
        }}
      />
    </ExpenseStack.Navigator>
  );
}
