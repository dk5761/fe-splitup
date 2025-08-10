import { createStaticNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { ExampleScreen } from "@/features/example/screens";

const MainStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: true,
    animation: Platform.select<NativeStackNavigationOptions["animation"]>({
      ios: "fade",
      android: "fade",
      default: "fade",
    }),
  },
  screens: {
    Home: { screen: ExampleScreen, options: { title: "Components" } },
  },
});

export const AppNavigation = createStaticNavigation(MainStack);
