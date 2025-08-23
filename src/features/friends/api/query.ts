import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { httpClient } from "@/shared/api/client";
import { friendsEndpoints } from "./endpoints";
import { friendsQueryKeys } from "./queryKeyFactory";
import {
  PaginatedFriends,
  Friend,
  PaginatedExpenses,
} from "../types/friends.types";

export const getFriendsQuery = () =>
  infiniteQueryOptions({
    queryKey: friendsQueryKeys.lists(),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await httpClient.get<PaginatedFriends>(
        friendsEndpoints.getFriends,
        {
          params: {
            page: pageParam,
            limit: 10,
          },
        }
      );
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.offset + lastPage.limit < lastPage.total) {
        return lastPage.offset / lastPage.limit + 2;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

export const searchUsersQuery = (searchTerm: string) =>
  queryOptions({
    queryKey: ["searchUsers", searchTerm],
    queryFn: async () => {
      if (!searchTerm) {
        return [];
      }
      const response = await httpClient.get<{ data: Friend[] }>(
        friendsEndpoints.searchUsers,
        {
          params: {
            q: searchTerm,
          },
        }
      );
      return response.data.data;
    },
    enabled: !!searchTerm,
  });

export const getFriendExpensesQuery = (friendId: string) =>
  infiniteQueryOptions({
    queryKey: friendsQueryKeys.expenseList(friendId),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await httpClient.get<PaginatedExpenses>(
        friendsEndpoints.getFriendExpenses(friendId),
        {
          params: {
            page: pageParam,
            limit: 20,
          },
        }
      );
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.offset + lastPage.limit < lastPage.total) {
        return lastPage.offset / lastPage.limit + 2;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
