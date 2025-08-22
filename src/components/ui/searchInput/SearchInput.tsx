// src/components/SearchInput/SearchInput.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { styles } from "./SearchInput.styles";
import { Feather } from "@expo/vector-icons";

interface SearchInputProps extends Omit<TextInputProps, "onChangeText"> {
  loading?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchInput = ({
  loading = false,
  style,
  value,
  onChangeText,
  ...rest
}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useUnistyles();
  const inputRef = useRef<TextInput>(null);

  styles.useVariants({ focused: isFocused });

  const handleClear = () => {
    onChangeText("");
  };

  const renderRightIcon = () => {
    if (loading) {
      return <ActivityIndicator color={theme.colors.primary} />;
    }
    if (value.length > 0) {
      return (
        <Pressable style={styles.clearButton} onPressIn={handleClear}>
          <Feather name="x" size={20} color={theme.colors.textSecondary} />
        </Pressable>
      );
    }
    return null;
  };

  return (
    <Pressable
      onPress={() => inputRef.current?.focus()}
      style={[styles.container, style]}
    >
      <Feather
        name="search"
        size={22}
        color={theme.colors.textSecondary}
        style={styles.icon}
      />
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.colors.textSecondary}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
      {renderRightIcon()}
    </Pressable>
  );
};
