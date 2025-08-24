import React, { useState, useEffect, useCallback } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { BottomSheetView } from "@gorhom/bottom-sheet";

import { stylesheet as styles } from "./SplitByBottomSheet.styles";
import { SplitTypeSelector } from "./components/SplitTypeSelector";
import { ParticipantListItem } from "./components/ParticipantListItem";
import { SplitSummary } from "./components/SplitSummary";
import { SplitByBottomSheetProps } from "./types";
import { GroupMemberDetails } from "@/features/groups/types";
import { useQuery } from "@tanstack/react-query";
import { getGroupMembersQuery } from "@/features/groups/api/query";

export const SplitByBottomSheet: React.FC<SplitByBottomSheetProps> = ({
  groupId,
  totalAmount,
  onSubmit,
  onClose,
  payerId: initialPayerId,
  participants: initialParticipants,
}) => {
  const [splitType, setSplitType] = useState<"EQUAL">("EQUAL");
  const [selectedParticipants, setSelectedParticipants] = useState<
    Record<string, boolean>
  >({});
  const [payerId, setPayerId] = useState<string | undefined>(initialPayerId);

  // This will be expanded to handle friendId as well
  const { data: members, isLoading } = useQuery({
    ...getGroupMembersQuery(groupId!),
    enabled: !!groupId,
  });

  useEffect(() => {
    const initialSelection = initialParticipants.reduce((acc, p) => {
      acc[p.user_id] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setSelectedParticipants(initialSelection);
  }, [initialParticipants]);

  const handleSelectParticipant = useCallback((userId: string) => {
    setSelectedParticipants((prev) => {
      const newSelection = { ...prev };
      if (newSelection[userId]) {
        delete newSelection[userId];
        if (payerId === userId) {
          setPayerId(undefined);
        }
      } else {
        newSelection[userId] = true;
      }
      return newSelection;
    });
  }, [payerId]);

  const handleSetPayer = useCallback((userId: string) => {
    setPayerId((prevPayerId) => (prevPayerId === userId ? undefined : userId));
  }, []);

  const handleConfirm = useCallback(() => {
    const result = Object.keys(selectedParticipants)
      .filter((userId) => selectedParticipants[userId])
      .map((user_id) => ({ user_id }));
    onSubmit(result, "EQUAL" as const, payerId);
    onClose();
  }, [selectedParticipants, onSubmit, onClose, payerId]);

  const renderItem = useCallback(
    ({ item }: { item: GroupMemberDetails }) => (
      <ParticipantListItem
        item={item}
        isSelected={!!selectedParticipants[item.user_id]}
        splitType={"EQUAL"}
        onSelect={handleSelectParticipant}
        isPayer={payerId === item.user_id}
        onSetPayer={handleSetPayer}
      />
    ),
    [selectedParticipants, splitType, handleSelectParticipant, payerId]
  );

  if (isLoading) return <ActivityIndicator />;

  return (
    <BottomSheetView style={styles.container}>
      <View style={styles.contentContainer}>
        <SplitTypeSelector
          splitType={splitType as "EQUAL"}
          onSplitTypeChange={setSplitType}
        />
        <FlatList
          data={members}
          keyExtractor={(item) => item.user_id}
          renderItem={renderItem}
        />
      </View>
      <SplitSummary
        totalAmount={totalAmount}
        selectedParticipantsCount={Object.keys(selectedParticipants).length}
        onConfirm={handleConfirm}
      />
    </BottomSheetView>
  );
};
