import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountStackParamList } from "@/navigation/types"; // Import updated navigation types
import Header from "@/components/layout/header/Header"; // Assuming a generic Header component
import { AccountScreen } from "@/features/account/screens/AccountScreen";
import { PersonalInfoScreen } from "@/features/account/screens/PersonalInfoScreen";
import { AccountSecurityScreen } from "@/features/account/screens/AccountSecurityScreen";

const Stack = createNativeStackNavigator<AccountStackParamList>();

export const AccountNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: "Account",
          headerShown: true,
          header: (props) => (
            <Header title={props.options.title || ""} canGoBack={false} />
          ),
        }}
      />
      <Stack.Screen
        name="PersonalInfo"
        component={PersonalInfoScreen}
        options={{
          title: "Personal Info",
          headerShown: true,
          header: (props) => (
            <Header title={props.options.title || ""} canGoBack={true} />
          ),
        }}
      />
      <Stack.Screen
        name="AccountSecurity"
        component={AccountSecurityScreen}
        options={{
          title: "Account & Security",
          headerShown: true,
          header: (props) => (
            <Header title={props.options.title || ""} canGoBack={true} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
