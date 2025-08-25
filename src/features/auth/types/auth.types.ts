export interface AuthUser {
  id: string;
  name: string;
  username: string;
  email: string;
  profile_image_url?: string;
  upi_id?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser;
  access_token: string;
  refresh_token: string;
}

export interface CheckUsernameResponse {
  exists: boolean;
}
