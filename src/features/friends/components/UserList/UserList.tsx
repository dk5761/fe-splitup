import React, { useCallback } from "react";
import { Text, View } from "react-native";

import { Friend } from "../types/friends.types";
import { UserListItem } from "./UserListItem";
import { stylesheet as styles } from "./UserList.styles";

interface UserListProps {
  users: Friend[];
  debouncedSearchTerm: string;
}

export const UserList = React.memo(
  ({ users, debouncedSearchTerm }: UserListProps) => {
    const renderUser = useCallback(
      (user: Friend) => <UserListItem key={user.id} user={user} />,
      []
    );

    if (users && users.length > 0) {
      return (
        <View style={styles.resultsContainer}>{users.map(renderUser)}</View>
      );
    }

    if (users && users.length === 0 && debouncedSearchTerm) {
      return <Text style={styles.noResultsText}>No users found.</Text>;
    }

    return null;
  }
);
