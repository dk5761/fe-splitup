import { createStaticNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { LoginScreen, RegisterScreen } from "@/features/auth";

const AuthStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
    animation: Platform.select<NativeStackNavigationOptions["animation"]>({
      ios: "fade",
      android: "fade",
      default: "fade",
    }),
  },
  screens: {
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen },
  },
});

export const AuthNavigation = createStaticNavigation(AuthStack);
