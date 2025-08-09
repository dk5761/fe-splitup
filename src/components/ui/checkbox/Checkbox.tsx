import { Feather } from "@expo/vector-icons";
import React from "react";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";

interface CheckboxProps {
  value: boolean;
  onValueChange?: (next: boolean) => void;
  label?: string;
  indeterminate?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  labelPosition?: "right" | "left";
  style?: StyleProp<ViewStyle>; // pressable style (padding etc.)
  containerStyle?: StyleProp<ViewStyle>; // outer container (for margins)
  labelStyle?: StyleProp<TextStyle>;
  testID?: string;
}

const SIZE_MAP: Record<NonNullable<CheckboxProps["size"]>, number> = {
  sm: 18,
  md: 22,
  lg: 28,
};

const CheckboxComponent: React.FC<CheckboxProps> = ({
  value,
  onValueChange,
  label,
  indeterminate = false,
  disabled = false,
  size = "md",
  labelPosition = "right",
  style,
  containerStyle,
  labelStyle,
  testID,
}) => {
  const iconVisible = useSharedValue(value || indeterminate ? 1 : 0);

  React.useEffect(() => {
    iconVisible.value = withTiming(value || indeterminate ? 1 : 0, {
      duration: 160,
      easing: Easing.out(Easing.circle),
    });
  }, [value, indeterminate, iconVisible]);

  const handleToggle = () => {
    if (disabled) return;
    onValueChange?.(!value);
  };

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: iconVisible.value,
      },
    ],
    opacity: iconVisible.value,
  }));

  const side = SIZE_MAP[size] ?? SIZE_MAP.md;

  const BoxIcon = indeterminate ? (
    <Feather name="minus" size={Math.max(12, side * 0.6)} color="#FFFFFF" />
  ) : (
    <Feather name="check" size={Math.max(12, side * 0.6)} color="#FFFFFF" />
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{
          disabled,
          checked: indeterminate ? ("mixed" as const) : value,
        }}
        disabled={disabled}
        onPress={handleToggle}
        testID={testID}
        android_ripple={{ color: "rgba(0,0,0,0.08)", borderless: false }}
        style={({ pressed }) => [
          styles.wrapper,
          pressed ? styles.wrapperPressed : null,
          disabled ? styles.wrapperDisabled : null,
          style,
        ]}
      >
        {labelPosition === "left" && label ? (
          <Text
            numberOfLines={1}
            style={[
              styles.label,
              disabled ? styles.labelDisabled : null,
              labelStyle,
            ]}
          >
            {label}
          </Text>
        ) : null}

        <View
          style={[
            styles.box,
            {
              width: side,
              height: side,
              borderRadius: Math.max(4, Math.round(side / 5)),
            },
            value || indeterminate ? styles.boxChecked : styles.boxUnchecked,
            disabled ? styles.boxDisabled : null,
          ]}
        >
          <Animated.View style={[styles.iconWrapper, animatedIconStyle]}>
            {BoxIcon}
          </Animated.View>
        </View>

        {labelPosition === "right" && label ? (
          <Text
            numberOfLines={1}
            style={[
              styles.label,
              disabled ? styles.labelDisabled : null,
              labelStyle,
            ]}
          >
            {label}
          </Text>
        ) : null}
      </Pressable>
    </View>
  );
};

export const Checkbox = React.memo(
  CheckboxComponent
) as React.FC<CheckboxProps>;

const styles = StyleSheet.create((theme) => ({
  container: {
    borderRadius: theme.radii.sm,
    overflow: "hidden",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  wrapperPressed: {},
  wrapperDisabled: {
    opacity: theme.opacities.disabled,
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  boxUnchecked: {
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.border,
  },
  boxChecked: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  boxDisabled: {
    opacity: theme.opacities.disabled,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.body,
    lineHeight: theme.typography.lineHeights.body,
    fontFamily: theme.typography.families.regular,
  },
  labelDisabled: {
    color: theme.colors.textSecondary,
  },
}));

export type { CheckboxProps };
