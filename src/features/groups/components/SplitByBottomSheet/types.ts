import { AddGroupExpenseFormValues } from "../../forms/AddGroupExpenseForm/schema";

export type SplitByBottomSheetProps = {
  groupId: string;
  totalAmount: number;
  payerId?: string;
  participants: AddGroupExpenseFormValues["participants"];
  onSubmit: (
    participants: any[],
    splitType: "EQUAL" | "MANUAL" | "CUSTOM" | "PERCENTAGE" | "SHARES" | "UNEQUAL" | "ITEMIZED",
    payerId?: string
  ) => void;
  onClose: () => void;
};
