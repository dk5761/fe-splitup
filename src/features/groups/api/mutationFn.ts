import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/shared/api/client";
import { groupsEndpoints } from "./endpoints";
import { CreateGroupPayload } from "../types";
import { groupsQueryKeys } from "./queryKeyFactory";
import { Toaster, toast } from "sonner-native";

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGroupPayload) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("members", data.members);
      if (data.image) {
        formData.append("image", data.image as any);
      }

      return httpClient.post(groupsEndpoints.createGroup, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      toast.success("Group created successfully!");
      queryClient.invalidateQueries({ queryKey: groupsQueryKeys.lists() });
    },
    onError: (error) => {
      toast.error("Failed to create group.");
    },
  });
};
