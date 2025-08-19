import { MMKV } from "react-native-mmkv";

// Use a stable encryption key from env in production. For dev fallback to a default.
const encryptionKey =
  process.env.EXPO_PUBLIC_MMKV_ENCRYPTION_KEY ?? "dev_encrypt_key_change_me";

export const mmkv = new MMKV({ id: "app-storage", encryptionKey });

export const storageKeys = {
  authToken: "auth.token",
  authRefreshToken: "auth.refreshToken",
  authUser: "auth.user",
} as const;

export function setString(key: string, value: string): void {
  mmkv.set(key, value);
}

export function getString(key: string): string | undefined {
  return mmkv.getString(key) ?? undefined;
}

export function setObject<T extends object>(key: string, value: T): void {
  mmkv.set(key, JSON.stringify(value));
}

export function getObject<T>(key: string): T | undefined {
  const raw = mmkv.getString(key);
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}

export function deleteKey(key: string): void {
  mmkv.delete(key);
}

export function clearAll(): void {
  mmkv.clearAll();
}

// Auth-specific helpers
export function getAccessToken(): string | null {
  return getString(storageKeys.authToken) ?? null;
}

export function setAccessToken(token: string | null): void {
  if (!token) {
    deleteKey(storageKeys.authToken);
    return;
  }
  setString(storageKeys.authToken, token);
}

export function getRefreshToken(): string | null {
  return getString(storageKeys.authRefreshToken) ?? null;
}

export function setRefreshToken(token: string | null): void {
  if (!token) {
    deleteKey(storageKeys.authRefreshToken);
    return;
  }
  setString(storageKeys.authRefreshToken, token);
}
