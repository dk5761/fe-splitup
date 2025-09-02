import React from "react";
import { View } from "react-native";
import { Chip } from "@/components/ui/chip/Chip";
import { stylesheet as styles } from "../SplitByBottomSheet.styles";

type SplitType = "EQUAL" | "MANUAL" | "CUSTOM" | "PERCENTAGE" | "SHARES" | "UNEQUAL" | "ITEMIZED";

type SplitTypeSelectorProps = {
  splitType: SplitType;
  onSplitTypeChange: (type: SplitType) => void;
};

const splitTypeOptions = [
  { label: "Equally", value: "EQUAL" as const },
  { label: "Custom", value: "CUSTOM" as const },
  { label: "Percentage", value: "PERCENTAGE" as const },
  { label: "Shares", value: "SHARES" as const },
  { label: "Unequal", value: "UNEQUAL" as const },
  { label: "Itemized", value: "ITEMIZED" as const },
];

export const SplitTypeSelector: React.FC<SplitTypeSelectorProps> = React.memo(
  ({ splitType, onSplitTypeChange }) => {
    return (
      <View style={styles.chipContainer}>
        {splitTypeOptions.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            onPress={() => onSplitTypeChange(option.value)}
            selected={splitType === option.value}
          />
        ))}
      </View>
    );
  }
);
