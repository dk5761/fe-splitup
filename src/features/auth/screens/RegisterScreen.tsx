import React from "react";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Link } from "@/components";
import { SignUpForm, type SignUpFormValues } from "../forms";
import { useRegisterMutation } from "../api";
import type { RegisterRequest } from "../types";
import { useAuth } from "../hooks";

export const RegisterScreen: React.FC = () => {
  const { signIn } = useAuth();
  const { mutateAsync, isPending } = useRegisterMutation();

  const onSubmit = async (values: SignUpFormValues) => {
    const res = await mutateAsync(values as RegisterRequest);
    await signIn(res);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>
          <SignUpForm submitting={isPending} onSubmit={onSubmit} />
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
