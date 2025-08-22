import { View, Text, StyleSheet } from "react-native";

export const GroupsHeader = () => {
  return (
    <View style={styles.container}>
      {/* Replace with actual icons */}
      <Text>Logo</Text>
      <Text style={styles.title}>Groups</Text>
      <Text>...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
