import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getFriendsQuery } from "../../api/query";
import { FriendList, FriendListHeader } from "../../components";
import { stylesheet as styles } from "./FriendsScreen.styles";
import { Fab } from "@/components/ui";

const FriendsScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation();
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery(getFriendsQuery());

  const friends = data?.pages.flatMap((page) => page.data) ?? [];

  const onEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FriendListHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FriendList
        friends={friends}
        onEndReached={onEndReached}
        isFetchingNextPage={isFetchingNextPage}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text>No friends found.</Text>
          </View>
        }
      />
      <Fab onPress={() => navigation.navigate("AddFriendScreen" as never)} />
    </View>
  );
};

export default FriendsScreen;
