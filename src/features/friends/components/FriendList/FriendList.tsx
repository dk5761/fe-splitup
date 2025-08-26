import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import { useUnistyles } from "react-native-unistyles";

import { Friend, FriendRequest } from "../../types/friends.types";
import { FriendListItem } from "../FriendListItem";
import { stylesheet as styles } from "./FriendList.styles";
import RequestsList from "../RequestsList/RequestsList";

interface FriendListProps {
  friends: Friend[];
  onEndReached: () => void;
  isFetchingNextPage: boolean;
  ListEmptyComponent: React.ComponentType<any> | React.ReactElement | null;
}

export const FriendList = React.memo(
  ({
    friends,
    onEndReached,
    isFetchingNextPage,
    ListEmptyComponent,
  }: FriendListProps) => {
    const { theme } = useUnistyles();

    const [activeTab, setActiveTab] = useState<"friends" | "requests">(
      "friends"
    );

    const handlePressTab =
      (tab: "friends" | "requests") => (_e?: GestureResponderEvent) =>
        setActiveTab(tab);

    const renderFriendItem = useCallback(
      ({ item }: { item: Friend }) => <FriendListItem item={item} />,
      []
    );

    const renderFooter = useCallback(() => {
      if (!isFetchingNextPage) return null;
      return <ActivityIndicator style={{ paddingVertical: 20 }} />;
    }, [isFetchingNextPage]);

    const friendsList = useMemo(
      () => (
        <FlatList
          data={friends}
          renderItem={renderFriendItem}
          keyExtractor={(item) => item.id}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={ListEmptyComponent}
          removeClippedSubviews
          maxToRenderPerBatch={10}
          windowSize={7}
        />
      ),
      [
        friends,
        renderFriendItem,
        onEndReached,
        renderFooter,
        ListEmptyComponent,
      ]
    );

    return (
      <View>
        <View style={styles.tabContainer}>
          <View style={styles.tabWrapper}>
            <Pressable
              onPress={handlePressTab("friends")}
              style={styles.tabPressable}
              accessibilityRole="button"
              accessibilityState={{ selected: activeTab === "friends" }}
            >
              <Text
                style={
                  activeTab === "friends"
                    ? styles.tabTextActive
                    : styles.tabTextInactive
                }
              >
                Friends
              </Text>
            </Pressable>
          </View>

          <View style={styles.tabWrapper}>
            <Pressable
              onPress={handlePressTab("requests")}
              style={styles.tabPressable}
              accessibilityRole="button"
              accessibilityState={{ selected: activeTab === "requests" }}
            >
              <Text
                style={
                  activeTab === "requests"
                    ? styles.tabTextActive
                    : styles.tabTextInactive
                }
              >
                Requests
              </Text>
            </Pressable>
          </View>
        </View>

        {activeTab === "friends" ? (
          friendsList
        ) : (
          <RequestsList
            ListEmptyComponent={
              <View style={{ padding: 24 }}>
                <Text>No requests found.</Text>
              </View>
            }
          />
        )}
      </View>
    );
  }
);
