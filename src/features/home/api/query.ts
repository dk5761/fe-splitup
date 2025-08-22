import { queryOptions } from "@tanstack/react-query";

import { apiGet } from "@/shared/api/client";
import { BalancesResponse } from "../types";
import { homeEndpoints } from "./endpoints";
import { homeKeys } from "./queryKeyFactory";

export const getBalancesQuery = () =>
  queryOptions({
    queryKey: homeKeys.balances(),
    queryFn: () => apiGet<BalancesResponse>(homeEndpoints.balances),
  });
