import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { apiGet, httpClient } from "@/shared/api/client";
import { groupsQueryKeys } from "./queryKeyFactory";
import {
  Group,
  Expense,
  GroupsListResponse,
  GroupMembersResponse,
  GroupMemberDetails,
} from "../types";
import { groupsEndpoints } from "./endpoints";

// Get Groups
export const getGroupsQuery = () =>
  infiniteQueryOptions({
    queryKey: groupsQueryKeys.lists(),
    queryFn: ({ pageParam = 1 }) =>
      apiGet<GroupsListResponse>(
        `${groupsEndpoints.getGroups}?page=${pageParam}&limit=10`
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.offset + lastPage.limit < lastPage.total) {
        return lastPage.offset / lastPage.limit + 2;
      }
      return undefined;
    },
  });

// Get Group Details
export const getGroupDetailsQuery = (groupId: string) =>
  queryOptions({
    queryKey: groupsQueryKeys.detail(groupId),
    queryFn: () => apiGet<Group>(groupsEndpoints.getGroupById(groupId)),
  });

// Get Group Expenses
interface GroupExpensesResponse {
  data: Expense[];
  total: number;
  limit: number;
  offset: number;
  nextPage?: number;
}

export const getGroupExpensesQuery = (groupId: string) =>
  infiniteQueryOptions({
    queryKey: groupsQueryKeys.expenses(groupId),
    queryFn: ({ pageParam = 1 }) =>
      apiGet<GroupExpensesResponse>(
        `${groupsEndpoints.getGroupExpenses(
          groupId
        )}?page=${pageParam}&limit=10`
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.offset + lastPage.limit < lastPage.total) {
        return lastPage.offset / lastPage.limit + 2;
      }
      return undefined;
    },
  });

// Get Group Members
export const getGroupMembersQuery = (groupId: string) =>
  queryOptions({
    queryKey: groupsQueryKeys.members(groupId),
    queryFn: () =>
      apiGet<GroupMemberDetails[]>(groupsEndpoints.getGroupMembers(groupId)),
  });
