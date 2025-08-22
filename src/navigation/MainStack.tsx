import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { MainStackParamList } from "./types";
import { Tabs } from "./Tabs";

const MainStack = createNativeStackNavigator<MainStackParamList>();

export function MainStackNavigator() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: Platform.select<NativeStackNavigationOptions["animation"]>({
          ios: "fade",
          android: "fade",
          default: "fade",
        }),
      }}
    >
      <MainStack.Screen
        name="Tabs"
        component={Tabs}
        options={{ title: "Home" }}
      />
    </MainStack.Navigator>
  );
}