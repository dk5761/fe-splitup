export const friendsEndpoints = {
  getFriends: "/friends",
  removeFriend: (friendId: string) => `/friends/${friendId}`,
  getFriendExpenses: (friendId: string) => `/friends/${friendId}/expenses`,
  searchUsers: "/user/search",
  sendFriendRequest: "/friends/requests",
  getFriendRequests: "/friends/requests",
  respondToFriendRequest: (requesterId: string) =>
    `/friends/requests/${requesterId}`,
};
