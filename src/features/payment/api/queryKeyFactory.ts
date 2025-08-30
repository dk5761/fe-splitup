export const paymentQueryKeys = {
  all: ["payment"] as const,
  settlements: () => [...paymentQueryKeys.all, "settlements"] as const,
};
