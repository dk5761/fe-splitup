import { View, Text, Pressable, StyleSheet } from "react-native";

export const ActivityHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  viewAll: {
    fontSize: 16,
    color: "gray",
  },
});
