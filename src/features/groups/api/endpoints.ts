export const groupsEndpoints = {
  createGroup: "/groups",
  getGroups: "/groups",
  getGroupById: (groupId: string) => `/groups/${groupId}`,
  getGroupExpenses: (groupId:string) => `/groups/${groupId}/expenses`,
  getGroupMembers: (groupId: string) => `/groups/${groupId}/members`,
  generateImageUploadUrl: "/groups/image/upload-url",
};
