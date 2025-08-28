import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { styles } from "./CustomTabBar.styles";
import { useUnistyles } from "react-native-unistyles";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTabBar } from "@/shared/context/TabBarContext";

const iconMap = {
  Home: { focused: "home", unfocused: "home-outline" },
  Groups: { focused: "people", unfocused: "people-outline" },
  Friends: { focused: "person", unfocused: "person-outline" },
  Account: {
    focused: "person-circle",
    unfocused: "person-circle-outline",
  },
};

const TAB_BAR_HEIGHT = 80; // Approximate height, adjust if needed

export const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const { theme } = useUnistyles();

  const { isTabBarVisible } = useTabBar();

  const tabBarVisible = useSharedValue(isTabBarVisible ? 1 : 0);

  useEffect(() => {
    tabBarVisible.value = withTiming(isTabBarVisible ? 1 : 0, {
      duration: 300,
    });
  }, [isTabBarVisible, tabBarVisible]);

  const animatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      tabBarVisible.value,
      [0, 1],
      [0, TAB_BAR_HEIGHT]
    );
    const paddingTop = interpolate(tabBarVisible.value, [0, 1], [0, 10]);

    return {
      height,
      paddingTop,
      opacity: tabBarVisible.value,
      overflow: "hidden",
    };
  });

  // const onCenterButtonPress = () => {
  //   navigation.navigate("Scan");
  // };

  // const middleRouteIndex = Math.floor(state.routes.length / 2);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
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

        const iconInfo = iconMap[route.name as keyof typeof iconMap];
        const iconName = iconInfo
          ? isFocused
            ? iconInfo.focused
            : iconInfo.unfocused
          : "alert-circle";

        styles.useVariants({ active: isFocused });

        // if (index === middleRouteIndex) {
        //   return (
        //     <View key={route.key} style={styles.tabButton}>
        //       <Pressable
        //         style={styles.centerActionButton}
        //         onPress={onCenterButtonPress}
        //       >
        //         <Ionicons
        //           name="scan-outline"
        //           size={32}
        //           color={theme.colors.primaryOn}
        //         />
        //       </Pressable>
        //     </View>
        //   );
        // }

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
    </Animated.View>
  );
};
