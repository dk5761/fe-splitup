import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  LoginScreen,
  WelcomeScreen,
  SignUpScreen,
} from "@/features/auth/screens";
import { AuthStackParamList } from "./types";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AuthStackNavigator = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <AuthStackNavigator.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Welcome"
      >
        <AuthStackNavigator.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ title: "Welcome" }}
        />
        <AuthStackNavigator.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <AuthStackNavigator.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: "Sign Up" }}
        />
      </AuthStackNavigator.Navigator>
    </View>
  );
}
