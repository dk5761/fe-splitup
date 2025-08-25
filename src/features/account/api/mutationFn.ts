import { useMutation } from "@tanstack/react-query";
import { apiPatch, apiPost } from "@/shared/api/client";
import { accountEndpoints } from "./endpoints";
import type { AuthUser } from "@/features/auth/types";
import { appToast } from "@/components/toast";
import { queryClient } from "@/shared/query/client";
import { accountQueryKeys } from "./queryKeyFactory";
import { UpdateProfileRequest } from "@/features/account/types";

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export function useUpdateProfileMutation() {
  return useMutation<AuthUser, Error, UpdateProfileRequest>({
    mutationFn: (body) =>
      apiPatch<AuthUser, UpdateProfileRequest>(
        accountEndpoints.updateProfile,
        body
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: accountQueryKeys.me(),
      });
      appToast.success("Profile image updated successfully");
    },
    onError: (e: any) => {
      appToast.error("Failed to update profile image", {
        description: e?.message ?? "Unknown error",
      });
    },
  });
}

export function useChangePasswordMutation() {
  return useMutation<void, Error, ChangePasswordRequest>({
    mutationFn: (body) =>
      apiPost<void, ChangePasswordRequest>(
        accountEndpoints.changePassword,
        body
      ),
    onSuccess: () => {
      appToast.success("Password changed successfully");
    },
    onError: (e: any) => {
      appToast.error("Password change failed", {
        description: e?.message ?? "Unknown error",
      });
    },
  });
}
