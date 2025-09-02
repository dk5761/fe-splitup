export interface UserInfo {
  id: string;
  name: string;
}

export interface GroupInfo {
  id: string;
  name: string;
}

export interface ActivityMetadata {
  amount?: string;
  currency?: string;
  expense_description?: string;
  category?: string;
  group_name?: string;
  role?: string;
  payment_method?: string;
}

export interface Activity {
  id: string;
  actor_user: UserInfo;
  activity_type: ActivityType;
  entity_type: EntityType;
  entity_id: string;
  target_user?: UserInfo;
  group?: GroupInfo;
  description: string;
  metadata?: ActivityMetadata;
  created_at: string;
}

export interface ActivityFeedResponse {
  activities: Activity[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export type ActivityType = 
  | "expense_created"
  | "expense_updated"
  | "expense_deleted"
  | "group_created"
  | "group_updated"
  | "member_added"
  | "member_removed"
  | "member_role_changed"
  | "friend_request_sent"
  | "friend_request_accepted"
  | "friend_request_rejected"
  | "friendship_removed"
  | "payment_recorded"
  | "expense_settled";

export type EntityType = "expense" | "group" | "friend" | "payment";

export type ActivityFilter = "all" | "expenses" | "groups" | "friends" | "payments";

export interface ActivityFilters {
  filter?: ActivityFilter;
  group_id?: string;
  friend_id?: string;
  page?: number;
  limit?: number;
}

export interface ActivityFilterOption {
  label: string;
  value: ActivityFilter;
  icon?: string;
}