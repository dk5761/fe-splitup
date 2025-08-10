import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

import { getAccessToken } from "../utils/storage";

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
      (typeof data === "object" && data && (data as any).message) ||
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
  (error) => Promise.reject(toApiError(error))
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
