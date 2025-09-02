export const activityQueryKeys = {
  all: ["activity"] as const,
  feed: () => [...activityQueryKeys.all, "feed"] as const,
  userFeed: (filters: any) => 
    [...activityQueryKeys.feed(), "user", filters] as const,
  groupFeed: (groupId: string, filters?: any) =>
    [...activityQueryKeys.feed(), "group", groupId, filters] as const,
  friendFeed: (friendId: string, filters?: any) =>
    [...activityQueryKeys.feed(), "friend", friendId, filters] as const,
};