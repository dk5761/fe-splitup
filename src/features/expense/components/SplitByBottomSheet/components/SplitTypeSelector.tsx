import React from "react";
import { View } from "react-native";
import { Chip } from "@/components/ui/chip/Chip";
import { stylesheet as styles } from "../SplitByBottomSheet.styles";

type SplitTypeSelectorProps = {
  splitType: "EQUAL";
  onSplitTypeChange: (type: "EQUAL") => void;
};

export const SplitTypeSelector: React.FC<SplitTypeSelectorProps> = React.memo(
  ({ splitType, onSplitTypeChange }) => {
    return (
      <View style={styles.chipContainer}>
        <Chip
          label="Equally"
          onPress={() => onSplitTypeChange("EQUAL")}
          selected={splitType === "EQUAL"}
        />
      </View>
    );
  }
);
