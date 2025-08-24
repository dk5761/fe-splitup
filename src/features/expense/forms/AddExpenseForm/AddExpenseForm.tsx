import React, { useRef, useState } from "react";
import { View, Pressable, Text } from "react-native";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AddExpenseFormValues, addExpenseSchema } from "./schema";
import { useCreateExpense } from "../../api";
import {
  AppBottomSheet,
  AppBottomSheetRef,
} from "@/components/ui/appbottomsheet";
import { SplitByBottomSheet } from "../../components/SplitByBottomSheet";
import { GroupMemberDetails } from "@/features/groups/types";
import { ChevronDown } from "lucide-react-native";
import { useUnistyles } from "react-native-unistyles";
import { styles } from "./AddExpense.styles";

type AddExpenseFormProps = {
  groupId?: string;
};

export const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ groupId }) => {
  const { theme } = useUnistyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<AddExpenseFormValues>({
    resolver: zodResolver(addExpenseSchema),
    defaultValues: {
      description: "",
      total_amount: "",
      expense_date: new Date(),
      split_type: "EQUAL",
      participants: [],
    },
  });

  // console.log(getValues());

  const { mutate: createExpense, isPending } = useCreateExpense();
  const bottomSheetRef = useRef<AppBottomSheetRef>(null);
  const totalAmount = watch("total_amount");

  const onSubmit = (data: AddExpenseFormValues) => {
    console.log({ data });
    const expenseData = {
      ...data,
      expense_date: data.expense_date.toISOString(),
      group_id: groupId,
    };

    createExpense({ expense_data: expenseData });
  };

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  const handleSplitSubmit = (participants: any[], splitType: "EQUAL") => {
    setValue("participants", participants);
    setValue("split_type", splitType);
    bottomSheetRef.current?.close();
  };

  const splitType = useWatch({ control, name: "split_type" });

  return (
    <View>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Title"
            placeholder="Enter expense title"
            onChangeText={onChange}
            value={value}
            error={errors.description?.message ? true : undefined}
          />
        )}
      />
      <Controller
        control={control}
        name="total_amount"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Amount"
            placeholder="0.00"
            onChangeText={onChange}
            value={value}
            error={errors.total_amount?.message ? true : undefined}
            keyboardType="numeric"
          />
        )}
      />
      <Pressable onPress={openBottomSheet} style={styles.splitByContainer}>
        <View style={styles.splitByTextContainer}>
          <Text>
            Split By {splitType ? `: ` : ""}
            {splitType ? <Text style={styles.splitType}>{splitType}</Text> : ""}
          </Text>
        </View>
        <ChevronDown size={20} color={theme.colors.textSecondary} />
      </Pressable>
      <Button
        title="Save"
        onPress={handleSubmit(onSubmit)}
        loading={isPending}
      />
      <AppBottomSheet
        ref={bottomSheetRef}
        snapPoints={["90%"]}
        enableDynamicSizing={false}
      >
        <SplitByBottomSheet
          groupId={groupId || ""}
          totalAmount={parseFloat(totalAmount) || 0}
          onSubmit={handleSplitSubmit}
          onClose={() => bottomSheetRef.current?.close()}
        />
      </AppBottomSheet>
    </View>
  );
};
