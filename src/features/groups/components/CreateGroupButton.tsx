import { Pressable, StyleSheet, Text } from "react-native";

export const CreateGroupButton = () => {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.plus}>+</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFA500",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  plus: {
    fontSize: 30,
    color: "white",
  },
});
