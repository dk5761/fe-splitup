import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { useUnistyles } from "react-native-unistyles";

import { useSendFriendRequest } from "../api/mutationFn";
import { searchUsersQuery } from "../api/query";
import { Friend } from "../types/friends.types";
import { stylesheet as styles } from "./AddFriendScreen.styles";

import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/searchInput";
import { useDebounce } from "@/hooks/useDebounce";

const AddFriendScreen = () => {
  const { theme } = useUnistyles();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: users, isLoading } = useQuery(
    searchUsersQuery(debouncedSearchTerm)
  );
  const { mutate: sendFriendRequest, isPending } = useSendFriendRequest();

  const handleAddFriend = (userId: string) => {
    sendFriendRequest(userId);
  };

  const renderUser = (user: Friend) => (
    <View style={styles.userItem}>
      <Image
        source={{ uri: `https://i.pravatar.cc/150?u=${user.id}` }}
        style={styles.avatar}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>
      <Button
        title="Add to My Contact"
        onPress={() => handleAddFriend(user.id)}
        disabled={isPending}
        style={styles.addButton}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <SearchInput
          placeholder="Search by email"
          value={searchTerm}
          onSearch={setSearchTerm}
        />
        {isLoading && <ActivityIndicator style={{ marginTop: 20 }} />}
        {users && users.length > 0 && (
          <View style={styles.resultsContainer}>{users.map(renderUser)}</View>
        )}
        {users && users.length === 0 && debouncedSearchTerm && (
          <Text style={styles.noResultsText}>No users found.</Text>
        )}
      </View>
    </View>
  );
};

export default AddFriendScreen;
