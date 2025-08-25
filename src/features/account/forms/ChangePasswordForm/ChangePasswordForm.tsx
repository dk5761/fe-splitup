import React from "react";
import { View } from "react-native";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { ChangePasswordSchema } from "./schema";
import { Input } from "@/components/ui/input";
import { Feather } from "@expo/vector-icons";

interface ChangePasswordFormProps {
  control: Control<ChangePasswordSchema>;
  errors: FieldErrors<ChangePasswordSchema>;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  control,
  errors,
}) => {
  const { theme } = useUnistyles();
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="oldPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Current Password"
            onChangeText={onChange}
            value={value}
            error={!!errors.oldPassword?.message}
            leftIcon={
              <Feather
                name="lock"
                size={20}
                color={theme.colors.textSecondary}
              />
            }
            isPassword={true}
          />
        )}
      />

      <Controller
        control={control}
        name="newPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="New Password"
            onChangeText={onChange}
            value={value}
            error={!!errors.newPassword?.message}
            leftIcon={
              <Feather
                name="lock"
                size={20}
                color={theme.colors.textSecondary}
              />
            }
            isPassword={true}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Confirm New Password"
            onChangeText={onChange}
            value={value}
            error={!!errors.confirmPassword?.message}
            leftIcon={
              <Feather
                name="lock"
                size={20}
                color={theme.colors.textSecondary}
              />
            }
            isPassword={true}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    width: "100%",
    gap: theme.spacing.md,
  },
}));
