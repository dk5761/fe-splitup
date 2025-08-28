export interface Friend {
  id: string;
  name: string;
  username: string;
  email: string;

  friendship_status?:
    | "accepted"
    | "pending_sent"
    | "pending_received"
    | "not_friends";
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

export interface Expense {
  id: string;
  description: string;
  total_amount: number;
  group_id: string | null;
  expense_date: string;
  split_type: "equal" | "exact" | "percentage";
  participants: {
    user_id: string;
    share_amount: string;
  }[];
}

export interface PaginatedExpenses {
  data: Expense[];
  total: number;
  limit: number;
  offset: number;
}
