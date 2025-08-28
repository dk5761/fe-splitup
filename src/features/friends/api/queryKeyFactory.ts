export const friendsQueryKeys = {
  all: ["friends"] as const,
  search: (searchTerm: string) =>
    [...friendsQueryKeys.all, "search", searchTerm] as const,
  lists: () => [...friendsQueryKeys.all, "list"] as const,
  list: (filters: string) =>
    [...friendsQueryKeys.lists(), { filters }] as const,
  details: () => [...friendsQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...friendsQueryKeys.details(), id] as const,
  expenseLists: () => [...friendsQueryKeys.all, "expense-list"] as const,
  expenseList: (friendId: string) =>
    [...friendsQueryKeys.expenseLists(), friendId] as const,
};
