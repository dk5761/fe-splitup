import React from "react";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Button, TextField, Link } from "@/components";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../api";
import type { LoginRequest } from "../types";
import { useAuth } from "../hooks";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginScreen: React.FC = () => {
  const { signIn } = useAuth();
  const { mutateAsync, isPending } = useLoginMutation();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = async (values: LoginFormValues) => {
    const res = await mutateAsync(values as LoginRequest);
    await signIn(res);
  };

  console.log(errors);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>BillSplit AI</Text>
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
            title={isPending ? "Loading..." : "Login"}
            onPress={handleSubmit(onSubmit)}
          />
          <View style={styles.linkRow}>
            <Link href="Register">Don't have an account? Register</Link>
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
