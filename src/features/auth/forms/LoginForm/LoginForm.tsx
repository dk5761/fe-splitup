import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Button, TextField } from "@/components";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "./schema";

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void | Promise<void>;
  submitting?: boolean;
}

const getDefaultValues = () => {
  if (process.env.EXPO_PUBLIC_ENV === "development") {
    return {
      email: process.env.EXPO_PUBLIC_EMAIL,
      password: process.env.EXPO_PUBLIC_PASSWORD,
    };
  }

  return {
    email: "",
    password: "",
  };
};

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  submitting,
}) => {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: getDefaultValues(),
    mode: "onChange",
  });

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value }, fieldState }) => (
          <TextField
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={value}
            onChangeText={onChange}
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value }, fieldState }) => (
          <TextField
            placeholder="Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            error={fieldState.error?.message}
          />
        )}
      />
      <Button
        title={submitting ? "Loading..." : "Login"}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.spacing.xl,
  },
}));
