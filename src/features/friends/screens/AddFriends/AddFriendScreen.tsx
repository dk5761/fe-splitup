import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { useFocusEffect } from "@react-navigation/native";

import { searchUsersQuery } from "../../api/query";
import { UserList } from "../../components";

import { SearchInput } from "@/components/ui/searchInput";
import { useDebounce } from "@/hooks/useDebounce";
import { useTabBar } from "@/shared/context/TabBarContext";

const AddFriendScreen = () => {
  const { theme } = useUnistyles();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { showTabBar, hideTabBar } = useTabBar();

  useFocusEffect(
    React.useCallback(() => {
      hideTabBar();
      return () => showTabBar();
    }, [hideTabBar, showTabBar])
  );

  const { data: users, isLoading } = useQuery(
    searchUsersQuery(debouncedSearchTerm)
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <SearchInput
          placeholder="Search by email"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        {isLoading && <ActivityIndicator style={{ marginTop: 20 }} />}
        <UserList
          users={users ?? []}
          debouncedSearchTerm={debouncedSearchTerm}
        />
      </View>
    </View>
  );
};

export default AddFriendScreen;
