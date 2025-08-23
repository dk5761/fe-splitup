export const groupsQueryKeys = {
  all: ["groups"] as const,
  lists: () => [...groupsQueryKeys.all, "list"] as const,
  list: (filters: string) => [...groupsQueryKeys.lists(), { filters }] as const,
};