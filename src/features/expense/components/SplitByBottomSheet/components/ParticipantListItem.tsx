import React from "react";
import { View, Text, TextInput } from "react-native";
import { Checkbox } from "@/components/ui/checkbox";
import { stylesheet as styles } from "../SplitByBottomSheet.styles";
import { GroupMemberDetails } from "@/features/groups/types";

type ParticipantListItemProps = {
  item: GroupMemberDetails;
  isSelected: boolean;
  splitType: "EQUAL";
  onSelect: (userId: string) => void;
};

export const ParticipantListItem: React.FC<ParticipantListItemProps> =
  React.memo(({ item, isSelected, splitType, onSelect }) => {
    return (
      <View style={styles.participantContainer}>
        <Checkbox
          value={isSelected}
          onValueChange={() => onSelect(item.user_id)}
        />
        <Text style={styles.participantName}>{item.name}</Text>
      </View>
    );
  });
