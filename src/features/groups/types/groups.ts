export interface GroupMember {
  id: string;
  avatar_url: string;
}

export interface Group {
  id: string;
  name: string;
  image_url: string;
  members: GroupMember[];
  // Assuming there might be some emoji or icon identifier
  tag?: string;
}

export interface GroupsListResponse {
  data: Group[];
  total: number;
  limit: number;
  offset: number;
}
