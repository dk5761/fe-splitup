import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { Friend } from "@/features/friends/types";

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
};

export type TabParamList = {
  Home: undefined;
  Groups: undefined;
  Scan: undefined;
  Friends: undefined;
  Account: undefined;
};

export type FriendsStackParamList = {
  FriendsScreen: undefined;
  AddFriendScreen: undefined;
  FriendDetailScreen: { friend: Friend };
};

export type GroupStackParamList = {
  GroupsScreen: undefined;
};

export type MainStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  FriendsStack: NavigatorScreenParams<FriendsStackParamList>;
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
