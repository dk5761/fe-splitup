export const groupsEndpoints = {
  createGroup: "/groups",
  getGroups: "/groups",
  getGroupById: (groupId: string) => `/groups/${groupId}`,
  updateGroup: (groupId: string) => `/groups/${groupId}`,
  deleteGroup: (groupId: string) => `/groups/${groupId}`,
  getGroupMembers: (groupId: string) => `/groups/${groupId}/members`,
  addGroupMembers: (groupId: string) => `/groups/${groupId}/members`,
  removeGroupMember: (groupId: string, userId: string) => `/groups/${groupId}/members/${userId}`,
  getGroupExpenses: (groupId: string) => `/groups/${groupId}/expenses`,
  getGroupBalances: (groupId: string) => `/groups/${groupId}/balances`,
  getGroupSummary: (groupId: string) => `/groups/${groupId}/summary`,
  generateGroupImageUploadUrl: "/groups/image/upload-url",
};

export const expenseEndpoints = {
  CREATE_EXPENSE: "/expenses",
  GET_EXPENSE_DETAILS: (expenseId: string) => `/expenses/${expenseId}`,
  UPDATE_EXPENSE: (expenseId: string) => `/expenses/${expenseId}`,
  DELETE_EXPENSE: (expenseId: string) => `/expenses/${expenseId}`,
  GET_USER_BALANCES: "/expenses/balances",
  GET_PAYMENT_HISTORY: (friendId: string) => `/expenses/history/${friendId}`,
};
