import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { checkUsernameQuery } from "../api/query";

export function useUsernameValidation(username: string) {
  const debouncedUsername = useDebounce(username, 500);

  const { data, isLoading, error } = useQuery({
    ...checkUsernameQuery(debouncedUsername),
    enabled: !!debouncedUsername && debouncedUsername.length >= 3,
  });

  const isAvailable = data?.exists === false;
  const isTaken = data?.exists === true;

  return {
    isChecking: isLoading,
    isAvailable,
    isTaken,
    error,
  };
}
