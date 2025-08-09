import { useMemo } from "react";
import { exampleQueries } from "../api";
import { useQuery } from "@tanstack/react-query";

export function useExample() {
  const query = useMemo(() => exampleQueries(), []);
  return useQuery(query);
}
