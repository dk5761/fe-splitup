import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Control, Controller, FieldErrors, useWatch } from "react-hook-form";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { SignUpSchema } from "./schema";
import { Input } from "../../../../components/ui/input";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Feather } from "@expo/vector-icons";
import { useUsernameValidation } from "../../hooks";

interface SignUpFormProps {
  control: Control<SignUpSchema>;
  errors: FieldErrors<SignUpSchema>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ control, errors }) => {
  const { theme } = useUnistyles();
  const username = useWatch({ control, name: "username" });
  const { isChecking, isAvailable, isTaken } = useUsernameValidation(username);

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
          <View>
            <Input
              placeholder="Username"
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              error={!!errors.username?.message || isTaken}
              leftIcon={
                <Feather
                  name="at-sign"
                  size={20}
                  color={theme.colors.textSecondary}
                />
              }
            />
            {username && username.length >= 3 && (
              <View style={styles.usernameValidation}>
                {isChecking ? (
                  <Text style={styles.checkingText}>
                    Checking availability...
                  </Text>
                ) : isTaken ? (
                  <Text style={styles.takenText}>
                    Username is already taken
                  </Text>
                ) : isAvailable ? (
                  <Text style={styles.availableText}>
                    Username is available
                  </Text>
                ) : null}
              </View>
            )}
          </View>
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

      <Controller
        control={control}
        name="agreeToTerms"
        render={({ field: { onChange, value } }) => (
          <View style={styles.checkboxContainer}>
            <Checkbox value={value} onValueChange={onChange}>
              <View style={styles.checkboxTextContainer}>
                <Text style={styles.checkboxText}>I agree to Splitify </Text>
                <TouchableOpacity onPress={() => console.log("Terms & Policy")}>
                  <Text style={styles.linkText}>Terms & Policy</Text>
                </TouchableOpacity>
              </View>
            </Checkbox>
            {errors.agreeToTerms && (
              <Text style={styles.errorText}>
                {errors.agreeToTerms.message}
              </Text>
            )}
          </View>
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
  checkboxContainer: {
    marginTop: theme.spacing.sm,
  },
  checkboxTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginLeft: theme.spacing.sm,
  },
  checkboxText: {
    fontSize: 14,
    color: theme.colors.text,
  },
  linkText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: "500",
  },
  errorText: {
    fontSize: 12,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
    marginLeft: theme.spacing.lg,
  },
  usernameValidation: {
    marginTop: theme.spacing.xs,
    marginLeft: theme.spacing.sm,
  },
  checkingText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  takenText: {
    fontSize: 12,
    color: theme.colors.error,
  },
  availableText: {
    fontSize: 12,
    color: theme.colors.success || "#10B981",
  },
}));

export default SignUpForm;
