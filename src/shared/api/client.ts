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
    console.log("data", data);
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

httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error?.config as any;
    const status = error?.response?.status;

    const ignoreUrls = [authEndpoints.register, authEndpoints.login];

    if (status === 401 && !originalRequest?._retry) {
      // console.log("originalRequest", originalRequest);

      if (ignoreUrls.includes(originalRequest?.url)) {
        return Promise.reject(toApiError(error));
      }

      originalRequest._retry = true;
      const currentRefreshToken = getRefreshToken();
      if (!currentRefreshToken) {
        // No refresh token; force sign-out
        deleteKey(storageKeys.authToken);
        deleteKey(storageKeys.authRefreshToken);
        appToast.warning("Session expired. Please log in again.");
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
        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return httpClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed
        deleteKey(storageKeys.authToken);
        deleteKey(storageKeys.authRefreshToken);
        appToast.error("Session expired. Please log in again.");
        return Promise.reject(toApiError(refreshError));
      }
    }

    return Promise.reject(toApiError(error));
  }
);

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
