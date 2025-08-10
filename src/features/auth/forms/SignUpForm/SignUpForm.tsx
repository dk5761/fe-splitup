import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Button, TextField } from "@/components";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpFormValues } from "./schema";

interface SignUpFormProps {
  onSubmit: (values: SignUpFormValues) => void | Promise<void>;
  submitting?: boolean;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit,
  submitting,
}) => {
  const { control, handleSubmit } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { username: "", email: "", password: "" },
    mode: "onChange",
  });

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value }, fieldState }) => (
          <TextField
            placeholder="Username"
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
        name="email"
        render={({ field: { onChange, value }, fieldState }) => (
          <TextField
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
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
        title={submitting ? "Loading..." : "Register"}
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
