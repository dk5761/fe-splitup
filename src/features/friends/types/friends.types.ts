export interface Friend {
  id: string;
  name: string;
  username: string;
  email: string;
}

export interface PaginatedFriends {
  data: Friend[];
  total: number;
  limit: number;
  offset: number;
}

export interface FriendRequest {
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
  };
  sentAt: string;
  direction: "incoming" | "outgoing";
}
