// src/components/Input/Input.tsx

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  Pressable,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  GestureResponderEvent, // Use Pressable for better control
} from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { styles } from "./Input.styles"; // Assuming styles are already defined
import { Feather } from "@expo/vector-icons";

interface InputProps extends TextInputProps {
  label?: string;
  leftIcon?: React.ReactNode;
  isPassword?: boolean;
  error?: boolean;
  disabled?: boolean;
}

export const Input = ({
  label,
  leftIcon,
  isPassword = false,
  error,
  disabled,
  style,
  ...rest
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(isPassword);
  const { theme } = useUnistyles();
  const inputRef = useRef<TextInput>(null);

  styles.useVariants({
    focused: isFocused && !error,
    error,
    disabled,
  });

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    rest.onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    rest.onBlur?.(e);
  };

  // This function will toggle visibility without blurring the input
  const handleToggleSecure = (e: GestureResponderEvent) => {
    setIsSecure((prev) => !prev);
  };

  return (
    <View style={[styles.wrapper, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Pressable
        onPress={() => inputRef.current?.focus()}
        style={styles.container}
      >
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholderTextColor={theme.colors.textSecondary}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isSecure}
          editable={!disabled}
          {...rest}
        />
        {isPassword && (
          <Pressable style={styles.icon} onPressIn={handleToggleSecure}>
            {isSecure ? (
              <Feather
                name="eye-off"
                size={20}
                color={theme.colors.textSecondary}
              />
            ) : (
              <Feather
                name="eye"
                size={20}
                color={theme.colors.textSecondary}
              />
            )}
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};
