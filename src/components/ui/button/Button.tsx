import React, { ReactNode } from "react";
import type {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

type ButtonVariant = "primary" | "link";

interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  testID?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = "primary",
  style,
  containerStyle,
  textStyle,
  leftIcon,
  rightIcon,
  testID,
}) => {
  const { theme } = useUnistyles();

  const isDisabled = disabled || loading;

  if (variant === "link") {
    return (
      <View style={[styles.linkContainer, containerStyle]}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: isDisabled }}
          disabled={isDisabled}
          onPress={onPress}
          testID={testID}
          style={({ pressed }) => [
            styles.linkBase,
            pressed ? styles.linkPressed : null,
            isDisabled ? styles.linkDisabled : null,
            style,
          ]}
        >
          {({ pressed }) => (
            <Text
              style={[
                styles.linkText,
                pressed ? styles.linkTextPressed : null,
                isDisabled ? styles.linkTextDisabled : null,
                textStyle,
              ]}
              numberOfLines={1}
            >
              {title}
            </Text>
          )}
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.buttonContainer, containerStyle]}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        disabled={isDisabled}
        onPress={onPress}
        android_ripple={{ color: "#1976D2", borderless: false }}
        testID={testID}
        style={({ pressed }) => [
          styles.buttonPrimaryBase,
          pressed ? styles.buttonPrimaryPressed : null,
          isDisabled ? styles.buttonPrimaryDisabled : null,
          style,
        ]}
      >
        <View style={styles.buttonPrimaryContentRow}>
          {leftIcon ? (
            <View style={styles.buttonPrimaryIcon}>{leftIcon}</View>
          ) : null}
          {loading ? (
            <ActivityIndicator color={theme.colors.primaryOn} />
          ) : (
            <Text
              style={[
                styles.buttonPrimaryText,
                isDisabled ? styles.buttonPrimaryTextDisabled : null,
                textStyle,
              ]}
            >
              {title}
            </Text>
          )}
          {rightIcon ? (
            <View style={styles.buttonPrimaryIcon}>{rightIcon}</View>
          ) : null}
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  buttonContainer: {
    borderRadius: theme.radii.md,
    overflow: "hidden",
  },
  buttonPrimaryBase: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196F3",
    flexDirection: "row",
  },
  buttonPrimaryHovered: {
    backgroundColor: "#1E88E5",
  },
  buttonPrimaryPressed: {
    backgroundColor: "#1976D2",
    borderWidth: 0,
    borderColor: "#1565C0",
  },
  buttonPrimaryDisabled: {
    backgroundColor: "rgba(33, 150, 243, 0.5)",
  },
  buttonPrimaryText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: theme.typography.lineHeights.button,
    fontFamily: "Roboto_500Medium",
  },
  buttonPrimaryTextDisabled: {
    color: "#BDBDBD",
  },
  buttonPrimaryContentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  buttonPrimaryIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
  linkBase: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  linkContainer: {
    // wrapper to allow margin on container per rules
  },
  linkWrapperHovered: {},
  linkPressed: {},
  linkDisabled: {},
  linkText: {
    color: "#2196F3",
    fontSize: 16,
    lineHeight: theme.typography.lineHeights.button,
    fontFamily: "Roboto_400Regular",
  },
  linkTextHovered: {
    color: "#1976D2",
    textDecorationLine: "underline",
  },
  linkTextPressed: {
    color: "#1976D2",
  },
  linkTextDisabled: {
    color: "#BDBDBD",
  },
}));

export type { ButtonProps };
