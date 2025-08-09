import { queryOptions } from "@tanstack/react-query";
import { apiGet } from "../../../shared/api/client";
import { exampleQueryKeys } from "./queryKeyFactory";
import { exampleEndpoints } from "./endpoints";
import type { ExampleItem } from "../types";

export const exampleQueries = () =>
  queryOptions<ExampleItem[], Error>({
    queryKey: exampleQueryKeys.items(),
    queryFn: () => apiGet<ExampleItem[]>(exampleEndpoints.items),
    staleTime: 0,
    retry: 0,
  });
