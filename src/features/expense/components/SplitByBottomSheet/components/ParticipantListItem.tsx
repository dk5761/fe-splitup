import React from "react";
import { View, Text } from "react-native";
import { Checkbox } from "@/components/ui/checkbox";
import { stylesheet as styles } from "../SplitByBottomSheet.styles";
import { GroupMemberDetails } from "@/features/groups/types";

type ParticipantListItemProps = {
  item: GroupMemberDetails;
  isSelected: boolean;
  splitType: "EQUAL";
  onSelect: (userId: string) => void;
  isPayer: boolean;
  onSetPayer: (userId: string) => void;
};

export const ParticipantListItem: React.FC<ParticipantListItemProps> =
  React.memo(({ item, isSelected, onSelect, isPayer, onSetPayer }) => {
    return (
      <View style={styles.participantContainer}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Checkbox
            value={isSelected}
            onValueChange={() => onSelect(item.user_id)}
          />
          <Text style={styles.participantName}>{item.name}</Text>
        </View>
        {isSelected && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ marginRight: 8 }}>Payer</Text>
            <Checkbox
              value={isPayer}
              onValueChange={() => onSetPayer(item.user_id)}
            />
          </View>
        )}
      </View>
    );
  });
