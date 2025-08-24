import React from "react";
import { View, Text, TextInput } from "react-native";
import { Checkbox } from "@/components/ui/checkbox";
import { stylesheet as styles } from "../SplitByBottomSheet.styles";
import { GroupMemberDetails } from "@/features/groups/types";

type ParticipantListItemProps = {
  item: GroupMemberDetails;
  isSelected: boolean;
  splitType: "EQUAL";
  share: string;
  onSelect: (userId: string) => void;
  onShareChange: (userId: string, share: string) => void;
};

export const ParticipantListItem: React.FC<ParticipantListItemProps> =
  React.memo(
    ({ item, isSelected, splitType, share, onSelect, onShareChange }) => {
      console.log({
        item,
        isSelected,
        splitType,
        share,
      });
      return (
        <View style={styles.participantContainer}>
          <Checkbox
            value={isSelected}
            onValueChange={() => onSelect(item.user_id)}
          />
          <Text style={styles.participantName}>{item.name}</Text>
        </View>
      );
    }
  );
