export const friendsQueryKeys = {
  all: ["friends"] as const,
  lists: () => [...friendsQueryKeys.all, "list"] as const,
  list: (filters: string) =>
    [...friendsQueryKeys.lists(), { filters }] as const,
  details: () => [...friendsQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...friendsQueryKeys.details(), id] as const,
};
