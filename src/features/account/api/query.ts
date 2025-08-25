import { queryOptions } from "@tanstack/react-query";
import { apiGet } from "@/shared/api/client";
import { accountEndpoints } from "./endpoints";
import { accountQueryKeys } from "./queryKeyFactory";
import type { AuthUser } from "@/features/auth/types";

export const meQuery = () =>
  queryOptions<AuthUser, Error>({
    queryKey: accountQueryKeys.me(),
    queryFn: () => apiGet<AuthUser>(accountEndpoints.me),
    staleTime: 60_000,
    retry: 0,
  });
