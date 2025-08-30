import { View, Text } from "react-native";
import { Balance } from "../types";
import { StyleSheet } from "react-native-unistyles";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "@/navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  "Tabs"
>;
interface ActivityListItemProps {
  item: Balance;
}

export const ActivityListItem = ({ item }: ActivityListItemProps) => {
  const navigation = useNavigation<any>();
  const amount = parseFloat(item.amount);
  const isOwed = amount > 0;

  const handlePay = () => {
    navigation.navigate("PaymentStack", {
      screen: "SettlementScreen",
      params: {
        friendId: item.friend_id,
        amount: Math.abs(amount),
        friendName: item.friend_name,
      },
    });
  };

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
        {!isOwed && <Button title="Pay" onPress={handlePay} />}
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
