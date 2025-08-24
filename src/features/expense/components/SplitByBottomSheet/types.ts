export type SplitByBottomSheetProps = {
  groupId: string;
  totalAmount: number;

  onSubmit: (participants: any[], splitType: "EQUAL") => void;
  onClose: () => void;
};
