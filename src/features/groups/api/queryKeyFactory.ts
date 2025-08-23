export const groupsQueryKeys = {
  all: ["groups"] as const,
  lists: () => [...groupsQueryKeys.all, "list"] as const,
  list: (filters: string) => [...groupsQueryKeys.lists(), { filters }] as const,
  details: () => [...groupsQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...groupsQueryKeys.details(), id] as const,
  expenses: (id: string) =>
    [...groupsQueryKeys.detail(id), "expenses"] as const,
  members: (id: string) => [...groupsQueryKeys.detail(id), "members"] as const,
};
