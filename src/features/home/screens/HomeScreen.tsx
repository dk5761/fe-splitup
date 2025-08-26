import { View, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getBalancesQuery } from "../api";
import { ActivityHeader } from "../components/ActivityHeader";
import { ActivityList } from "../components/ActivityList";
import { useUnistyles } from "react-native-unistyles";
import { Button } from "@/components";
import { appToast } from "@/components/toast";

export const HomeScreen = () => {
  const { data, isLoading, isError, refetch, isRefetching } = useQuery(
    getBalancesQuery()
  );
  const { theme } = useUnistyles();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <ActivityHeader />
        <ActivityList
          balances={data?.balances ?? []}
          isLoading={isLoading}
          isError={isError}
          onRefresh={refetch}
          refreshing={isRefetching}
        />
      </View>
    </View>
  );
};
