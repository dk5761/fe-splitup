import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/shared/api/client";
import { groupsEndpoints } from "./endpoints";
import { CreateGroupPayload } from "../types";
import { groupsQueryKeys } from "./queryKeyFactory";
import { appToast } from "@/components/toast";

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGroupPayload) => {
      return httpClient.post(groupsEndpoints.createGroup, data);
    },
    onSuccess: () => {
      appToast.success("Group created successfully!");
      queryClient.invalidateQueries({ queryKey: groupsQueryKeys.lists() });
    },
    onError: (error: Error) => {
      appToast.error("Failed to create group", {
        description: error.message || "Please check the details and try again.",
      });
    },
  });
};
