import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { stylesheet as styles } from "./FriendListHeader.styles";

import { SearchInput } from "@/components/ui/searchInput";

interface FriendListHeaderProps {
  searchTerm: string;
  setSearchTerm: (text: string) => void;
}

export const FriendListHeader = ({
  searchTerm,
  setSearchTerm,
}: FriendListHeaderProps) => {
  return (
    <>
      <SearchInput
        placeholder="Search contact"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.activeTabText}>All Contacts</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
