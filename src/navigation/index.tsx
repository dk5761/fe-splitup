import { StaticParamList } from "@react-navigation/native";
import { AppNavigation } from "./AppNavigator";
import { useAuthContext } from "@/features/auth";

export function Navigation(props: any) {
  const { isAuthenticated } = useAuthContext();
  const Component = AppNavigation as any;
  return <Component {...props} />;
}

type RootStackParamList = StaticParamList<any>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
