import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CustomTabBar } from "@/components/bottomTabs/CustomTabBar";
import { View } from "react-native";
import { HomeScreen } from "@/features/home/screens";
import CompoundDropdownScreen from "./ecample";
import { TabParamList } from "./types";
import { FriendsStackNavigator } from "./FriendsStack";
import { GroupStackNavigator } from "./GroupStack";
import { AccountNavigator } from "./AccountStack";

// --- Your Screen Components ---
const ScanScreen = () => <CompoundDropdownScreen />; // This can be a modal screen
const AccountScreen = () => (
  <View style={{ flex: 1, backgroundColor: "red" }} />
);

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
