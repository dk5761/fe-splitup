export const authQueryKeys = {
  all: () => ["auth"] as const,
  me: () => [...authQueryKeys.all(), "me"] as const,
  checkUsername: (username: string) =>
    [...authQueryKeys.all(), "check-username", username] as const,
} as const;
