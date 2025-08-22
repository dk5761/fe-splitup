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
import { useDebounce } from "@/hooks/useDebounce";
import { Feather } from "@expo/vector-icons";

interface SearchInputProps extends Omit<TextInputProps, "onChangeText"> {
  onSearch: (query: string) => void;
  loading?: boolean;
  debounceDelay?: number;
}

export const SearchInput = ({
  onSearch,
  loading = false,
  debounceDelay = 500,
  style,
  ...rest
}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const { theme } = useUnistyles();
  const inputRef = useRef<TextInput>(null);
  const debouncedQuery = useDebounce(query, debounceDelay);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  styles.useVariants({ focused: isFocused });

  const handleClear = () => {
    setQuery("");
    // No need to manually refocus since we're using onPressIn
  };

  const renderRightIcon = () => {
    if (loading) {
      return <ActivityIndicator color={theme.colors.primary} />;
    }
    if (query.length > 0) {
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
        value={query}
        onChangeText={setQuery}
        placeholderTextColor={theme.colors.textSecondary}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
      {renderRightIcon()}
    </Pressable>
  );
};
