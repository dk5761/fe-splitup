import React from "react";
import { View } from "react-native";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { PersonalInfoSchema } from "./schema";
import { Input } from "@/components/ui/input";
import { Feather } from "@expo/vector-icons";

interface PersonalInfoFormProps {
  control: Control<PersonalInfoSchema>;
  errors: FieldErrors<PersonalInfoSchema>;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  control,
  errors,
}) => {
  const { theme } = useUnistyles();
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Full Name"
            onChangeText={onChange}
            value={value}
            error={!!errors.name?.message}
            leftIcon={
              <Feather
                name="user"
                size={20}
                color={theme.colors.textSecondary}
              />
            }
          />
        )}
      />

      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Username"
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            error={!!errors.username?.message}
            leftIcon={
              <Feather
                name="at-sign"
                size={20}
                color={theme.colors.textSecondary}
              />
            }
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Email"
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
            error={!!errors.email?.message}
            leftIcon={
              <Feather
                name="mail"
                size={20}
                color={theme.colors.textSecondary}
              />
            }
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
