export const groupsKeys = {
  all: ["groups"] as const,
  lists: () => [...groupsKeys.all, "list"] as const,
  list: (filters: { page: number; limit: number }) =>
    [...groupsKeys.lists(), filters] as const,
};
