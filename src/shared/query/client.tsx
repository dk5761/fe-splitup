import { useReactQueryDevTools } from "@dev-plugins/react-query";
import NetInfo from "@react-native-community/netinfo";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import { AppState, Platform } from "react-native";

// Set up React Query to respect app focus and connectivity
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(Boolean(state.isConnected));
  });
});

focusManager.setEventListener((handleFocus) => {
  const onAppStateChange = (state: string) => {
    if (state === "active") handleFocus();
  };
  const sub = AppState.addEventListener("change", onAppStateChange);
  return () => sub.remove();
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 30_000,
      gcTime: 5 * 60 * 1000,
      refetchOnReconnect: true,
      refetchOnWindowFocus: Platform.OS === "web",
    },
    mutations: {
      retry: 1,
    },
  },
});

export function QueryProvider({
  children,
}: PropsWithChildren): React.ReactElement {
  useReactQueryDevTools(queryClient);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
