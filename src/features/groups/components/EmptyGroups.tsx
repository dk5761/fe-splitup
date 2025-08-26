import { View, Text, Pressable } from "react-native";
import { Button } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import { useUnistyles, StyleSheet } from "react-native-unistyles";

export const EmptyGroups = () => {
  const { theme } = useUnistyles();

  return (
    <View style={styles.container}>
      {/* Replace with actual illustration */}

      <Text style={styles.title}>No Groups</Text>
      <Text style={styles.subtitle}>You haven't created a group yet</Text>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  illustration: {
    width: 150,
    height: 150,
    backgroundColor: "#e0e0e0",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
  },
}));
