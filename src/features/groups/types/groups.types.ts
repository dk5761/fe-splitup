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
  members: GroupMember[];
  image_key?: string;
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

export interface GroupMemberDetails {
  user_id: string;
  name: string;
  username: string;
  email: string;
  avatar_url?: string;
  role: "admin" | "member";
  joined_at: string;
}

export interface GroupMembersResponse {
  data: GroupMemberDetails[];
}

export interface GroupBalanceMember {
  user_id: string;
  user_name: string;
  balance: string; // decimal as string
  paid: string; // decimal as string
  should_pay: string; // decimal as string
}

export interface GroupDebtParticipant {
  id: string;
  name: string;
}

export interface GroupDebt {
  from: GroupDebtParticipant;
  to: GroupDebtParticipant;
  amount: string; // decimal as string
}

export interface GroupBalanceResponse {
  total_expense: string; // decimal as string
  members: GroupBalanceMember[];
  debts: GroupDebt[];
}
