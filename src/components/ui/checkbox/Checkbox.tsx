// src/components/Checkbox/Checkbox.tsx

import React, { useEffect } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { styles } from "./Checkbox.styles";
import { Feather } from "@expo/vector-icons";
import { useUnistyles } from "react-native-unistyles";

interface CheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  children?: React.ReactNode;
}

export const Checkbox = ({ value, onValueChange, children }: CheckboxProps) => {
  // Unistyles handles the static styles (background, border)
  styles.useVariants({
    checked: value,
  });

  const { theme } = useUnistyles();

  // --- Reanimated Setup ---
  // 1. A shared value to drive the animation (0 = hidden, 1 = visible)
  const progress = useSharedValue(value ? 1 : 0);

  // 2. An effect to run the animation when the `value` prop changes
  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, {
      duration: 200, // A quick fade
    });
  }, [value, progress]);

  // 3. An animated style that maps the shared value to opacity
  const animatedCheckStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));
  // --- End Reanimated Setup ---

  return (
    <Pressable style={styles.wrapper} onPress={() => onValueChange(!value)}>
      <View style={styles.box}>
        {/*
          The Animated.View is always rendered, but its opacity is controlled
          by the animation, allowing it to fade in and out.
        */}
        <Animated.View style={animatedCheckStyle}>
          <Feather name="check" size={18} color={theme.colors.primaryOn} />
        </Animated.View>
      </View>

      {children && <View style={styles.labelContainer}>{children}</View>}
    </Pressable>
  );
};
