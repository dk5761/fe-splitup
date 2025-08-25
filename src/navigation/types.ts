import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { Friend } from "@/features/friends/types";
import { ExpenseStackParamList } from "./ExpenseStack";

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
};

export type AccountStackParamList = {
  Account: undefined;
  PersonalInfo: undefined;
  AccountSecurity: undefined;
};

export type TabParamList = {
  Home: undefined;
  Groups: undefined;
  Scan: undefined;
  Friends: undefined;
  Account: NavigatorScreenParams<AccountStackParamList>;
};

export type FriendsStackParamList = {
  FriendsScreen: undefined;
  AddFriendScreen: undefined;
  FriendDetailScreen: { friend: Friend };
};

export type GroupStackParamList = {
  GroupsScreen: undefined;
  CreateGroupScreen: undefined;
  GroupDetailScreen: { groupId: string };
  AddGroupExpenseScreen: { groupId: string };
};

export type MainStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  FriendsStack: NavigatorScreenParams<FriendsStackParamList>;
  GroupStack: NavigatorScreenParams<GroupStackParamList>;
  ExpenseStack: NavigatorScreenParams<ExpenseStackParamList>;
  AccountStack: NavigatorScreenParams<AccountStackParamList>;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainStackParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
