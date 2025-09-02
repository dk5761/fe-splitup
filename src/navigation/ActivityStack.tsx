import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityScreen } from "@/features/activity/screens";
import Header from "@/components/layout/header/Header";

export type ActivityStackParamList = {
  ActivityFeed: undefined;
};

const Stack = createNativeStackNavigator<ActivityStackParamList>();

export const ActivityStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="ActivityFeed" 
        component={ActivityScreen} 
        options={{ 
          title: "Activity Feed",
          headerShown: true,
          header: (props) => (
            <Header title={props.options.title || ""} canGoBack={false} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};