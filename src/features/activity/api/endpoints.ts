export const activityEndpoints = {
  getUserFeed: "/activity/feed",
  getGroupFeed: (groupId: string) => `/activity/groups/${groupId}/feed`,
  getFriendFeed: (friendId: string) => `/activity/friends/${friendId}/feed`,
};