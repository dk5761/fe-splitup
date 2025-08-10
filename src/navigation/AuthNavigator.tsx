import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, RegisterScreen } from "@/features/auth";

const AuthStack = createNativeStackNavigator({
  screens: {
    Login: { screen: LoginScreen, options: { headerShown: false } },
    Register: {
      screen: RegisterScreen,
      options: { headerShown: false },
    },
  },
});

export const AuthNavigation = createStaticNavigation(AuthStack);
