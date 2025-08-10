import { useMutation } from "@tanstack/react-query";
import { apiPost } from "@/shared/api/client";
import { authEndpoints } from "./endpoints";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../types";
import { appToast } from "@/components/toast";

export function useLoginMutation() {
  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: (body) =>
      apiPost<AuthResponse, LoginRequest>(authEndpoints.login, body),
    onError: (e: any) => {
      appToast.error("Login failed", {
        description: e?.message ?? "Unknown error",
      });
    },
  });
}

export function useRegisterMutation() {
  return useMutation<AuthResponse, Error, RegisterRequest>({
    mutationFn: (body) =>
      apiPost<AuthResponse, RegisterRequest>(authEndpoints.register, body),
    onError: (e: any) => {
      appToast.error("Register failed", {
        description: e?.message ?? "Unknown error",
      });
    },
  });
}
