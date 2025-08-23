export const friendsEndpoints = {
  getFriends: "/friend",
  removeFriend: (friendId: string) => `/friend/${friendId}`,
  getFriendExpenses: (friendId: string) => `/friend/${friendId}/expenses`,
  searchUsers: "/user/search",
  sendFriendRequest: "/friend/requests",
  getFriendRequests: "/friend/requests",
  respondToFriendRequest: (requesterId: string) =>
    `/friend/requests/${requesterId}`,
};
