import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { getFriendsQuery } from "../api/query";
import { Friend } from "../types/friends.types";
import { stylesheet as styles } from "./FriendsScreen.styles";

import { SearchInput } from "@/components/ui/searchInput";
import { FriendsStackParamList } from "@/navigation/types";

const FriendsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<FriendsStackParamList>>();
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery(getFriendsQuery());

  const friends = data?.pages.flatMap((page) => page.data) ?? [];

  const renderItem = ({ item }: { item: Friend }) => (
    <View style={styles.friendItem}>
      <Image
        source={{ uri: `https://i.pravatar.cc/150?u=${item.id}` }}
        style={styles.avatar}
      />
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{item.name}</Text>
        <Text style={styles.friendEmail}>{item.email}</Text>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return <ActivityIndicator style={{ paddingVertical: 20 }} />;
  };

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
      <SearchInput placeholder="Search contact" onSearch={() => {}} />
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.activeTabText}>All Contacts</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={friends}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text>No friends found.</Text>
          </View>
        }
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddFriendScreen")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FriendsScreen;
