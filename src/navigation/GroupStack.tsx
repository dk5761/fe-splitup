import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateGroupScreen, GroupsScreen } from "@/features/groups/screens";
import { GroupStackParamList } from "./types";
import Header from "@/components/layout/header/Header";
import { useUnistyles } from "react-native-unistyles";

const GroupStack = createNativeStackNavigator<GroupStackParamList>();

export function GroupStackNavigator() {
  const { theme } = useUnistyles();
  return (
    <GroupStack.Navigator
      screenOptions={{
        header: (props) => <Header title={props.options.title || ""} />,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <GroupStack.Screen
        name="GroupsScreen"
        component={GroupsScreen}
        options={{
          title: "Groups",
          headerShown: true,
          header: (props) => (
            <Header title={props.options.title || ""} canGoBack={false} />
          ),
        }}
      />
      <GroupStack.Screen
        name="CreateGroupScreen"
        component={CreateGroupScreen}
        options={{
          title: "Create Group",
          headerShown: true,
        }}
      />
    </GroupStack.Navigator>
  );
}
