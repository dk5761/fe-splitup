import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettlementScreen } from "@/features/payment/screens";
import { PaymentStackParamList } from "./types";
import Header from "@/components/layout/header/Header";

const Stack = createNativeStackNavigator<PaymentStackParamList>();

export const PaymentStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        title: "Settlement",
        header: (props) => (
          <Header title={props.options.title || ""} canGoBack={true} />
        ),
      }}
    >
      <Stack.Screen
        name="SettlementScreen"
        component={SettlementScreen}
        options={{
          headerShown: true,
          title: "Settlement",
          header: (props) => (
            <Header title={props.options.title || ""} canGoBack={true} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
