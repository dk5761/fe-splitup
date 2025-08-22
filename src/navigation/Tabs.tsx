import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CustomTabBar } from "@/components/bottomTabs/CustomTabBar";
import { SafeAreaView, View } from "react-native";
import { HomeScreen } from "@/features/home/screens";
import { GroupsScreen } from "@/features/groups/screens";

// --- Your Screen Components ---
const ScanScreen = () => (
  <View style={{ flex: 1, backgroundColor: "purple" }} />
); // This can be a modal screen
const ContactsScreen = () => (
  <View style={{ flex: 1, backgroundColor: "orange" }} />
);
const AccountScreen = () => (
  <View style={{ flex: 1, backgroundColor: "red" }} />
);

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      // Pass our custom component to the tabBar prop
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Groups" component={GroupsScreen} />
      {/* This screen acts as a placeholder to create space for the center button */}
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};
