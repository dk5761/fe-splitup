import { useMutation } from "@tanstack/react-query";
import { apiPost } from "../../../shared/api/client";
import { exampleEndpoints } from "./endpoints";
import type { ExampleItem } from "../types";

interface CreateExampleBody {
  title: string;
}

export function useCreateExample() {
  return useMutation<ExampleItem, Error, CreateExampleBody>({
    mutationFn: (body) =>
      apiPost<ExampleItem, CreateExampleBody>(exampleEndpoints.items, body),
  });
}
