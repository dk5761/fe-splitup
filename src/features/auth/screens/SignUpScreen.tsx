import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../navigation/types";
import SignUpForm from "../forms/SignUpForm/SignUpForm";
import { SignUpSchema, signUpSchema } from "../forms/SignUpForm/schema";
import { Button } from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Feather } from "@expo/vector-icons";
import { useRegisterMutation } from "../api/mutationFn";
import { useAuthContext } from "../context";
import type { RegisterRequest } from "../types";

type SignUpScreenProps = NativeStackScreenProps<AuthStackParamList, "SignUp">;

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const { theme } = useUnistyles();
  const { signIn } = useAuthContext();
  const registerMutation = useRegisterMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      agreeToTerms: false,
    },
  });

  const handleSignUp = async (data: SignUpSchema) => {
    const registerData: RegisterRequest = {
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
    };

    registerMutation.mutate(registerData, {
      onSuccess: async (response) => {
        await signIn(response);
      },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Feather name="arrow-left" size={24} color={theme.colors.text} />
      </TouchableOpacity>

      <Text style={styles.title}>Create account 👩</Text>
      <Text style={styles.subtitle}>
        Please enter your email & password to sign up
      </Text>

      <SignUpForm control={control} errors={errors} />

      <Button
        title={registerMutation.isPending ? "Signing up..." : "Sign up"}
        onPress={handleSubmit(handleSignUp)}
        style={styles.signUpButton}
        disabled={registerMutation.isPending}
      />

      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signInLink}> Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 30,
  },
  signUpButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 20,
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  signInText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  signInLink: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: "bold",
  },
}));

export default SignUpScreen;
