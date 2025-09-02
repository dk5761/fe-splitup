import { infiniteQueryOptions } from "@tanstack/react-query";
import { httpClient } from "@/shared/api/client";
import { activityEndpoints } from "./endpoints";
import { activityQueryKeys } from "./queryKeyFactory";
import { ActivityFeedResponse } from "../types";

export const getUserActivityFeedQuery = (filters: any = {}) =>
  infiniteQueryOptions({
    queryKey: activityQueryKeys.userFeed(filters),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await httpClient.get<ActivityFeedResponse>(
        activityEndpoints.getUserFeed,
        {
          params: {
            page: pageParam,
            limit: 20,
            ...filters,
          },
        }
      );
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: true,
  });

export const getGroupActivityFeedQuery = (groupId: string, filters?: any) =>
  infiniteQueryOptions({
    queryKey: activityQueryKeys.groupFeed(groupId, filters),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await httpClient.get<ActivityFeedResponse>(
        activityEndpoints.getGroupFeed(groupId),
        {
          params: {
            page: pageParam,
            limit: 20,
            ...filters,
          },
        }
      );
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!groupId,
  });

export const getFriendActivityFeedQuery = (friendId: string, filters?: any) =>
  infiniteQueryOptions({
    queryKey: activityQueryKeys.friendFeed(friendId, filters),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await httpClient.get<ActivityFeedResponse>(
        activityEndpoints.getFriendFeed(friendId),
        {
          params: {
            page: pageParam,
            limit: 20,
            ...filters,
          },
        }
      );
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!friendId,
  });