import { View, Text, Pressable } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export const ActivityHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity</Text>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  viewAll: {
    fontSize: 16,
    color: "gray",
  },
}));
