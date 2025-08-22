// src/components/Switch/Switch.tsx

import React, { useEffect } from "react";
import { Pressable, View, Text } from "react-native";
import Animated, {
  interpolateColor,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { styles as staticStyles } from "./Switch.styles";

// --- Custom Switch Component ---
interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

const trackWidth = 50;
const thumbSize = 28;
const thumbPadding = 4; // 2px on each side

export const Switch = ({ value, onValueChange, disabled }: SwitchProps) => {
  const { theme } = useUnistyles();
  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, { duration: 250 });
  }, [value, progress]);

  const animatedTrackStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [theme.colors.border, theme.colors.primary]
    );
    return { backgroundColor };
  });

  const animatedThumbStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      progress.value,
      [0, 1],
      [thumbPadding / 2, trackWidth - thumbSize - thumbPadding / 2]
    );
    return { transform: [{ translateX }] };
  });

  return (
    <Pressable onPress={() => onValueChange(!value)} disabled={disabled}>
      <Animated.View
        style={[
          staticStyles.track,
          animatedTrackStyle,
          {
            backgroundColor: theme.colors.border,
          },
        ]}
      >
        <Animated.View
          style={[
            staticStyles.thumb,
            animatedThumbStyle,
            {
              backgroundColor: theme.colors.surface,
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

// --- Convenience Row Component ---
interface SwitchRowProps extends SwitchProps {
  label: string;
}

export const SwitchRow = ({ label, ...switchProps }: SwitchRowProps) => {
  const { theme } = useUnistyles();
  const rowStyles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: theme.spacing.md,
      width: "100%",
    },
    label: {
      fontSize: theme.typography.sizes.body,
      color: theme.colors.text,
      fontFamily: theme.typography.families.medium,
    },
  });

  return (
    <View style={rowStyles.container}>
      <Text style={rowStyles.label}>{label}</Text>
      <Switch {...switchProps} />
    </View>
  );
};
