import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { Platform, View } from "react-native";
import { MainStackParamList } from "./types";
import { Tabs } from "./Tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUnistyles } from "react-native-unistyles";
import Header from "@/components/layout/header/Header";
import { FriendsStackNavigator } from "./FriendsStack";
import { GroupStackNavigator } from "./GroupStack";

const MainStack = createNativeStackNavigator<MainStackParamList>();

export function MainStackNavigator() {
  const insets = useSafeAreaInsets();
  const { theme } = useUnistyles();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <MainStack.Navigator
        screenOptions={{
          header: (props) => <Header title={props.options.title || ""} />,
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
          animation: Platform.select<NativeStackNavigationOptions["animation"]>(
            {
              ios: "fade",
              android: "fade",
              default: "fade",
            }
          ),
        }}
      >
        <MainStack.Screen
          name="Tabs"
          component={Tabs}
          options={{ title: "Home", headerShown: false }}
        />
        <MainStack.Screen
          name="FriendsStack"
          component={FriendsStackNavigator}
          options={{ title: "Friends" }}
        />
        <MainStack.Screen
          name="GroupStack"
          component={GroupStackNavigator}
          options={{ title: "Groups" }}
        />
      </MainStack.Navigator>
    </View>
  );
}
