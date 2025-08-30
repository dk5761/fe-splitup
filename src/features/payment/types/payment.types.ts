export interface SettlementPayload {
  friend_id: string;
  amount: number;
  paid_on: string;
  payment_method: "upi" | "cash";
}
