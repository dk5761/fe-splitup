import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import {
  PersonalInfoSchema,
  personalInfoSchema,
} from "@/features/account/forms/PersonalInfoForm";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AccountStackParamList } from "@/navigation/types";
import { useQuery } from "@tanstack/react-query";
import { meQuery } from "@/features/account/api";
import { appToast } from "@/components/toast";
import { useUpdateProfileMutation } from "@/features/account/api/mutationFn";
import { PersonalInfoForm } from "../../forms/PersonalInfoForm/PersonalInfoForm";

type PersonalInfoScreenNavigationProp = NativeStackNavigationProp<
  AccountStackParamList,
  "PersonalInfo"
>;

export const PersonalInfoScreen = () => {
  const { theme } = useUnistyles();
  const navigation = useNavigation<PersonalInfoScreenNavigationProp>();
  const { data: user, isLoading, isError } = useQuery(meQuery());
  const updateProfileMutation = useUpdateProfileMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<PersonalInfoSchema>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        username: user.username,
        email: user.email,
      });
    }
  }, [user, reset]);

  const handleUpdateProfile = async (data: PersonalInfoSchema) => {
    updateProfileMutation.mutate(data, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (isError || !user) {
    appToast.error("Failed to load user data");
    return (
      <View style={styles.errorContainer}>
        <Text style={{ color: theme.colors.error }}>
          Error: Could not load user data.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PersonalInfoForm control={control} errors={errors} />

      <View style={styles.saveButtonWrapper}>
        <Button
          title={updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
          onPress={handleSubmit(handleUpdateProfile)}
          disabled={updateProfileMutation.isPending}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
  },
  saveButtonWrapper: {
    marginTop: theme.spacing.xl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
}));
