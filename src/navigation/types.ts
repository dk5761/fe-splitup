import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { Friend } from "@/features/friends/types";
import { ExpenseStackParamList } from "./ExpenseStack";
import { ActivityStackParamList } from "./ActivityStack";

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
};

export type AccountStackParamList = {
  AccountScreenStack: undefined;
  PersonalInfo: undefined;
  AccountSecurity: undefined;
  UpdateProfileImage: undefined;
};

export type TabParamList = {
  Home: undefined;
  Activity: undefined;
  Groups: undefined;
  Scan: undefined;
  Friends: undefined;
  Account: NavigatorScreenParams<AccountStackParamList>;
};

export type FriendsStackParamList = {
  FriendsScreen: undefined;
  AddFriendScreen: undefined;
  FriendDetailScreen: { friend: Friend };
  BalanceBreakdownScreen: {
    friendId: string;
    friendName: string;
    currentBalance: number;
  };
};

export type GroupStackParamList = {
  GroupsScreen: undefined;
  GroupDetailScreen: { groupId: string };
  CreateGroupScreen: undefined;
  AddGroupExpenseScreen: { groupId: string };
};

export type MainStackParamList = {
  Tabs: undefined;
  FriendsStack: NavigatorScreenParams<FriendsStackParamList>;
  GroupStack: NavigatorScreenParams<GroupStackParamList>;
  ExpenseStack: NavigatorScreenParams<ExpenseStackParamList>;
  AccountStack: NavigatorScreenParams<AccountStackParamList>;
  ActivityStack: NavigatorScreenParams<ActivityStackParamList>;
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
