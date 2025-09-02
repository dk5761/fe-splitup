import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";

import {
  getAccessToken,
  getRefreshToken,
  deleteKey,
  storageKeys,
  setAccessToken,
  setRefreshToken,
} from "../utils/storage";
import { authEndpoints } from "@/features/auth/api/endpoints";
import { appToast } from "@/components/toast";
import { navigationRef } from "@/navigation/navigationRef";

export type ApiError = {
  message: string;
  status?: number;
  data?: unknown;
  isNetworkError: boolean;
  raw: unknown;
};

export function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;
    const data = axiosError.response?.data;

    const isNetworkError = !!axiosError.isAxiosError && !axiosError.response;
    const message =
      (typeof data === "object" && data && (data as any).error) ||
      axiosError.message ||
      "Request failed";
    return { message, status, data, isNetworkError, raw: error };
  }
  return {
    message: (error as any)?.message ?? "Unknown error",
    status: undefined,
    data: undefined,
    isNetworkError: false,
    raw: error,
  };
}

const baseURL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const httpClient: AxiosInstance = axios.create({
  baseURL,
  // Axios expects milliseconds. 60 was 60ms → instant timeout.
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

httpClient.interceptors.request.use(async (config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error?.config as any;
    const status = error?.response?.status;

    const ignoreUrls = [authEndpoints.register, authEndpoints.login, authEndpoints.refresh];

    if (status === 401 && !originalRequest?._retry) {
      if (ignoreUrls.includes(originalRequest?.url)) {
        return Promise.reject(toApiError(error));
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        // If already refreshing, add to queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return httpClient(originalRequest);
        }).catch((err) => {
          return Promise.reject(err);
        });
      }

      isRefreshing = true;
      const currentRefreshToken = getRefreshToken();
      
      if (!currentRefreshToken) {
        // No refresh token; force sign-out
        forceLogout();
        return Promise.reject(toApiError(error));
      }

      // Perform refresh token request
      try {
        const res = await httpClient.post<any>(authEndpoints.refresh, {
          refresh_token: currentRefreshToken,
        });
        const newToken = res?.data?.access_token;
        const newRefresh = res?.data?.refresh_token;
        
        if (newToken) {
          setAccessToken(newToken);
        }
        if (newRefresh) {
          setRefreshToken(newRefresh);
        }
        
        isRefreshing = false;
        processQueue(null, newToken);
        
        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return httpClient(originalRequest);
      } catch (refreshError: any) {
        isRefreshing = false;
        processQueue(refreshError, null);
        
        // Check if refresh token is expired/invalid
        const refreshStatus = refreshError?.response?.status;
        const refreshErrorData = refreshError?.response?.data;
        
        if (refreshStatus === 400 || refreshStatus === 401) {
          // Refresh token is expired or invalid
          if (refreshErrorData?.error?.includes("refresh token") || 
              refreshErrorData?.error?.includes("expired") ||
              refreshErrorData?.error?.includes("invalid")) {
            forceLogout();
            return Promise.reject(toApiError(refreshError));
          }
        }
        
        // Other refresh error
        forceLogout();
        return Promise.reject(toApiError(refreshError));
      }
    }

    return Promise.reject(toApiError(error));
  }
);

function forceLogout() {
  // Clear all auth data
  deleteKey(storageKeys.authToken);
  deleteKey(storageKeys.authRefreshToken);
  deleteKey(storageKeys.authUser);
  
  // Clear query cache
  const { queryClient } = require('@/shared/query/client');
  queryClient.clear();
  
  // Show message to user
  appToast.error("Session expired. Please log in again.");
  
  // Navigate to auth screen after a short delay
  setTimeout(() => {
    if (navigationRef.current) {
      navigationRef.current.resetRoot({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    }
  }, 100);
}

export async function apiGet<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await httpClient.get<T>(url, config);
  return res.data as T;
}

export async function apiPost<T, B = unknown>(
  url: string,
  body: B,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await httpClient.post<T>(url, body, config);
  return res.data as T;
}

export async function apiPut<T, B = unknown>(
  url: string,
  body: B,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await httpClient.put<T>(url, body, config);
  return res.data as T;
}

export async function apiPatch<T, B = unknown>(
  url: string,
  body: B,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await httpClient.patch<T>(url, body, config);
  return res.data as T;
}

export async function apiDelete<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await httpClient.delete<T>(url, config);
  return res.data as T;
}
