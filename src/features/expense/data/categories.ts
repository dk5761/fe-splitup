export const categoryOptions = [
  { label: "Food", value: "FOOD" },
  { label: "Travel", value: "TRAVEL" },
  { label: "Entertainment", value: "ENTERTAINMENT" },
  { label: "Shopping", value: "SHOPPING" },
  { label: "Utilities", value: "UTILITIES" },
  { label: "Rent", value: "RENT" },
  { label: "Groceries", value: "GROCERIES" },
  { label: "Healthcare", value: "HEALTHCARE" },
  { label: "Education", value: "EDUCATION" },
  { label: "Other", value: "OTHER" },
];

export const getCategoryLabel = (value: string): string => {
  const category = categoryOptions.find(cat => cat.value === value);
  return category?.label || "Other";
};