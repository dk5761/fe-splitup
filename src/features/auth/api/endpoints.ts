export const authEndpoints = {
  // Auth
  register: "/auth/register",
  login: "/auth/login",
  checkUsername: "/auth/check-username",
  refresh: "/auth/refresh",
  logout: "/auth/logout",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  // User
  me: "/user/me",
} as const;
