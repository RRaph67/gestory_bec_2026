/**
 * API Client
 * Real backend via axios.
 */

import axios from "axios";

interface ApiClientConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

interface ApiClientRequestConfig {
  headers?: Record<string, string>;
}

interface ApiClient {
  get<T = unknown>(url: string): Promise<T>;
  post<T = unknown>(url: string, data: unknown): Promise<T>;
  interceptors: {
    request: {
      use(onFulfilled: (config: ApiClientRequestConfig) => ApiClientRequestConfig, onRejected: (error: unknown) => Promise<never>): void;
    };
    response: {
      use(onFulfilled: (response: { data: unknown }) => unknown, onRejected: (error: unknown) => Promise<never>): void;
    };
  };
}

export const API_CONFIG = {

  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  TIMEOUT: 10000,
};

// The frontend runs on local mock data unless a backend is explicitly enabled.
export const IS_MOCK_MODE = process.env.NEXT_PUBLIC_USE_MOCKS !== "false";

// existing services/hooks assume apiClient.get/post returns backend JSON body,
// which already matches ApiResponse<T> shape: { success, data, message, timestamp, ... }
const axiosFactory = axios as unknown as { create(config: ApiClientConfig): ApiClient };
export const apiClient = axiosFactory.create({

  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: ApiClientRequestConfig) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: { data: unknown }) => response.data,
  (error: unknown) => Promise.reject(error)
);

