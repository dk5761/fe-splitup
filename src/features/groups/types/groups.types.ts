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
