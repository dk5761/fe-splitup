import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@/shared/api/client";
import { CreateExpenseData, CreateGroupPayload } from "../types";
import { expenseEndpoints, groupsEndpoints } from "./endpoints";
import { appToast } from "@/components";
import { queryClient } from "@/shared/query/client";
import { groupsQueryKeys } from "./queryKeyFactory";

export type CreateExpensePayload = {
  expense_data: CreateExpenseData;
  image?: Blob;
};

// Group mutations
export const useCreateGroup = () => {
  return useMutation({
    mutationFn: async (data: CreateGroupPayload) => {
      return httpClient.post(groupsEndpoints.createGroup, data);
    },
    onSuccess: () => {
      appToast.success("Group created successfully");
      queryClient.invalidateQueries({
        queryKey: groupsQueryKeys.lists(),
      });
    },
    onError: (error) => {
      appToast.error(error.message || "Failed to create group");
    },
  });
};

export const useUpdateGroup = () => {
  return useMutation({
    mutationFn: async ({ groupId, data }: { groupId: string; data: Partial<CreateGroupPayload> }) => {
      return httpClient.patch(groupsEndpoints.updateGroup(groupId), data);
    },
    onSuccess: () => {
      appToast.success("Group updated successfully");
      queryClient.invalidateQueries({
        queryKey: groupsQueryKeys.lists(),
      });
    },
    onError: (error) => {
      appToast.error(error.message || "Failed to update group");
    },
  });
};

export const useDeleteGroup = () => {
  return useMutation({
    mutationFn: async (groupId: string) => {
      return httpClient.delete(groupsEndpoints.deleteGroup(groupId));
    },
    onSuccess: () => {
      appToast.success("Group deleted successfully");
      queryClient.invalidateQueries({
        queryKey: groupsQueryKeys.lists(),
      });
    },
    onError: (error) => {
      appToast.error(error.message || "Failed to delete group");
    },
  });
};

export const useAddGroupMembers = () => {
  return useMutation({
    mutationFn: async ({ groupId, members }: { groupId: string; members: any[] }) => {
      return httpClient.post(groupsEndpoints.addGroupMembers(groupId), { members });
    },
    onSuccess: (_, { groupId }) => {
      appToast.success("Members added successfully");
      queryClient.invalidateQueries({
        queryKey: groupsQueryKeys.members(groupId),
      });
      queryClient.invalidateQueries({
        queryKey: groupsQueryKeys.detail(groupId),
      });
    },
    onError: (error) => {
      appToast.error(error.message || "Failed to add members");
    },
  });
};

export const useRemoveGroupMember = () => {
  return useMutation({
    mutationFn: async ({ groupId, userId }: { groupId: string; userId: string }) => {
      return httpClient.delete(groupsEndpoints.removeGroupMember(groupId, userId));
    },
    onSuccess: (_, { groupId }) => {
      appToast.success("Member removed successfully");
      queryClient.invalidateQueries({
        queryKey: groupsQueryKeys.members(groupId),
      });
      queryClient.invalidateQueries({
        queryKey: groupsQueryKeys.detail(groupId),
      });
    },
    onError: (error) => {
      appToast.error(error.message || "Failed to remove member");
    },
  });
};

// Expense mutations
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
