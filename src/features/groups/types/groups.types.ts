export interface GroupMember {
  user_id: string;
  role: "admin" | "member";
}

export interface Group {
  id: string;
  name: string;
  members: GroupMember[];
  image_url?: string;
}

export interface CreateGroupPayload {
  name: string;
  members: string; // JSON string
  image?: {
    uri: string;
    type: string;
    name: string;
  };
}

export interface GroupsListResponse {
  data: Group[];
  total: number;
  limit: number;
  offset: number;
}

export interface ExpenseParticipant {
  user_id: string;
  share_amount: string;
}

export interface Payer {
  id: string;
  name: string;
}

export interface ExpenseCategory {
  name: string;
  icon_name: string;
}

export interface Expense {
  id: string;
  description: string;
  total_amount: string;
  expense_date: string;
  payer: Payer;
  category: ExpenseCategory;
  participants: ExpenseParticipant[];
}
