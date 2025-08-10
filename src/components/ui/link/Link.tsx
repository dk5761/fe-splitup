import React from "react";
import type {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native-unistyles";

interface LinkProps {
  children: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  visited?: boolean;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  testID?: string;
  href?: string; // optional route name
}

export const Link: React.FC<LinkProps> = ({
  children,
  onPress,
  disabled = false,
  visited = false,
  style,
  containerStyle,
  testID,
  href,
}) => {
  const navigation = useNavigation<any>();
  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        accessibilityRole="link"
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={(e) => {
          if (href) {
            try {
              navigation.navigate(href as never);
            } catch {}
          }
          onPress?.(e);
        }}
        testID={testID}
        style={({ pressed }) => [styles.wrapper]}
      >
        {({ pressed }) => (
          <Text
            style={[
              styles.base,
              pressed ? styles.basePressed : null,
              visited ? styles.visited : null,
              disabled ? styles.disabled : null,
              style,
            ]}
          >
            {children}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create(() => ({
  container: {
    // margin can be applied via containerStyle
  },
  wrapper: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  wrapperHovered: {},
  base: {
    color: "#2196F3",
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
  },
  baseHovered: {
    color: "#1976D2",
    textDecorationLine: "underline",
  },
  basePressed: {
    color: "#1976D2",
  },
  visited: {
    color: "#673AB7",
  },
  disabled: {
    color: "#BDBDBD",
  },
  hovered: {
    // wrapper style hook if needed later
  },
}));

export type { LinkProps };
