// src/components/CustomTabBar/CustomTabBar.tsx

import React from "react";
import { View, Text, Pressable } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { styles } from "./CustomTabBar.styles";
import { useUnistyles } from "react-native-unistyles";
import { Ionicons } from "@expo/vector-icons";
// FIX: Import the hook
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ... (iconMap remains the same)
const iconMap = {
  Home: { focused: "home", unfocused: "home-outline" },
  Groups: { focused: "people", unfocused: "people-outline" },
  Contacts: { focused: "person", unfocused: "person-outline" },
  Account: { focused: "cog", unfocused: "cog-outline" },
};

export const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const { theme } = useUnistyles();
  // FIX: Get the safe area insets
  const insets = useSafeAreaInsets();

  const onCenterButtonPress = () => {
    navigation.navigate("Scan");
  };

  const middleRouteIndex = Math.floor(state.routes.length / 2);

  // FIX: Create a dynamic style for the container that respects the bottom inset
  const containerStyle = {
    ...styles.container,
    paddingBottom: insets.bottom,
    backgroundColor: theme.colors.surface,
  };

  return (
    // Apply the dynamic style
    <View style={containerStyle}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel?.toString() ?? options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({ type: "tabLongPress", target: route.key });
        };

        // Check if iconMap has an entry for the current route
        const iconInfo = iconMap[route.name as keyof typeof iconMap];
        const iconName = iconInfo
          ? isFocused
            ? iconInfo.focused
            : iconInfo.unfocused
          : "alert-circle"; // Fallback icon

        styles.useVariants({ active: isFocused });

        if (index === middleRouteIndex) {
          return (
            <View key={route.key} style={styles.tabButton}>
              <Pressable
                style={styles.centerActionButton}
                onPress={onCenterButtonPress}
              >
                <Ionicons
                  name="scan-outline"
                  size={32}
                  color={theme.colors.primaryOn}
                />
              </Pressable>
            </View>
          );
        }

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            <Ionicons
              name={iconName as any}
              size={24}
              color={
                isFocused ? theme.colors.primary : theme.colors.textSecondary
              }
            />
            <Text style={styles.tabLabel}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};
