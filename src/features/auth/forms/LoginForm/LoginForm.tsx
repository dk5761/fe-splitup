import React from "react";
import { View } from "react-native";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { LoginSchema } from "./schema";
import { Input } from "../../../../components/ui/input";
import { Feather } from "@expo/vector-icons";

interface LoginFormProps {
  control: Control<LoginSchema>;
  errors: FieldErrors<LoginSchema>;
}

const LoginForm: React.FC<LoginFormProps> = ({ control, errors }) => {
  const { theme } = useUnistyles();
  return (
    <View style={styles.container}>
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
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Password"
            onChangeText={onChange}
            value={value}
            error={!!errors.password?.message}
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
  signInButton: {
    marginTop: 20,
  },
}));

export default LoginForm;
