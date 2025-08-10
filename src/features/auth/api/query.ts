import { queryOptions } from "@tanstack/react-query";
import { apiGet } from "@/shared/api/client";
import { authEndpoints } from "./endpoints";
import { authQueryKeys } from "./queryKeyFactory";
import type { AuthUser } from "../types";

export const meQuery = () =>
  queryOptions<AuthUser, Error>({
    queryKey: authQueryKeys.me(),
    queryFn: () => apiGet<AuthUser>(authEndpoints.me),
    staleTime: 60_000,
    retry: 0,
  });
