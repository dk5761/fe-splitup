import { AddExpenseFormValues } from "../../forms/AddExpenseForm/schema";

export type SplitByBottomSheetProps = {
  groupId: string;
  totalAmount: number;
  payerId?: string;
  participants: AddExpenseFormValues["participants"];
  onSubmit: (
    participants: any[],
    splitType: "EQUAL",
    payerId?: string
  ) => void;
  onClose: () => void;
};
