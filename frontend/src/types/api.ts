import { User } from './user';

// Wrapper genérico para resposta da API
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  status: number;
  message: string;
  error?: string;
  timestamp?: string;
}

export interface IUserService {
  fetchUsers(): Promise<User[]>;
}

// Interface de cliente HTTP 
export interface IHttpClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data?: any): Promise<T>;
  put<T>(url: string, data?: any): Promise<T>;
  patch<T>(url: string, data?: any): Promise<T>;
  delete<T>(url: string): Promise<T>;
}

export interface ServiceConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}