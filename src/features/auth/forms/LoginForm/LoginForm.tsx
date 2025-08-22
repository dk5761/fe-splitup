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
            onBlur={onBlur}
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
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            error={!!errors.password?.message}
            leftIcon={
              <Feather
                name="lock"
                size={20}
                color={theme.colors.textSecondary}
              />
            }
            isPassword
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    width: "100%",
  },
  signInButton: {
    marginTop: 20,
  },
}));

export default LoginForm;
