import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ExampleScreen } from "../features/example/screens";

const RootStack = createNativeStackNavigator({
  screens: {
    Main: {
      screen: ExampleScreen,
      options: {
        title: "Components",
        headerShown: true,
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
