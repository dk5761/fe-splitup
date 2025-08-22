export const homeKeys = {
  all: ["home"] as const,
  balances: () => [...homeKeys.all, "balances"] as const,
};
