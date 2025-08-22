// src/components/Button/Button.tsx

import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  View,
} from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { styles } from "./Button.styles";
import type { ButtonVariants } from "./Button.styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  icon?: React.ReactNode;
  variant?: ButtonVariants["variant"];
  disabled?: boolean;
}

export const Button = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  icon,
  style,
  ...rest
}: ButtonProps) => {
  // V3: Call useVariants at the top of the component.
  // This modifies the 'styles' object for this instance.
  styles.useVariants({
    variant,
    disabled: disabled || loading,
  });

  const { theme } = useUnistyles();

  const indicatorColor =
    variant === "primary" ? theme.colors.primaryOn : theme.colors.primary;

  return (
    <TouchableOpacity
      style={[styles.container, style]} // styles.container now includes the variant styles
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={theme.opacities.pressed}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={styles.text}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};
