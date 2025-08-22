import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FriendsScreen from "@/features/friends/screens/FriendsScreen";
import AddFriendScreen from "@/features/friends/screens/AddFriendScreen";
import { FriendsStackParamList } from "./types";

const FriendsStack = createNativeStackNavigator<FriendsStackParamList>();

export function FriendsStackNavigator() {
  return (
    <FriendsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <FriendsStack.Screen
        name="FriendsScreen"
        component={FriendsScreen}
        options={{ title: "Friends" }}
      />
      <FriendsStack.Screen
        name="AddFriendScreen"
        component={AddFriendScreen}
        options={{ title: "Add Friend" }}
      />
    </FriendsStack.Navigator>
  );
}
