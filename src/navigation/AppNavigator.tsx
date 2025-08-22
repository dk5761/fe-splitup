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
import { ExampleScreen } from "@/features/example/screens";
import { useAuthContext } from "@/features/auth";
import {
  RootStackParamList,
  MainStackParamList,
  AuthStackParamList,
} from "./types";
import { LoginScreen, WelcomeScreen } from "@/features/auth/screens";

const RootStack = createNativeStackNavigator<RootStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();
const AuthStackNavigator = createNativeStackNavigator<AuthStackParamList>();

function MainStackNavigator() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: true,
        animation: Platform.select<NativeStackNavigationOptions["animation"]>({
          ios: "fade",
          android: "fade",
          default: "fade",
        }),
      }}
    >
      <MainStack.Screen
        name="Home"
        component={ExampleScreen}
        options={{ title: "Components" }}
      />
    </MainStack.Navigator>
  );
}

function AuthStack() {
  return (
    <AuthStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Welcome"
    >
      <AuthStackNavigator.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ title: "Welcome" }}
      />
      <AuthStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
    </AuthStackNavigator.Navigator>
  );
}

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
        initialRouteName={isAuthenticated ? "Main" : "Auth"}
      >
        <RootStack.Screen name="Main" component={MainStackNavigator} />
        <RootStack.Screen name="Auth" component={AuthStack} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
