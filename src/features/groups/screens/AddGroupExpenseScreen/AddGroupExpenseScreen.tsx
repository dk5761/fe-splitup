import { AddExpenseForm } from "@/features/expense/forms/AddExpenseForm";
import React from "react";
import { View } from "react-native";
import { GroupStackParamList } from "@/navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTabBar } from "@/shared/context/TabBarContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { queryClient } from "@/shared/query/client";
import { groupsQueryKeys } from "../../api/queryKeyFactory";

export const AddGroupExpenseScreen: React.FC<
  NativeStackScreenProps<GroupStackParamList, "AddGroupExpenseScreen">
> = ({ route }) => {
  const { groupId } = route.params || {};
  const navigation = useNavigation();
  const { showTabBar, hideTabBar } = useTabBar();

  useFocusEffect(
    React.useCallback(() => {
      hideTabBar();
      return () => showTabBar();
    }, [hideTabBar, showTabBar])
  );

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: groupsQueryKeys.expenses(groupId),
    });

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, height: "100%" }}>
      <AddExpenseForm groupId={groupId} onSuccess={handleSuccess} />
    </View>
  );
};
