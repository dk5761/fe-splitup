import { infiniteQueryOptions } from "@tanstack/react-query";

import { apiGet } from "@/shared/api/client";
import { GroupsListResponse } from "../types/groups.types";
import { groupsEndpoints } from "./endpoints";
import { groupsQueryKeys } from "./queryKeyFactory";

export const getGroupsQuery = () =>
  infiniteQueryOptions({
    queryKey: groupsQueryKeys.lists(),
    queryFn: ({ pageParam = 1 }) =>
      apiGet<GroupsListResponse>(
        `${groupsEndpoints.getGroups}?page=${pageParam}&limit=10`
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.offset + lastPage.limit < lastPage.total) {
        return lastPage.offset / lastPage.limit + 2;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
