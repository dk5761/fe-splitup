// src/components/AppDropdown/AppDropdown.tsx

import React, { useRef, useState, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  AppBottomSheet,
  AppBottomSheetRef,
} from "@/components/ui/appbottomsheet/AppBottomSheet";
import { styles } from "./AppDropdown.styles";
import { Check, ChevronDown, X } from "lucide-react-native";
import { useUnistyles } from "react-native-unistyles";
import { Checkbox } from "../checkbox/Checkbox"; // Assuming you have a simple checkbox component
import { BottomSheetView } from "@gorhom/bottom-sheet";

// Define the shape of each option
export interface DropdownOption {
  label: string;
  value: string;
}

// Props for single-select mode
interface SingleSelectProps {
  multiselect?: false;
  value: string | null;
  onChange: (value: string | null) => void;
}

// Props for multi-select mode
interface MultiSelectProps {
  multiselect: true;
  value: string[];
  onChange: (value: string[]) => void;
}

type AppDropdownProps = {
  options: DropdownOption[];
  placeholder?: string;
} & (SingleSelectProps | MultiSelectProps);

export const AppDropdown = (props: AppDropdownProps) => {
  const { options, placeholder = "Select an option" } = props;
  const bottomSheetRef = useRef<AppBottomSheetRef>(null);
  const { theme } = useUnistyles();

  // --- Selection Logic ---
  const handleSelect = (option: DropdownOption) => {
    if (props.multiselect) {
      const currentSelection = props.value || [];
      const isSelected = currentSelection.includes(option.value);
      const newSelection = isSelected
        ? currentSelection.filter((item) => item !== option.value)
        : [...currentSelection, option.value];
      props.onChange(newSelection);
    } else {
      props.onChange(option.value);
      bottomSheetRef.current?.dismiss();
    }
  };

  // --- Render Logic for the Trigger ---
  const renderTriggerContent = () => {
    if (props.multiselect) {
      if (props.value.length === 0) {
        return <Text style={styles.placeholderText}>{placeholder}</Text>;
      }
      // This is a simplified logic for chip rendering. A more complex
      // implementation would measure the container to be more accurate.
      const visibleChips = props.value.slice(0, 2); // Show max 2 chips
      const overflowCount = props.value.length - visibleChips.length;

      const getLabel = (val: string) =>
        options.find((opt) => opt.value === val)?.label || val;

      return (
        <View style={styles.chipsContainer}>
          {visibleChips.map((val) => (
            <View key={val} style={styles.chip}>
              <Text style={styles.chipText}>{getLabel(val)}</Text>
            </View>
          ))}
          {overflowCount > 0 && (
            <View style={styles.overflowChip}>
              <Text style={styles.overflowChipText}>+{overflowCount}</Text>
            </View>
          )}
        </View>
      );
    } else {
      const selectedOption = options.find((opt) => opt.value === props.value);
      if (selectedOption) {
        return <Text style={styles.triggerText}>{selectedOption.label}</Text>;
      }
      return <Text style={styles.placeholderText}>{placeholder}</Text>;
    }
  };

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <>
      <TouchableOpacity
        style={styles.triggerContainer}
        onPress={openBottomSheet}
        activeOpacity={0.8} // A nice touch for visual feedback
      >
        {renderTriggerContent()}
        <ChevronDown size={20} color={theme.colors.textSecondary} />
      </TouchableOpacity>

      <AppBottomSheet ref={bottomSheetRef} title={placeholder}>
        <BottomSheetView style={styles.listContainer}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => {
              const isSelected = props.multiselect
                ? props.value.includes(item.value)
                : props.value === item.value;

              return (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => handleSelect(item)}
                >
                  {props.multiselect ? (
                    // For multi-select, use our custom Checkbox component
                    <Checkbox
                      value={isSelected}
                      onValueChange={() => handleSelect(item)}
                    />
                  ) : null}
                  <Text style={styles.listItemText}>{item.label}</Text>
                  {!props.multiselect && isSelected && (
                    // For single-select, use the styled Check icon
                    <Check size={20} color={theme.colors.primary} />
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </BottomSheetView>
      </AppBottomSheet>
    </>
  );
};
