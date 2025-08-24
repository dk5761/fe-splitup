import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@/shared/api/client";
import { CreateExpenseData } from "../types";
import { expenseEndpoints } from "./endpoints";
import { appToast } from "@/components";

export type CreateExpensePayload = {
  expense_data: CreateExpenseData;
  image?: Blob;
};

export const useCreateExpense = () => {
  return useMutation({
    mutationFn: async (data: CreateExpensePayload) => {
      const formData = new FormData();
      formData.append("expense_data", JSON.stringify(data.expense_data));

      if (data.image) {
        formData.append("image", data.image);
      }

      return httpClient.post(expenseEndpoints.CREATE_EXPENSE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      appToast.success("Expense created successfully");
    },
    onError: (error) => {
      appToast.error(error.message || "Failed to create expense");
    },
  });
};
