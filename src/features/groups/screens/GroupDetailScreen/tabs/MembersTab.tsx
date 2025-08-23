import React from "react";
import { FlatList, ActivityIndicator, View, Text } from "react-native";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getGroupMembersQuery } from "@/features/groups/api/query";
import { MemberListItem } from "@/features/groups/components/MemberListItem";
import { styles } from "./styles";

interface MembersTabProps {
  groupId: string;
}

export const MembersTab = ({ groupId }: MembersTabProps) => {
  const { data: membersData, isLoading } = useQuery(
    getGroupMembersQuery(groupId)
  );

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <FlatList
      data={membersData ?? []}
      keyExtractor={(item) => item?.user_id ?? ""}
      renderItem={({ item }) => <MemberListItem member={item} />}
      contentContainerStyle={styles.contentContainer}
    />
  );
};
