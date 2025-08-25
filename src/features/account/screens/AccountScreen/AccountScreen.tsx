import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { AccountHeader, AccountSection } from "@/features/account/components";
import { Feather } from "@expo/vector-icons";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@react-navigation/native";
import { AccountStackParamList } from "@/navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { meQuery } from "@/features/account/api";
import { appToast } from "@/components/toast";
import { useAuthContext } from "@/features/auth/context";
import { styles } from "./AccountScreen.styles";

type AccountScreenNavigationProp = NativeStackNavigationProp<
  AccountStackParamList,
  "Account"
>;

export const AccountScreen = () => {
  const { theme } = useUnistyles();
  const navigation = useNavigation<AccountScreenNavigationProp>();
  const { signOut } = useAuthContext();

  const { data: user, isLoading, isError } = useQuery(meQuery());

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (isError) {
    appToast.error("Failed to load user data");
    return (
      <View style={styles.errorContainer}>
        <Text style={{ color: theme.colors.error }}>
          Error: Could not load user data.
        </Text>
      </View>
    );
  }

  const handleLogout = () => {
    signOut();
  };

  return (
    <View style={styles.container}>
      <AccountHeader user={user || null} />

      <View style={styles.sectionContainer}>
        <AccountSection
          icon={
            <Feather name="user" size={20} color={theme.colors.textSecondary} />
          }
          title="Personal Info"
          onPress={() => navigation.navigate("PersonalInfo")}
        />
        <AccountSection
          icon={
            <Feather
              name="shield"
              size={20}
              color={theme.colors.textSecondary}
            />
          }
          title="Account & Security"
          onPress={() => navigation.navigate("AccountSecurity")}
        />
      </View>

      <View style={styles.logoutButtonWrapper}>
        <Button
          onPress={handleLogout}
          variant="ghost"
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: theme.spacing.md,
          }}
        >
          <Text style={{ color: theme.colors.error }}>Logout</Text>
          <Feather name="log-out" size={20} color={theme.colors.error} />
        </Button>
      </View>
    </View>
  );
};
