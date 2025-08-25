import React from "react";
import { View, Text } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import {
  ChangePasswordSchema,
  changePasswordSchema,
} from "@/features/account/forms/ChangePasswordForm";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AccountStackParamList } from "@/navigation/types";
import { useChangePasswordMutation } from "@/features/account/api/mutationFn";
import { appToast } from "@/components/toast";
import { ChangePasswordForm } from "../../forms/ChangePasswordForm/ChangePasswordForm";
import { styles } from "./AccountSecurityScreen.styles";

type AccountSecurityScreenNavigationProp = NativeStackNavigationProp<
  AccountStackParamList,
  "AccountSecurity"
>;

export const AccountSecurityScreen = () => {
  const { theme } = useUnistyles();
  const navigation = useNavigation<AccountSecurityScreenNavigationProp>();
  const changePasswordMutation = useChangePasswordMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleChangePassword = async (data: ChangePasswordSchema) => {
    changePasswordMutation.mutate(
      {
        old_password: data.oldPassword,
        new_password: data.newPassword,
      },
      {
        onSuccess: () => {
          appToast.success("Password changed successfully");
          reset();
          navigation.goBack();
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <ChangePasswordForm control={control} errors={errors} />

      <View style={styles.saveButtonWrapper}>
        <Button
          title={
            changePasswordMutation.isPending ? "Changing..." : "Change Password"
          }
          onPress={handleSubmit(handleChangePassword)}
          disabled={changePasswordMutation.isPending}
        />
      </View>
    </View>
  );
};
