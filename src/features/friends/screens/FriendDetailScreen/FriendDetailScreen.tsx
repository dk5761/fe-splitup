// src/screens/FriendDetailScreen.tsx

import { useRoute, useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { useRef } from "react";
import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useAnimatedRef, // FIX: Import useAnimatedRef
  scrollTo, // FIX: Import scrollTo
  withTiming, // FIX: Import withTiming
} from "react-native-reanimated";
import { useUnistyles } from "react-native-unistyles";
import { useRemoveFriend } from "../../api/mutationFn";
import { stylesheet, MAIN_HEADER_HEIGHT } from "./FriendDetailScreen.styles";
import {
  AppBottomSheet,
  AppBottomSheetHeader,
  AppBottomSheetRef,
  Button,
} from "@/components/ui/";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { Trash2 } from "lucide-react-native";

// Mock data for the transaction list
const MOCK_TRANSACTIONS = Array.from({ length: 20 }, (_, i) => ({
  id: `trans_${i + 1}`,
  name: `Transaction #${i + 1}`,
}));

const FriendDetailScreen = () => {
  const { theme } = useUnistyles();
  const styles = stylesheet; // Use styles from the imported stylesheet
  const route = useRoute();
  const navigation = useNavigation();
  const { friend } = route.params as {
    friend: { id: string; name: string; email: string };
  };
  const aref = useAnimatedRef<Animated.ScrollView>();
  const bottomSheetRef = useRef<AppBottomSheetRef>(null);
  const { mutate: removeFriend, isPending } = useRemoveFriend();

  // --- Animation Setup ---
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

  const onScrollEndDrag = ({ nativeEvent }: { nativeEvent: any }) => {
    const offsetY = nativeEvent.contentOffset.y;
    const velocityY = nativeEvent.velocity.y;

    // --- FIX: Only apply snapping logic if the user is within the header area ---
    if (offsetY > 0 && offsetY < MAIN_HEADER_HEIGHT) {
      const SNAP_THRESHOLD = MAIN_HEADER_HEIGHT / 2;

      // If scrolling up quickly, always snap to top
      if (velocityY < -0.5) {
        // Added a velocity threshold for responsiveness
        aref.current?.scrollTo({ y: 0, animated: true });
        return;
      }
      // If scrolling down quickly, always snap to bottom of header
      if (velocityY > 0.5) {
        aref.current?.scrollTo({ y: MAIN_HEADER_HEIGHT, animated: true });
        return;
      }

      // If scrolling slowly, snap based on position
      if (offsetY < SNAP_THRESHOLD) {
        aref.current?.scrollTo({ y: 0, animated: true });
      } else {
        aref.current?.scrollTo({ y: MAIN_HEADER_HEIGHT, animated: true });
      }
    }
    // If offsetY is >= MAIN_HEADER_HEIGHT, do nothing.
  };

  // --- End Animation Setup ---

  const handleRemoveFriend = () => {
    removeFriend(friend.id, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* --- STICKY HEADER --- */}
      <Animated.View
        style={[styles.stickyHeaderContainer, animatedStickyHeaderStyle]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>

        {/* New container for avatar and name */}
        <View style={styles.stickyHeaderLeft}>
          <Image
            source={{ uri: `https://i.pravatar.cc/150?u=${friend.id}` }}
            style={styles.stickyHeaderAvatar}
          />
          <Text style={styles.stickyHeaderTitle}>{friend.name}</Text>
        </View>

        {/* Container for the delete icon on the right */}
        <View style={styles.stickyHeaderRight}>
          <TouchableOpacity onPress={() => bottomSheetRef.current?.present()}>
            <Trash2 size={24} color={theme.colors.error} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* --- SCROLLABLE CONTENT --- */}
      <Animated.ScrollView
        ref={aref}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onScrollEndDrag={onScrollEndDrag}
        decelerationRate="fast"
      >
        {/* --- MAIN HEADER --- */}
        <Animated.View style={animatedMainHeaderStyle}>
          <View style={styles.mainHeaderContainer}>
            {/* --- ADD THIS BACK BUTTON --- */}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.mainHeaderBackButton} // We'll add this style
            >
              <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
            </TouchableOpacity>
            {/* --------------------------- */}
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
              title="Delete Contact"
              onPress={() => bottomSheetRef.current?.present()}
              variant="outline"
              style={styles.deleteButton}
              // textStyle={styles.deleteButtonText} // Pass textStyle to your Button component
            />
          </View>
        </Animated.View>

        {/* --- TRANSACTION LIST --- */}
        <Text style={styles.listHeader}>Transactions</Text>
        {MOCK_TRANSACTIONS.map((item) => (
          <View key={item.id} style={styles.transactionItem}>
            <Text style={styles.transactionText}>{item.name}</Text>
          </View>
        ))}
      </Animated.ScrollView>

      {/* --- BOTTOM SHEET --- */}
      <AppBottomSheet ref={bottomSheetRef}>
        <BottomSheetView style={styles.bottomSheetContent}>
          <AppBottomSheetHeader title="Delete Contact" variant="destructive" />
          <Text style={styles.bottomSheetMessage}>
            Delete "{friend.name}" from your contacts?
          </Text>
          <View style={styles.bottomSheetButtons}>
            <Button
              title="Cancel"
              style={{ flex: 1 }}
              onPress={() => bottomSheetRef.current?.close()}
              variant="outline"
            />
            <Button
              title="Yes, Delete"
              variant="primary" // Destructive primary button
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
