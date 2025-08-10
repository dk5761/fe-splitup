export const authEndpoints = {
  // Auth
  register: "/api/v1/auth/register",
  login: "/api/v1/auth/login",
  checkUsername: "/api/v1/auth/check-username",
  // User
  me: "/api/v1/user/me",
} as const;
