import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Pressable } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";

interface SwitchProps {
  value: boolean;
  onValueChange?: (next: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
  style,
  testID,
}) => {
  const translateX = useSharedValue(value ? 12 : 0);

  React.useEffect(() => {
    translateX.value = withTiming(value ? 12 : 0, {
      duration: 160,
      easing: Easing.out(Easing.circle),
    });
  }, [value, translateX]);

  const handleToggle = () => {
    if (disabled) return;
    onValueChange?.(!value);
  };

  return (
    <React.Fragment>
      <Pressable
        accessibilityRole="switch"
        accessibilityState={{ disabled, checked: value }}
        onPress={handleToggle}
        disabled={disabled}
        testID={testID}
        style={[
          styles.track,
          value ? styles.trackOn : styles.trackOff,
          disabled ? styles.trackDisabled : null,
          style,
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            useAnimatedStyle(() => ({
              transform: [{ translateX: translateX.value }],
            })),
          ]}
        />
      </Pressable>
    </React.Fragment>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    width: "auto",
    borderWidth: 1,
    borderColor: "red",
  },
  track: {
    width: 34,
    height: 22,
    borderRadius: 20,
    padding: 2,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  trackOff: {
    backgroundColor: "#EEEEEE",
  },
  trackOn: {
    backgroundColor: "#90CAF9",
  },
  trackDisabled: {
    opacity: 0.5,
  },
  thumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
}));

export type { SwitchProps };
