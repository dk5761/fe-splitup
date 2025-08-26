import React from "react";
import { View, Text } from "react-native";
import { Button } from "@/components/ui/button";
import { stylesheet as styles } from "../SplitByBottomSheet.styles";
import { useUnistyles } from "react-native-unistyles";

type SplitSummaryProps = {
  totalAmount: number;
  selectedParticipantsCount: number;
  onConfirm: () => void;
};

export const SplitSummary: React.FC<SplitSummaryProps> = React.memo(
  ({
    totalAmount,

    selectedParticipantsCount,
    onConfirm,
  }) => {
    const { theme } = useUnistyles();
    return (
      <View style={styles.footer}>
        <Text style={[styles.splitSummaryText, { color: theme.colors.text }]}>
          {`₹ ${(totalAmount / selectedParticipantsCount || 0).toFixed(
            2
          )} per person`}
        </Text>
        <Button
          title="OK"
          style={{ width: 120 }}
          onPress={onConfirm}
          variant="primary"
        />
      </View>
    );
  }
);
