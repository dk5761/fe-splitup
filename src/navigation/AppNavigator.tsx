import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ExampleScreen } from "@/features/example/screens";

const MainStack = createNativeStackNavigator({
  screens: {
    Home: { screen: ExampleScreen, options: { title: "Components" } },
  },
});

export const AppNavigation = createStaticNavigation(MainStack);
