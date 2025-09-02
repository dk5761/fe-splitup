import React from "react";
import { View, Text, Pressable, FlatList, TouchableOpacity } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { styles } from "./CategorySelectorBottomSheet.styles";
import { categoryOptions, getCategoryLabel } from "../data/categories";
import { Check } from "lucide-react-native";

interface CategorySelectorBottomSheetProps {
  selectedCategory?: string;
  onCategorySelect: (category: string) => void;
  onClose: () => void;
}

export const CategorySelectorBottomSheet: React.FC<CategorySelectorBottomSheetProps> = ({
  selectedCategory,
  onCategorySelect,
  onClose,
}) => {
  const { theme } = useUnistyles();

  const handleCategoryPress = (category: string) => {
    onCategorySelect(category);
  };

  const renderCategoryItem = ({ item }: { item: { label: string; value: string } }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item.value)}
    >
      <View style={styles.categoryItemContent}>
        <Text style={[styles.categoryLabel, { color: theme.colors.text }]}>
          {item.label}
        </Text>
        {selectedCategory === item.value && (
          <Check size={20} color={theme.colors.primary} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Select Category
        </Text>
        <Pressable onPress={onClose}>
          <Text style={[styles.cancelButton, { color: theme.colors.primary }]}>
            Cancel
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={categoryOptions}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.value}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};