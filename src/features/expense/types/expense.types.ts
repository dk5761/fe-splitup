export type ExpenseParticipant = {
  user_id: string;
  share_amount?: string;
};

export type CreateExpenseData = {
  description: string;
  total_amount: string;
  group_id?: string;
  expense_date: string; // timestamp
  split_type: "EQUAL" | "MANUAL";
  participants: ExpenseParticipant[];
};
