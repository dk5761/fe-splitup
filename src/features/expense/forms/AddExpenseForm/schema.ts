import { z } from "zod";

export const addExpenseSchema = z.object({
  description: z.string().min(1, "Title is required"),
  total_amount: z.string().min(1, "Amount is required"),
  expense_date: z.date(),
  split_type: z.enum(["EQUAL", "MANUAL"]),
  participants: z
    .array(
      z.object({
        user_id: z.string(),
        share_amount: z.string().optional(),
      })
    )
    .min(1, "At least one participant is required"),
  image: z.any().optional(),
});

export type AddExpenseFormValues = z.infer<typeof addExpenseSchema>;
