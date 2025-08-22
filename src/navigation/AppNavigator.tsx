import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { Platform, useColorScheme } from "react-native";
import { useAuthContext } from "@/features/auth";
import { RootStackParamList, AuthStackParamList } from "./types";
import {
  LoginScreen,
  WelcomeScreen,
  SignUpScreen,
} from "@/features/auth/screens";
import { MainStackNavigator } from "./MainStack";
import { AuthStack } from "./AuthStack";

const RootStack = createNativeStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  linking?: any;
  onReady?: () => void;
}

export function AppNavigator({ linking, onReady }: AppNavigatorProps) {
  const { isAuthenticated } = useAuthContext();
  const scheme = useColorScheme();

  return (
    <NavigationContainer
      theme={scheme === "dark" ? DarkTheme : DefaultTheme}
      linking={linking}
      onReady={onReady}
    >
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <RootStack.Screen name="Main" component={MainStackNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
