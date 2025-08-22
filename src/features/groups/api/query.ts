import { infiniteQueryOptions } from "@tanstack/react-query";

import { apiGet } from "@/shared/api/client";
import { GroupsListResponse } from "../types";
import { groupsEndpoints } from "./endpoints";
import { groupsKeys } from "./queryKeyFactory";

export const getGroupsQuery = () =>
  infiniteQueryOptions({
    queryKey: groupsKeys.lists(),
    queryFn: ({ pageParam = 1 }) =>
      apiGet<GroupsListResponse>(
        `${groupsEndpoints.groups}?page=${pageParam}&limit=10`
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.offset + lastPage.limit < lastPage.total) {
        return lastPage.offset / lastPage.limit + 2;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
