import React from "react";
import { View, Image, ScrollView } from "react-native";
import { styles } from "./GroupDetailHeader.styles";
import { Chip } from "@/components/ui/chip/Chip";
import { Group } from "@/features/groups/types";

interface GroupDetailHeaderProps {
  group: Group | undefined;
  navigationState: {
    routes: { key: string; title: string }[];
    index: number;
  };
  jumpTo: (key: string) => void;
}

export const GroupDetailHeader = ({
  group,
  navigationState,
  jumpTo,
}: GroupDetailHeaderProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: group?.image_url || "https://via.placeholder.com/400x200",
        }}
        style={styles.image}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContainer}
      >
        {navigationState.routes.map((route, i) => (
          <Chip
            key={route.key}
            label={route.title}
            selected={navigationState.index === i}
            onPress={() => jumpTo(route.key)}
            style={{ marginRight: 8 }}
          />
        ))}
      </ScrollView>
    </View>
  );
};
