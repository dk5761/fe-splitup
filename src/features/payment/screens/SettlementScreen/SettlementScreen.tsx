import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSettlePayment } from "../../api";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { MainStackParamList } from "@/navigation/types";
import { styles } from "./SettlementScreen.styles";
import { appToast } from "@/components/toast";

type SettlementScreenRouteProp = RouteProp<
  MainStackParamList,
  "SettlementScreen"
>;

export const SettlementScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<SettlementScreenRouteProp>();
  const { friendId, amount, friendName, friendEmail, friendAvatar } =
    route.params;

  const [paymentAmount, setPaymentAmount] = useState(amount.toString());
  const { mutate: settlePayment, isPending } = useSettlePayment();

  const handlePayment = () => {
    const amountValue = parseFloat(paymentAmount);
    if (isNaN(amountValue) || amountValue <= 0) {
      appToast.error("Invalid Amount", {
        description: "Please enter a valid amount to settle.",
      });
      return;
    }

    settlePayment(
      {
        friend_id: friendId,
        amount: amountValue,
        paid_on: new Date().toISOString(),
        payment_method: "upi", // Or allow user to choose
      },
      {
        onSuccess: () => {
          navigation.goBack();
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Recipient</Text>
        <View style={styles.recipientContainer}>
          <Image
            source={{ uri: friendAvatar || "https://via.placeholder.com/150" }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.recipientName}>{friendName}</Text>
            {friendEmail && (
              <Text style={styles.recipientEmail}>{friendEmail}</Text>
            )}
          </View>
        </View>

        <Text style={styles.title}>Amount to Pay</Text>
        <Input
          value={paymentAmount}
          onChangeText={setPaymentAmount}
          keyboardType="numeric"
          style={styles.amountInput}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            variant="outline"
            style={{ flex: 1 }}
            onPress={() => navigation.goBack()}
          />
          <Button
            title="Pay Now"
            style={{ flex: 1 }}
            onPress={handlePayment}
            loading={isPending}
          />
        </View>
      </View>
    </View>
  );
};
