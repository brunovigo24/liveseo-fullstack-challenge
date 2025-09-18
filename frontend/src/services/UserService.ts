import axios, { AxiosInstance, AxiosError } from 'axios';
import { User } from '../types/user';
import { IUserService, IHttpClient, ServiceConfig, ApiError } from '../types/api';

/**
 * HTTP Client wrapper 
 * Serve como camada de abstração 
 */
class HttpClient implements IHttpClient {
  private axiosInstance: AxiosInstance;

  constructor(config: ServiceConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    // Tratamento centralizado de erros
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const apiError: ApiError = {
          status: error.response?.status || 500,
          message: error.message || 'An unexpected error occurred',
          error: error.response?.statusText,
          timestamp: new Date().toISOString(),
        };
        return Promise.reject(apiError);
      }
    );
  }

  async get<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.get<T>(url);
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data);
    return response.data;
  }

  async patch<T>(url: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url);
    return response.data;
  }
}

export class UserService implements IUserService {
  private httpClient: IHttpClient;
  private readonly USERS_ENDPOINT = '/users';

  constructor(httpClient?: IHttpClient) {
    this.httpClient = httpClient || new HttpClient({
      baseURL: 'https://jsonplaceholder.typicode.com',
      timeout: 10000,
    });
  }
  
  async fetchUsers(): Promise<User[]> {
    const users = await this.httpClient.get<User[]>(this.USERS_ENDPOINT);
    return users as User[];
  }
}

export const userService = new UserService();