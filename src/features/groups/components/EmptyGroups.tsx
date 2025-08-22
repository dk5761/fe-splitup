import { View, Text, StyleSheet, Pressable } from "react-native";
import { Button } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import { useUnistyles } from "react-native-unistyles";

export const EmptyGroups = () => {
  const { theme } = useUnistyles();

  return (
    <View style={styles.container}>
      {/* Replace with actual illustration */}
      <View style={styles.illustration} />
      <Text style={styles.title}>Empty</Text>
      <Text style={styles.subtitle}>You haven't created a group yet</Text>
      <Button
        variant="primary"
        style={{ marginTop: 20, gap: 10 }}
        title="Create a New Group"
      >
        <Ionicons name="add-circle" size={24} color={theme.colors.primaryOn} />
        <Text style={styles.buttonText}> Create a New Group</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
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
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
  },
});
