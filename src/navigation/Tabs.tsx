import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CustomTabBar } from "@/components/bottomTabs/CustomTabBar";
import { View } from "react-native";
import { HomeScreen } from "@/features/home/screens";

import { TabParamList } from "./types";
import { FriendsStackNavigator } from "./FriendsStack";
import { GroupStackNavigator } from "./GroupStack";
import { AccountNavigator } from "./AccountStack";

const Tab = createBottomTabNavigator<TabParamList>();

export const Tabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Groups" component={GroupStackNavigator} />
      {/* <Tab.Screen name="Scan" component={ScanScreen} /> */}
      <Tab.Screen name="Friends" component={FriendsStackNavigator} />
      <Tab.Screen name="AccountTab" component={AccountNavigator} />
    </Tab.Navigator>
  );
};
