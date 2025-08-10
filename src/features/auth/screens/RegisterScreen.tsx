import React from "react";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Button, TextField, Link } from "@/components";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "../api";
import type { RegisterRequest } from "../types";
import { useAuth } from "../hooks";

const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterScreen: React.FC = () => {
  const { signIn } = useAuth();
  const { mutateAsync, isPending } = useRegisterMutation();
  const { control, handleSubmit, setValue, formState } =
    useForm<RegisterFormValues>({
      resolver: zodResolver(registerSchema),
      defaultValues: { username: "", email: "", password: "" },
      mode: "onChange",
    });

  const onSubmit = async (values: RegisterFormValues) => {
    const res = await mutateAsync(values as RegisterRequest);
    await signIn(res);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>
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
            title={isPending ? "Loading..." : "Register"}
            onPress={handleSubmit(onSubmit)}
          />
          <View style={styles.linkRow}>
            <Link href="Login">Already have an account? Sign In</Link>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    gap: theme.spacing.lg,
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
  },
  formContainer: {
    gap: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.sizes.h1,
    lineHeight: theme.typography.lineHeights.h1,
    fontFamily: theme.typography.families.bold,
    color: theme.colors.text,
    alignSelf: "center",
  },
  linkRow: {
    marginTop: theme.spacing.md,
    alignSelf: "center",
  },
}));
