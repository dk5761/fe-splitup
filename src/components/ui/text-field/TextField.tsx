import React from "react";
import type {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import {
  Keyboard,
  TextInput as RNTextInput,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { StyleSheet, useUnistyles } from "react-native-unistyles";

export interface TextFieldProps
  extends Omit<TextInputProps, "onChangeText" | "value"> {
  label?: string;
  error?: string;
  disabled?: boolean;
  variant?: "default" | "outlined" | "filled";
  style?: StyleProp<TextStyle>; // input style (padding etc.)
  containerStyle?: StyleProp<ViewStyle>; // wrapper for margins
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  // React Hook Form compatibility
  onChangeText?: (text: string) => void;
  value?: string;
  onBlur?: () => void;
}

export const TextField = React.forwardRef<RNTextInput, TextFieldProps>(
  (
    {
      label,
      error,
      disabled = false,
      variant = "default",
      style,
      containerStyle,
      labelStyle,
      errorStyle,
      onChangeText,
      value,
      onBlur,
      ...props
    },
    ref
  ) => {
    const { theme } = useUnistyles();
    const inputRef = React.useRef<RNTextInput>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => inputRef.current as RNTextInput);

    const handleBlur = () => {
      onBlur?.();
    };

    const inputVariantStyle =
      variant === "outlined"
        ? styles.inputOutlined
        : variant === "filled"
        ? styles.inputFilled
        : styles.inputDefault;

    return (
      <View
        style={[
          styles.container,
          disabled ? styles.containerDisabled : null,
          containerStyle,
        ]}
      >
        {label ? (
          <Text
            style={[
              styles.label,
              disabled ? styles.labelDisabled : null,
              labelStyle,
            ]}
          >
            {label}
          </Text>
        ) : null}
        <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
          <View>
            <RNTextInput
              ref={inputRef}
              style={[
                styles.inputBase,
                inputVariantStyle,
                disabled ? styles.inputDisabled : null,
                error ? styles.inputError : null,
                style,
              ]}
              placeholderTextColor={theme.colors.textSecondary}
              editable={!disabled}
              value={value}
              onChangeText={onChangeText}
              onBlur={handleBlur}
              {...props}
            />
          </View>
        </TouchableWithoutFeedback>
        {error ? (
          <Text style={[styles.errorText, errorStyle]}>{error}</Text>
        ) : null}
      </View>
    );
  }
);

TextField.displayName = "TextField";

const styles = StyleSheet.create((theme) => ({
  container: {
    minWidth: "100%",
  },
  containerDisabled: {
    opacity: theme.opacities.disabled,
  },
  label: {
    fontSize: theme.typography.sizes.label,
    lineHeight: theme.typography.lineHeights.label,
    fontFamily: theme.typography.families.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  labelDisabled: {
    color: theme.colors.textSecondary,
  },
  inputBase: {
    height: theme.components.input.height,
    paddingHorizontal: theme.components.input.paddingHorizontal,
    borderRadius: theme.components.input.radius,
    fontSize: theme.typography.sizes.body,
    lineHeight: theme.typography.lineHeights.body,
    fontFamily: theme.typography.families.regular,
    color: theme.colors.text,
  },
  inputDefault: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  inputOutlined: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  inputFilled: {
    backgroundColor: theme.colors.surface,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.border,
    borderRadius: 0,
    borderTopLeftRadius: theme.radii.sm,
    borderTopRightRadius: theme.radii.sm,
  },
  inputDisabled: {
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.border,
  },
  inputError: {
    borderColor: theme.colors.error,
    borderWidth: 2,
  },
  errorText: {
    fontSize: theme.typography.sizes.caption,
    lineHeight: theme.typography.lineHeights.caption,
    fontFamily: theme.typography.families.regular,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
}));
