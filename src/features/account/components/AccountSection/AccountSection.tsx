import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { Feather } from "@expo/vector-icons";
import { styles } from "./AccountSection.styles";

interface AccountSectionProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}

export const AccountSection: React.FC<AccountSectionProps> = ({
  icon,
  title,
  onPress,
}) => {
  const { theme } = useUnistyles();
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.titleText}>{title}</Text>
      <Feather
        name="chevron-right"
        size={20}
        color={theme.colors.textSecondary}
      />
    </TouchableOpacity>
  );
};
