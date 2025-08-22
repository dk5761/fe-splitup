// src/components/Chip/Chip.tsx

import React from "react";
import {
  Pressable,
  Text,
  View,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { styles } from "./Chip.styles";

interface ChipProps extends PressableProps {
  label: string;
  icon?: React.ReactNode;
  selected?: boolean;
  size?: "small";
  style?: StyleProp<ViewStyle>;
}

export const Chip = ({
  label,
  icon,
  selected,
  size,
  style,
  ...rest
}: ChipProps) => {
  // Apply variants to the styles object for this instance
  styles.useVariants({
    selected,
    size,
  });

  return (
    <Pressable style={[styles.container, style]} {...rest}>
      <Text style={styles.text}>{label}</Text>
      {icon && <View style={styles.icon}>{icon}</View>}
    </Pressable>
  );
};
