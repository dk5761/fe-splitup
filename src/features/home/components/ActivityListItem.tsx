import { View, Text } from "react-native";
import { Balance } from "../types";
import { StyleSheet } from "react-native-unistyles";

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
          ₹{Math.abs(amount).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.text,
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
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
}));
