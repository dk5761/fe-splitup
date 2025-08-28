import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ControllerRenderProps } from "react-hook-form";
import {
  AppDropdown,
  DropdownOption,
} from "@/components/ui/appdropdown/AppDropdown";
import { Checkbox } from "@/components/ui/checkbox";
import { stylesheet as styles } from "./GroupMemberSelector.styles";

interface GroupMemberSelectorProps {
  options: DropdownOption[];
  field: ControllerRenderProps<any, "members">;
  error?: boolean;
}

export const GroupMemberSelector = ({
  options,
  field,
  error,
}: GroupMemberSelectorProps) => {
  return (
    <AppDropdown
      options={options}
      value={field.value}
      onChange={field.onChange}
      multiselect
    >
      <AppDropdown.Trigger placeholder="Select members">
        {() => (
          <View style={styles.dropdownTrigger}>
            <Text style={styles.dropdownTriggerText}>
              {field.value.length > 0
                ? `${field.value.length} members selected`
                : "Select members"}
            </Text>
          </View>
        )}
      </AppDropdown.Trigger>
      <AppDropdown.Content>
        {({ item, isSelected, handleSelect }) => (
          <TouchableOpacity
            onPress={() => handleSelect(item)}
            style={styles.dropdownItem}
          >
            <Checkbox
              value={isSelected}
              onValueChange={() => handleSelect(item)}
            >
              <View style={styles.dropdownItemTextContainer}>
                <Text style={styles.dropdownItemText}>{item.label}</Text>
                <Text style={styles.dropdownItemTextUsername}>
                  @{item.username}
                </Text>
              </View>
            </Checkbox>
          </TouchableOpacity>
        )}
      </AppDropdown.Content>
    </AppDropdown>
  );
};
