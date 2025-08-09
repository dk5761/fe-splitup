import { Feather } from "@expo/vector-icons";
import {
  BottomSheetFlatList,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import type { ReactElement, ReactNode } from "react";
import React, { useCallback, useMemo, useState } from "react";
import type {
  ListRenderItem,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import {
  Pressable,
  StyleSheet as RNStyleSheet,
  Text,
  View,
} from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { AppBottomSheet, useAppBottomSheet } from "../bottom-sheet";

export interface DropdownOption {
  label: string;
  value: string | number;
  description?: string;
  disabled?: boolean;
  icon?: ReactNode;
}

interface AppDropdownProps {
  // Required
  options: DropdownOption[];
  onSelect: (option: DropdownOption) => void;

  // Display
  placeholder?: string;
  label?: string;
  selectedValue?: string | number | (string | number)[];

  // Behavior
  searchable?: boolean;
  multiSelect?: boolean;
  closeOnSelect?: boolean;

  // Styling
  style?: StyleProp<ViewStyle>; // container wrapper for margins per Pressable rules
  dropdownStyle?: StyleProp<ViewStyle>; // passes to sheet backgroundStyle
  optionStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;

  // Advanced
  maxHeight?: "small" | "medium" | "large" | "full";
  snapPoints?: (string | number)[];
  renderOption?: (
    option: DropdownOption,
    isSelected: boolean
  ) => ReactElement | null;
  renderTrigger?: (
    selectedOption: DropdownOption | null,
    placeholder: string
  ) => ReactElement | null;

  // States
  disabled?: boolean;
  error?: string;
}

export const AppDropdown: React.FC<AppDropdownProps> = ({
  options,
  onSelect,
  placeholder = "Select an option",
  label,
  selectedValue,
  searchable = false,
  multiSelect = false,
  closeOnSelect = true,
  style,
  dropdownStyle,
  optionStyle,
  labelStyle,
  maxHeight = "medium",
  snapPoints,
  renderOption,
  renderTrigger,
  disabled = false,
  error,
}) => {
  const { theme } = useUnistyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(
    multiSelect && selectedValue
      ? Array.isArray(selectedValue)
        ? selectedValue
        : [selectedValue]
      : []
  );

  const bottomSheet = useAppBottomSheet();

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery.trim()) return options;
    const q = searchQuery.toLowerCase();
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(q) ||
        (option.description
          ? option.description.toLowerCase().includes(q)
          : false)
    );
  }, [options, searchQuery, searchable]);

  const selectedOption = useMemo(() => {
    if (multiSelect) {
      return options.filter((option) => selectedValues.includes(option.value));
    }
    return options.find((option) => option.value === selectedValue) || null;
  }, [options, selectedValue, selectedValues, multiSelect]);

  const presentDropdown = useCallback(() => {
    if (disabled) return;
    bottomSheet.present();
  }, [disabled, bottomSheet]);

  const dismissDropdown = useCallback(() => {
    bottomSheet.dismiss();
    setSearchQuery("");
  }, [bottomSheet]);

  const handleSelect = useCallback(
    (option: DropdownOption) => {
      if (option.disabled) return;

      if (multiSelect) {
        const newSelectedValues = selectedValues.includes(option.value)
          ? selectedValues.filter((value) => value !== option.value)
          : [...selectedValues, option.value];

        setSelectedValues(newSelectedValues);
        onSelect(option);

        if (closeOnSelect && newSelectedValues.length > 0) {
          dismissDropdown();
        }
      } else {
        onSelect(option);
        if (closeOnSelect) {
          dismissDropdown();
        }
      }
    },
    [multiSelect, selectedValues, onSelect, closeOnSelect, dismissDropdown]
  );

  const defaultTriggerRender = useCallback(() => {
    const displayText =
      multiSelect && Array.isArray(selectedOption)
        ? selectedOption.length > 0
          ? `${selectedOption.length} selected`
          : placeholder
        : (selectedOption as DropdownOption | null)?.label || placeholder;

    return (
      <View style={[styles.triggerContainer, style]}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled }}
          disabled={disabled}
          onPress={presentDropdown}
          style={({ pressed }) => [
            styles.trigger,
            pressed ? styles.triggerPressed : null,
            disabled ? styles.triggerDisabled : null,
            error ? styles.triggerError : null,
          ]}
        >
          <View style={styles.triggerContentRow}>
            <Text
              numberOfLines={1}
              style={[
                styles.triggerText,
                !selectedOption ||
                (Array.isArray(selectedOption) && selectedOption.length === 0)
                  ? styles.placeholderText
                  : null,
              ]}
            >
              {displayText}
            </Text>
            <Feather
              name="chevron-down"
              size={20}
              color={theme.colors.textSecondary}
            />
          </View>
        </Pressable>
      </View>
    );
  }, [
    selectedOption,
    placeholder,
    multiSelect,
    disabled,
    error,
    style,
    presentDropdown,
    theme.colors.textSecondary,
  ]);

  const defaultOptionRender = useCallback(
    (option: DropdownOption, isSelected: boolean) => (
      <View style={styles.optionContainer}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: !!option.disabled }}
          onPress={() => handleSelect(option)}
          disabled={option.disabled}
          style={({ pressed }) => [
            styles.option,
            isSelected ? styles.optionSelected : null,
            pressed ? styles.optionPressed : null,
            option.disabled ? styles.optionDisabled : null,
            optionStyle,
          ]}
        >
          <View style={styles.optionRow}>
            {option.icon ? (
              <View style={styles.optionIcon}>{option.icon}</View>
            ) : null}
            <View style={styles.optionTextCol}>
              <Text
                numberOfLines={1}
                style={[
                  styles.optionLabel,
                  isSelected ? styles.optionLabelSelected : null,
                  option.disabled ? styles.optionLabelDisabled : null,
                ]}
              >
                {option.label}
              </Text>
              {option.description ? (
                <Text
                  numberOfLines={2}
                  style={[
                    styles.optionDescription,
                    option.disabled ? styles.optionDescriptionDisabled : null,
                  ]}
                >
                  {option.description}
                </Text>
              ) : null}
            </View>
            {isSelected ? (
              <Feather name="check" size={20} color={theme.colors.primary} />
            ) : null}
          </View>
        </Pressable>
      </View>
    ),
    [handleSelect, optionStyle, theme.colors.primary]
  );

  const renderItem: ListRenderItem<DropdownOption> = useCallback(
    ({ item }) => {
      const isSelected = multiSelect
        ? selectedValues.includes(item.value)
        : selectedValue === item.value;
      const result = renderOption
        ? renderOption(item, isSelected)
        : defaultOptionRender(item, isSelected);
      return result ?? null;
    },
    [
      selectedValue,
      selectedValues,
      multiSelect,
      renderOption,
      defaultOptionRender,
    ]
  );

  const dropdownTitle = useMemo(() => {
    let titleText = label || "Select Option";
    if (multiSelect && selectedValues.length > 0) {
      titleText += ` (${selectedValues.length} selected)`;
    }
    return titleText;
  }, [label, multiSelect, selectedValues.length]);

  return (
    <View>
      {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}

      {renderTrigger
        ? renderTrigger((selectedOption as DropdownOption) ?? null, placeholder)
        : defaultTriggerRender()}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <AppBottomSheet
        ref={bottomSheet.ref}
        variant="modal"
        size={maxHeight}
        snapPoints={snapPoints}
        enableBackdrop
        enablePanDownToClose
        backgroundStyle={dropdownStyle}
      >
        <View style={styles.dropdownContent}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetHeaderTitle}>{dropdownTitle}</Text>
            <View style={styles.sheetHeaderCloseContainer}>
              <Pressable
                accessibilityRole="button"
                onPress={dismissDropdown}
                style={styles.sheetHeaderClose}
              >
                <Feather
                  name="x"
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </Pressable>
            </View>
          </View>
          {searchable ? (
            <View style={styles.searchContainer}>
              <View style={styles.searchIconWrapper}>
                <Feather
                  name="search"
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </View>
              <BottomSheetTextInput
                style={styles.searchInput}
                placeholder="Search options..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={theme.colors.textSecondary}
              />
            </View>
          ) : null}

          <BottomSheetFlatList
            data={filteredOptions}
            keyExtractor={(item) => String(item.value)}
            renderItem={renderItem}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: theme.spacing.xxl }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={() => (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No options found</Text>
              </View>
            )}
          />

          {multiSelect ? (
            <View style={styles.footer}>
              <View style={styles.footerButtonContainer}>
                <Pressable
                  style={styles.footerButton}
                  onPress={dismissDropdown}
                >
                  <Text style={styles.footerButtonText}>
                    {`Done${
                      multiSelect && selectedValues.length > 0
                        ? ` (${selectedValues.length})`
                        : ""
                    }`}
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : null}
        </View>
      </AppBottomSheet>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  label: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: theme.typography.families.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  triggerContainer: {
    borderRadius: theme.radii.md,
    overflow: "hidden",
  },
  trigger: {
    minHeight: 48,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: "center",
    borderRadius: theme.radii.md,
  },
  triggerHovered: {
    borderColor: theme.colors.primary,
  },
  triggerPressed: {
    borderColor: theme.colors.primary,
  },
  triggerDisabled: {
    backgroundColor: theme.colors.background,
    opacity: theme.opacities.disabled,
  },
  triggerError: {
    borderColor: theme.colors.error,
  },
  triggerContentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.md,
  },
  triggerText: {
    fontSize: theme.typography.sizes.body,
    lineHeight: theme.typography.lineHeights.body,
    fontFamily: theme.typography.families.regular,
    color: theme.colors.text,
    flex: 1,
  },
  placeholderText: {
    color: theme.colors.textSecondary,
  },
  errorText: {
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
    fontFamily: theme.typography.families.regular,
  },
  dropdownContent: {
    flex: 1,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: RNStyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  sheetHeaderTitle: {
    flex: 1,
    fontSize: theme.typography.sizes.h3,
    lineHeight: theme.typography.lineHeights.h3,
    color: theme.colors.text,
    fontFamily: theme.typography.families.medium,
  },
  sheetHeaderCloseContainer: {
    borderRadius: theme.radii.sm,
    overflow: "hidden",
    marginLeft: theme.spacing.md,
  },
  sheetHeaderClose: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.sm,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  searchIconWrapper: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.sizes.body,
    lineHeight: theme.typography.lineHeights.body,
    color: theme.colors.text,
    fontFamily: theme.typography.families.regular,
  },
  list: {
    flex: 1,
  },
  optionContainer: {
    borderRadius: theme.radii.md,
    overflow: "hidden",
  },
  option: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    borderBottomWidth: RNStyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  optionHovered: {
    backgroundColor: theme.colors.surface,
  },
  optionPressed: {
    backgroundColor: theme.colors.surface,
  },
  optionSelected: {
    backgroundColor: theme.colors.surface,
  },
  optionDisabled: {
    opacity: theme.opacities.disabled,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.md,
  },
  optionIcon: {
    marginRight: theme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  optionTextCol: {
    flex: 1,
  },
  optionLabel: {
    fontSize: theme.typography.sizes.body,
    lineHeight: theme.typography.lineHeights.body,
    color: theme.colors.text,
    fontFamily: theme.typography.families.regular,
  },
  optionLabelSelected: {
    color: theme.colors.primary,
    fontFamily: theme.typography.families.medium,
  },
  optionLabelDisabled: {
    color: theme.colors.textSecondary,
  },
  optionDescription: {
    fontSize: 14,
    lineHeight: 18,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    fontFamily: theme.typography.families.regular,
  },
  optionDescriptionDisabled: {
    color: theme.colors.textSecondary,
  },
  separator: {
    height: RNStyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border,
    marginLeft: theme.spacing.xl,
  },
  emptyState: {
    padding: theme.spacing.xxl,
    alignItems: "center",
  },
  emptyText: {
    fontSize: theme.typography.sizes.body,
    lineHeight: theme.typography.lineHeights.body,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.families.regular,
  },
  footer: {
    padding: theme.spacing.xl,
    borderTopWidth: RNStyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
  },
  footerButtonContainer: {
    borderRadius: theme.radii.md,
    overflow: "hidden",
  },
  footerButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    alignItems: "center",
  },
  footerButtonText: {
    color: theme.colors.primaryOn,
    fontSize: theme.typography.sizes.button,
    lineHeight: theme.typography.lineHeights.button,
    fontFamily: theme.typography.families.medium,
  },
}));

// Theme-derived constants that do not need dynamic updates during the render
// Consumers can rely on hooks (like useUnistyles) when dynamic updates are needed.

// Convenience hook for dropdown state management
export const useDropdown = (initialValue?: string | number) => {
  const [selectedValue, setSelectedValue] = useState<
    string | number | undefined
  >(initialValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = useCallback((option: DropdownOption) => {
    setSelectedValue(option.value);
    setIsOpen(false);
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const reset = useCallback(() => setSelectedValue(undefined), []);

  return {
    selectedValue,
    isOpen,
    handleSelect,
    open,
    close,
    reset,
    setSelectedValue,
  };
};
