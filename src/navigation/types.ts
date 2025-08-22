import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
};

export type MainStackParamList = {
  Home: undefined;
};

export type RootStackParamList = {
  Main: MainStackParamList;
  Auth: AuthStackParamList;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
