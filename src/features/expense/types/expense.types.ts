export type ExpenseParticipant = {
  user_id: string;
};

export type CreateExpenseData = {
  description: string;
  total_amount: string;
  group_id?: string;
  category?: string;
  payer_id?: string;
  expense_date: string; // timestamp
  split_type: "EQUAL" | "MANUAL" | "CUSTOM" | "PERCENTAGE" | "SHARES" | "UNEQUAL" | "ITEMIZED";
  participants: ExpenseParticipant[];
};
