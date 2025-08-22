// screens/DropdownExampleScreen.tsx

import React, { useRef, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import {
  AppDropdown,
  DropdownOption,
} from "@/components/ui/appdropdown/AppDropdown"; // Adjust path
import { useUnistyles } from "react-native-unistyles";
import {
  AppBottomSheet,
  AppBottomSheetHeader,
  AppBottomSheetRef,
} from "@/components/ui/appbottomsheet/AppBottomSheet";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Button, Input } from "@/components";

const currencyOptions: DropdownOption[] = [
  { label: "US Dollar (USD)", value: "USD" },
  { label: "Euro (EUR)", value: "EUR" },
  { label: "Japanese Yen (JPY)", value: "JPY" },
  { label: "British Pound (GBP)", value: "GBP" },
  { label: "Canadian Dollar (CAD)", value: "CAD" },
];

const categoryOptions: DropdownOption[] = [
  { label: "Groceries", value: "groceries" },
  { label: "Utilities", value: "utilities" },
  { label: "Transport", value: "transport" },
  { label: "Dining Out", value: "dining" },
  { label: "Entertainment", value: "entertainment" },
];

const DropdownExampleScreen = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(
    "USD"
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "groceries",
    "transport",
  ]);
  const requestSheetRef = useRef<AppBottomSheetRef>(null);
  const { theme } = useUnistyles();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    dialogActions: { flexDirection: "row", gap: 10 },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: 10,
      marginTop: 20,
    },
    contentContainer: {
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.lg,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Single Select (Currency)</Text>
        <AppDropdown
          placeholder="Select a currency"
          options={currencyOptions}
          value={selectedCurrency}
          onChange={setSelectedCurrency}
        />
        <Text style={{ marginTop: 10, color: theme.colors.textSecondary }}>
          Selected: {selectedCurrency}
        </Text>

        <Text style={styles.title}>Multi-Select (Categories)</Text>
        <AppDropdown
          placeholder="Select categories"
          options={categoryOptions}
          multiselect
          value={selectedCategories}
          onChange={setSelectedCategories}
        />
        <Text style={{ marginTop: 10, color: theme.colors.textSecondary }}>
          Selected: {selectedCategories.join(", ")}
        </Text>
        {/* <Button
          title="Show Request Form"
          variant="primary"
          onPress={() => requestSheetRef.current?.present()}
        />
        <AppBottomSheet ref={requestSheetRef} title="Request">
          <BottomSheetScrollView>
            <AppBottomSheetHeader title="Request" variant="destructive" />
            <View style={styles.contentContainer}>
              <Input
                label="Amount"
                defaultValue="$642.50"
                keyboardType="numeric"
              />
              <Input label="Request to" defaultValue="Maryland Winkles" />
              <Input
                label="Notes (optional)"
                defaultValue="Request Expense Explorers Group Payment."
                multiline
              />
              <View style={styles.dialogActions}>
                <Button
                  title="Cancel"
                  variant="outline"
                  onPress={() => requestSheetRef.current?.dismiss()}
                  style={{ flex: 1 }}
                />
                <Button
                  title="Request Now"
                  variant="primary"
                  onPress={() => requestSheetRef.current?.dismiss()}
                  style={{ flex: 1 }}
                />
              </View>
            </View>
          </BottomSheetScrollView>
        </AppBottomSheet> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DropdownExampleScreen;
