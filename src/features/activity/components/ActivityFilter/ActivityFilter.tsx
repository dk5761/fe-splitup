import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { ActivityFilters, ActivityFilterOption } from "../../types";

interface ActivityFilterProps {
  filters: ActivityFilters;
  onFilterChange: (filters: ActivityFilters) => void;
  filterOptions: ActivityFilterOption[];
}

export const ActivityFilter: React.FC<ActivityFilterProps> = ({
  filters,
  onFilterChange,
  filterOptions,
}) => {
  const handleFilterSelect = (filterValue: string) => {
    onFilterChange({ ...filters, filter: filterValue as any });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {filterOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.filterButton,
              filters.filter === option.value && styles.activeFilterButton,
            ]}
            onPress={() => handleFilterSelect(option.value)}
          >
            <Text style={styles.filterIcon}>{option.icon}</Text>
            <Text
              style={[
                styles.filterText,
                filters.filter === option.value && styles.activeFilterText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  scrollContainer: {
    paddingHorizontal: 4,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activeFilterButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.textSecondary,
  },
  activeFilterText: {
    color: theme.colors.primaryOn,
  },
}));
