import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FriendsScreen from "@/features/friends/screens/FriendsScreen";
import AddFriendScreen from "@/features/friends/screens/AddFriendScreen";
import { FriendsStackParamList } from "./types";
import Header from "@/components/layout/header/Header";
import { useUnistyles } from "react-native-unistyles";

const FriendsStack = createNativeStackNavigator<FriendsStackParamList>();

export function FriendsStackNavigator() {
  const { theme } = useUnistyles();
  return (
    <FriendsStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <FriendsStack.Screen
        name="FriendsScreen"
        component={FriendsScreen}
        options={{
          title: "Friends",
          headerShown: true,
          header: (props) => (
            <Header
              title={props.options.title || ""}
              canGoBack={false}
              // textStyle={{ fontSize: 20, fontWeight: "bold" }}
            />
          ),
        }}
      />
      <FriendsStack.Screen
        name="AddFriendScreen"
        component={AddFriendScreen}
        options={{
          title: "Add Friend",
          headerShown: true,
          header: (props) => <Header title={props.options.title || ""} />,
        }}
      />
    </FriendsStack.Navigator>
  );
}
