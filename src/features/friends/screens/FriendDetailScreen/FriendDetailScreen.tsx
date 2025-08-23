import { useRoute, useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useUnistyles } from "react-native-unistyles";

import { useRemoveFriend } from "../../api/mutationFn";
import { stylesheet as styles } from "./FriendDetailScreen.styles";

import {
  AppBottomSheet,
  AppBottomSheetHeader,
  AppBottomSheetRef,
  Button,
} from "@/components/ui/";
import { BottomSheetView } from "@gorhom/bottom-sheet";

const FriendDetailScreen = () => {
  const { theme } = useUnistyles();
  const route = useRoute();
  const navigation = useNavigation();
  const { friend } = route.params as {
    friend: { id: string; name: string; email: string };
  };
  const bottomSheetRef = useRef<AppBottomSheetRef>(null);
  const { mutate: removeFriend, isPending } = useRemoveFriend();

  const handleRemoveFriend = () => {
    removeFriend(friend.id, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  return (
    <View style={styles.container}>
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
        // style={styles.deleteButton}
        onPress={() => bottomSheetRef.current?.present()}
        variant="outline"
        style={styles.deleteButton}
      />

      <View style={styles.actionButtonsContainer}>
        <Button
          title="Request"
          style={styles.actionButton}
          variant="outline"
          onPress={() => {}}
        />
        <Button title="Pay" style={styles.actionButton} onPress={() => {}} />
      </View>

      <AppBottomSheet ref={bottomSheetRef}>
        <BottomSheetView style={styles.bottomSheetContent}>
          <AppBottomSheetHeader title="Delete Contact" variant="destructive" />
          <Text style={styles.bottomSheetMessage}>
            Delete "{friend.name}" from your contacts?
          </Text>
          <View style={styles.bottomSheetButtons}>
            <Button
              title="Cancel"
              style={{ flex: 1, marginRight: 10 }}
              onPress={() => bottomSheetRef.current?.close()}
              variant="outline"
            />
            <Button
              title="Yes, Delete"
              style={[styles.deleteButton, { flex: 1, marginLeft: 10 }]}
              onPress={handleRemoveFriend}
              disabled={isPending}
            >
              <Text style={styles.deleteButtonText}>Yes, Delete</Text>
            </Button>
          </View>
        </BottomSheetView>
      </AppBottomSheet>
    </View>
  );
};

export default FriendDetailScreen;
