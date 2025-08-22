// src/components/StatsCard/StatsCard.tsx

import React from "react";
import { View, Text, ViewProps } from "react-native";
import { styles } from "./StatsCard.styles";

interface StatsCardProps extends ViewProps {
  title: string;
  value: string;
}

export const StatsCard = ({ title, value, style }: StatsCardProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};
