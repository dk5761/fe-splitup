export interface Balance {
  friend_id: string;
  friend_name: string;
  amount: string;
}

export interface BalancesResponse {
  total_you_owe: string;
  total_you_are_owed: string;
  balances: Balance[];
}
