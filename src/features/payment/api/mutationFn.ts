import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/shared/api/client";
import { paymentEndpoints } from "./endpoints";
import { SettlementPayload } from "../types";
import { appToast } from "@/components/toast";
import { friendsQueryKeys } from "@/features/friends/api";

export const useSettlePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SettlementPayload) => {
      return httpClient.post(paymentEndpoints.settle, data);
    },
    onSuccess: () => {
      appToast.success("Payment settled successfully!");
      queryClient.invalidateQueries({
        queryKey: friendsQueryKeys.all,
      });
    },
    onError: (error: Error) => {
      appToast.error("Failed to settle payment", {
        description: error.message || "Please check the details and try again.",
      });
    },
  });
};
