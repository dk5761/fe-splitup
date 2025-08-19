import React from "react";
import type { AuthUser, AuthResponse } from "../types";
import {
  getAccessToken,
  setAccessToken,
  storageKeys,
  getObject,
  setObject,
  deleteKey,
  getRefreshToken,
  setRefreshToken,
} from "@/shared/utils/storage";
import { queryClient } from "@/shared/query/client";
import { appToast } from "@/components/toast";

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  refreshToken: string | null;
  initializing: boolean;
}

export interface AuthContextValue extends AuthState {
  signIn: (payload: AuthResponse) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

function loadInitialAuthState(): AuthState {
  const token = getAccessToken();
  const refreshToken = getRefreshToken();
  const user = getObject<AuthUser>(storageKeys.authUser) ?? null;
  return {
    isAuthenticated: !!token,
    user,
    token,
    refreshToken,
    initializing: false,
  };
}

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, setState] = React.useState<AuthState>(() =>
    loadInitialAuthState()
  );

  const signIn = React.useCallback(async (payload: AuthResponse) => {
    setAccessToken(payload.token);
    // store refresh token if provided
    if ((payload as any).refreshToken) {
      // @ts-ignore
      setRefreshToken((payload as any).refreshToken);
    }
    setObject(storageKeys.authUser, payload.user);
    setState({
      isAuthenticated: true,
      user: payload.user,
      token: payload.token,
      refreshToken: (payload as any).refreshToken ?? null,
      initializing: false,
    });
    await queryClient.invalidateQueries();
    appToast.success("Signed in");
  }, []);

  const signOut = React.useCallback(async () => {
    setAccessToken(null);
    deleteKey(storageKeys.authUser);
    deleteKey((storageKeys as any).authRefreshToken);
    setState({
      isAuthenticated: false,
      user: null,
      token: null,
      refreshToken: null,
      initializing: false,
    });
    await queryClient.clear();
    appToast.warning("Signed out");
  }, []);

  const value: AuthContextValue = React.useMemo(
    () => ({ ...state, signIn, signOut }),
    [state, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
