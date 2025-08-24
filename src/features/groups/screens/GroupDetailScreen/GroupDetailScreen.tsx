import React, { useState, useLayoutEffect } from "react";
import { View, ActivityIndicator, useWindowDimensions } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { TabView, SceneMap } from "react-native-tab-view";
import { styles } from "./GroupDetailScreen.styles";
import { getGroupDetailsQuery } from "../../api/query";
import { GroupDetailHeader } from "../../components/GroupDetailHeader";
import { Fab } from "@/components/ui/fab";
import { GroupStackParamList, RootStackParamList } from "@/navigation/types";
import { MoreVertical } from "lucide-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ExpensesTab } from "./tabs/ExpensesTab";
import { BalancesTab } from "./tabs/BalancesTab";
import { TotalsTab } from "./tabs/TotalsTab";
import { MembersTab } from "./tabs/MembersTab";

type GroupDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Main"
>;

type GroupDetailScreenRouteProp = RouteProp<
  GroupStackParamList,
  "GroupDetailScreen"
>;

type GroupNavProp = NativeStackNavigationProp<
  GroupStackParamList,
  "GroupDetailScreen"
>;

export const GroupDetailScreen = () => {
  const layout = useWindowDimensions();
  const route = useRoute<GroupDetailScreenRouteProp>();
  const navigation = useNavigation<GroupNavProp>();
  const { groupId } = route.params;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "expenses", title: "Expenses" },
    { key: "balances", title: "Balances" },
    { key: "totals", title: "Totals" },
    { key: "members", title: "Members" },
  ]);

  const { data: group, isLoading: isGroupLoading } = useQuery(
    getGroupDetailsQuery(groupId)
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: group?.name || "Group Details",
      headerRight: () => <MoreVertical />,
    });
  }, [navigation, group]);

  const renderScene = SceneMap({
    expenses: () => <ExpensesTab groupId={groupId} />,
    balances: BalancesTab,
    totals: TotalsTab,
    members: () => <MembersTab groupId={groupId} />,
  });

  if (isGroupLoading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => <GroupDetailHeader group={group} {...props} />}
        lazy
      />
      <Fab
        text="Add Expense"
        onPress={() =>
          navigation.navigate("AddGroupExpenseScreen", {
            groupId,
          })
        }
      />
    </View>
  );
};
