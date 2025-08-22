import { queryOptions } from "@tanstack/react-query";
import { apiGet } from "@/shared/api/client";
import { authEndpoints } from "./endpoints";
import { authQueryKeys } from "./queryKeyFactory";
import type { AuthUser, CheckUsernameResponse } from "../types";

export const meQuery = () =>
  queryOptions<AuthUser, Error>({
    queryKey: authQueryKeys.me(),
    queryFn: () => apiGet<AuthUser>(authEndpoints.me),
    staleTime: 60_000,
    retry: 0,
  });

export const checkUsernameQuery = (username: string) =>
  queryOptions<CheckUsernameResponse, Error>({
    queryKey: authQueryKeys.checkUsername(username),
    queryFn: () =>
      apiGet<CheckUsernameResponse>(
        `${authEndpoints.checkUsername}?username=${username}`
      ),
    enabled: !!username && username.length >= 3,
    staleTime: 30_000,
  });
