import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./MemberListItem.styles";
import { GroupMemberDetails } from "@/features/groups/types";

interface MemberListItemProps {
  member: GroupMemberDetails;
}

export const MemberListItem = ({ member }: MemberListItemProps) => {
  styles.useVariants({
    role: member.role,
  });

  return (
    <View style={styles.container}>
      {/* <Image
        source={{ uri: member.avatar_url || "https://via.placeholder.com/48" }}
        style={styles.avatar}
      /> */}
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{member.name}</Text>
        <Text style={styles.username}>@{member.username}</Text>
      </View>
      <View style={styles.roleContainer}>
        <Text style={styles.role}>{member.role}</Text>
      </View>
    </View>
  );
};
