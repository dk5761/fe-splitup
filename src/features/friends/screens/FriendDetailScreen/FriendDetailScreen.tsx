import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { Image } from "expo-image";
import React, { useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useAnimatedRef,
} from "react-native-reanimated";
import { useUnistyles } from "react-native-unistyles";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { Trash2 } from "lucide-react-native";
import { BottomSheetView } from "@gorhom/bottom-sheet";

import { useRemoveFriend } from "../../api/mutationFn";
import { getFriendExpensesQuery } from "../../api/query";
import { ExpenseListItem } from "../../components";
import { stylesheet, MAIN_HEADER_HEIGHT } from "./FriendDetailScreen.styles";

import {
  AppBottomSheet,
  AppBottomSheetHeader,
  AppBottomSheetRef,
  Button,
} from "@/components/ui/";
import { useTabBar } from "@/shared/context/TabBarContext";

const FriendDetailScreen = () => {
  const { theme } = useUnistyles();
  const styles = stylesheet;
  const route = useRoute();
  const navigation = useNavigation();
  const { friend } = route.params as {
    friend: { id: string; name: string; email: string };
  };
  const aref = useAnimatedRef<Animated.FlatList<any>>();
  const bottomSheetRef = useRef<AppBottomSheetRef>(null);
  const { mutate: removeFriend, isPending } = useRemoveFriend();
  const { showTabBar, hideTabBar } = useTabBar();

  useFocusEffect(
    React.useCallback(() => {
      hideTabBar();
      return () => showTabBar();
    }, [hideTabBar, showTabBar])
  );

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery(getFriendExpensesQuery(friend.id));

  const expenses = data?.pages.flatMap((page) => page.data) ?? [];

  const onEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedMainHeaderStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, MAIN_HEADER_HEIGHT / 2],
      [1, 0],
      Extrapolate.CLAMP
    ),
  }));

  const animatedStickyHeaderStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [MAIN_HEADER_HEIGHT / 2, MAIN_HEADER_HEIGHT - 60],
      [0, 1],
      Extrapolate.CLAMP
    ),
  }));

  const handleRemoveFriend = () => {
    removeFriend(friend.id, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  const renderListHeader = () => (
    <>
      <Animated.View style={animatedMainHeaderStyle}>
        <View style={styles.mainHeaderContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.mainHeaderBackButton}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Image
            source={{ uri: `https://i.pravatar.cc/150?u=${friend.id}` }}
            style={styles.avatar}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{friend.name}</Text>
            <Text style={styles.email}>{friend.email}</Text>
            <Text style={styles.accountType}>Splitify Account</Text>
          </View>
          <Button
            title="Remove Contact"
            onPress={() => bottomSheetRef.current?.present()}
            variant="outline"
            style={styles.deleteButton}
          />
        </View>
      </Animated.View>
      <Text style={styles.listHeader}>Transactions</Text>
    </>
  );

  const renderEmptyList = () => {
    if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.centered}>
        <Text>No expenses with this friend yet.</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Animated.View
        style={[styles.stickyHeaderContainer, animatedStickyHeaderStyle]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>

        <View style={styles.stickyHeaderLeft}>
          <Image
            source={{ uri: `https://i.pravatar.cc/150?u=${friend.id}` }}
            style={styles.stickyHeaderAvatar}
          />
          <Text style={styles.stickyHeaderTitle}>{friend.name}</Text>
        </View>

        <View style={styles.stickyHeaderRight}>
          <TouchableOpacity onPress={() => bottomSheetRef.current?.present()}>
            <Trash2 size={24} color={theme.colors.error} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.FlatList
        ref={aref}
        data={expenses}
        renderItem={({ item }) => <ExpenseListItem expense={item} />}
        keyExtractor={(item) => item.id}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      />

      <AppBottomSheet ref={bottomSheetRef}>
        <BottomSheetView style={styles.bottomSheetContent}>
          <AppBottomSheetHeader title="Remove Contact" variant="destructive" />
          <Text style={styles.bottomSheetMessage}>
            Remove "{friend.name}" from your contacts?
          </Text>
          <View style={styles.bottomSheetButtons}>
            <Button
              title="Cancel"
              style={{ flex: 1 }}
              onPress={() => bottomSheetRef.current?.close()}
              variant="outline"
            />
            <Button
              title="Yes, Remove"
              variant="primary"
              style={{ flex: 1 }}
              onPress={handleRemoveFriend}
              loading={isPending}
            />
          </View>
        </BottomSheetView>
      </AppBottomSheet>
    </SafeAreaView>
  );
};

export default FriendDetailScreen;
