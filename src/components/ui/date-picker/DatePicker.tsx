import { Feather } from "@expo/vector-icons";
import { format as formatDateFns } from "date-fns";
import React, {
  type ReactElement,
  useCallback,
  useMemo,
  useState,
} from "react";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import {
  Pressable,
  StyleSheet as RNStyleSheet,
  Text,
  View,
} from "react-native";
import type { DateType } from "react-native-ui-datepicker";
import DateTimePicker from "react-native-ui-datepicker";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import type { BottomSheetSize } from "../bottom-sheet";
import { AppBottomSheet, useAppBottomSheet } from "../bottom-sheet";

export interface DatePickerProps {
  // Required
  onChange: (date: Date | null | undefined) => void;

  // Value
  value?: Date | string | number | null;

  // Display
  label?: string;
  placeholder?: string;
  format?: string; // date-fns format string, default 'PP'
  renderTrigger?: (
    date: Date | null | undefined,
    placeholderText: string
  ) => ReactElement | null;

  // Behavior
  disabled?: boolean;
  error?: string;
  allowClear?: boolean;

  // Date constraints
  minDate?: Date | string | number;
  maxDate?: Date | string | number;
  firstDayOfWeek?: number; // 0-6
  locale?: string;
  timeZone?: string;
  timePicker?: boolean;
  use12Hours?: boolean;

  // Styling
  style?: StyleProp<ViewStyle>; // wrapper view (use margin here)
  labelStyle?: StyleProp<TextStyle>;
  triggerStyle?: StyleProp<ViewStyle>;
  dropdownStyle?: StyleProp<ViewStyle>; // passes to sheet backgroundStyle

  // Bottom sheet
  sheetTitle?: string;
  size?: BottomSheetSize; // default 'auto'
  snapPoints?: (string | number)[];
}

export const DatePicker: React.FC<DatePickerProps> = ({
  onChange,
  value,
  label,
  placeholder = "Select date",
  format = "PP",
  renderTrigger,
  disabled = false,
  error,
  allowClear = false,
  minDate,
  maxDate,
  firstDayOfWeek,
  locale = "en",
  timeZone,
  timePicker = false,
  use12Hours,
  style,
  labelStyle,
  triggerStyle,
  dropdownStyle,
  sheetTitle = "Select Date",
  size = "auto",
  snapPoints,
}) => {
  const { theme } = useUnistyles();
  const bottomSheet = useAppBottomSheet();

  const [tempDate, setTempDate] = useState<Date | null | undefined>(() =>
    value ? new Date(value) : null
  );

  const selectedDate: Date | null | undefined = useMemo(() => {
    return value ? new Date(value) : null;
  }, [value]);

  const presentSheet = useCallback(() => {
    if (disabled) return;
    setTempDate(selectedDate ?? new Date());
    bottomSheet.present();
  }, [disabled, selectedDate, bottomSheet]);

  const dismissSheet = useCallback(() => {
    bottomSheet.dismiss();
  }, [bottomSheet]);

  const displayText = useMemo(() => {
    if (!selectedDate) return placeholder;
    try {
      return formatDateFns(selectedDate, format);
    } catch {
      return selectedDate.toDateString();
    }
  }, [selectedDate, placeholder, format]);

  const handlePickerChange = useCallback((params: { date: DateType }) => {
    const next = params?.date as Date | null | undefined;
    if (next instanceof Date || next === null || typeof next === "undefined") {
      setTempDate(next ?? undefined);
    } else if (typeof next === "string" || typeof next === "number") {
      const coerced = new Date(next);
      setTempDate(Number.isNaN(coerced.getTime()) ? undefined : coerced);
    } else {
      // Dayjs or other types
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const asAny = next as any;
        const d: Date | undefined = asAny?.toDate?.() ?? undefined;
        setTempDate(d);
      } catch {
        setTempDate(undefined);
      }
    }
  }, []);

  const confirmSelection = useCallback(() => {
    onChange(tempDate ?? null);
    dismissSheet();
  }, [tempDate, onChange, dismissSheet]);

  const clearSelection = useCallback(() => {
    setTempDate(undefined);
    onChange(null);
    dismissSheet();
  }, [onChange, dismissSheet]);

  const defaultTrigger = useCallback(
    () => (
      <View style={[styles.triggerContainer, style]}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled }}
          onPress={presentSheet}
          disabled={disabled}
          style={({ pressed }) => [
            styles.trigger,
            pressed ? styles.triggerPressed : null,
            disabled ? styles.triggerDisabled : null,
            error ? styles.triggerError : null,
            triggerStyle,
          ]}
        >
          <View style={styles.triggerContentRow}>
            <Text
              numberOfLines={1}
              style={[
                styles.triggerText,
                !selectedDate ? styles.placeholderText : null,
              ]}
            >
              {displayText}
            </Text>
            <Feather
              name="calendar"
              size={20}
              color={theme.colors.textSecondary}
            />
          </View>
        </Pressable>
      </View>
    ),
    [
      style,
      triggerStyle,
      disabled,
      error,
      selectedDate,
      displayText,
      presentSheet,
      theme.colors.textSecondary,
    ]
  );

  const calculatedSnapPoints = useMemo(() => {
    if (snapPoints && snapPoints.length > 0) {
      return snapPoints;
    }
    if (size === "auto") {
      // Provide reasonable default snap points for date picker
      // Increased height to prevent clipping
      return timePicker ? ["70%", "85%"] : ["60%", "75%"];
    }

    // For other sizes, let the AppBottomSheet handle it
    return undefined;
  }, [snapPoints, size, timePicker]);

  return (
    <View>
      {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}

      {renderTrigger
        ? renderTrigger(selectedDate ?? null, placeholder)
        : defaultTrigger()}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <AppBottomSheet
        ref={bottomSheet.ref}
        variant="modal"
        size={size}
        snapPoints={calculatedSnapPoints}
        enableBackdrop
        enablePanDownToClose
        enableDynamicSizing={size === "auto"}
        backgroundStyle={dropdownStyle}
      >
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetHeaderTitle}>{sheetTitle}</Text>
          <View style={styles.sheetHeaderActions}>
            {allowClear ? (
              <View style={styles.headerButtonContainer}>
                <Pressable onPress={clearSelection} style={styles.headerButton}>
                  <Text style={styles.headerButtonText}>Clear</Text>
                </Pressable>
              </View>
            ) : null}
            <View style={styles.headerIconContainer}>
              <Pressable onPress={dismissSheet} style={styles.headerIconButton}>
                <Feather
                  name="x"
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.pickerContainer}>
          <DateTimePicker
            mode="single"
            date={tempDate as unknown as DateType}
            onChange={handlePickerChange}
            minDate={minDate as unknown as DateType}
            maxDate={maxDate as unknown as DateType}
            firstDayOfWeek={firstDayOfWeek}
            locale={locale}
            timeZone={timeZone}
            timePicker={timePicker}
            use12Hours={use12Hours}
            hideWeekdays={false}
            weekdaysFormat="short"
            monthsFormat="short"
            styles={{
              // header labels
              month_selector_label: {
                color: theme.colors.text,
                fontFamily: theme.typography.families.medium,
              },
              year_selector_label: {
                color: theme.colors.text,
                fontFamily: theme.typography.families.medium,
              },
              time_label: {
                color: theme.colors.text,
                fontFamily: theme.typography.families.medium,
              },

              // weekday text
              weekday_label: {
                color: theme.colors.textSecondary,
                fontFamily: theme.typography.families.medium,
              },

              // day cell + text
              day: { backgroundColor: "transparent" },
              day_label: {
                color: theme.colors.text,
                fontFamily: theme.typography.families.regular,
              },

              // selection states
              selected: {
                backgroundColor: theme.colors.primary,
                borderRadius: theme.radii.md,
                margin: 4,
              },
              selected_label: {
                color: theme.colors.primaryOn,
                fontFamily: theme.typography.families.medium,
              },

              // today state
              today: {
                borderColor: theme.colors.primary,
                borderWidth: 1,
                borderRadius: theme.radii.md,
                margin: 4,
              },
              today_label: {
                color: theme.colors.primary,
                fontFamily: theme.typography.families.medium,
              },
            }}
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.footerButtonContainer}>
            <Pressable style={styles.footerButton} onPress={confirmSelection}>
              <Text style={styles.footerButtonText}>Done</Text>
            </Pressable>
          </View>
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
  sheetHeaderActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  headerButtonContainer: {
    borderRadius: theme.radii.sm,
    overflow: "hidden",
  },
  headerButton: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  headerButtonText: {
    color: theme.colors.text,
    fontFamily: theme.typography.families.medium,
  },
  headerIconContainer: {
    borderRadius: theme.radii.sm,
    overflow: "hidden",
    marginLeft: theme.spacing.md,
  },
  headerIconButton: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.sm,
  },
  pickerContainer: {
    paddingTop: theme.spacing.md,
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

export default DatePicker;
