import { View, Text, Pressable, StyleSheet } from "react-native";
import { Balance } from "../../types";

interface ActivityListItemProps {
  item: Balance;
}

export const ActivityListItem = ({ item }: ActivityListItemProps) => {
  const amount = parseFloat(item.amount);
  const isOwed = amount > 0;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{isOwed ? item.friend_name : "You"}</Text>
        <Text style={styles.owesText}>owes</Text>
        <Text style={styles.name}>{isOwed ? "You" : item.friend_name}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={[styles.amount, { color: isOwed ? "green" : "red" }]}>
          ${Math.abs(amount).toFixed(2)}
        </Text>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: isOwed ? "#FFA500" : "#4CAF50" },
          ]}
        >
          <Text style={styles.buttonText}>{isOwed ? "Request" : "Pay"}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  owesText: {
    fontSize: 12,
    color: "gray",
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
