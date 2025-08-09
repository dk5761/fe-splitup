export const exampleQueryKeys = {
  all: () => ["example"] as const,
  items: () => [...exampleQueryKeys.all(), "items"] as const,
};
