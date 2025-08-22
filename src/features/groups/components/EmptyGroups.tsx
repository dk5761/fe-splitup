import { View, Text, StyleSheet, Pressable } from "react-native";
import { Button } from "@/components/ui/button";

export const EmptyGroups = () => {
  return (
    <View style={styles.container}>
      {/* Replace with actual illustration */}
      <View style={styles.illustration} />
      <Text style={styles.title}>Empty</Text>
      <Text style={styles.subtitle}>You haven't created a group yet</Text>
      <Button
        variant="primary"
        style={{ marginTop: 20 }}
        title="Create a New Group"
      >
        <Text>+ Create a New Group</Text>
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
