import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import { AUTH_BASE_URL } from './constants';
import { AuthData, MeResponse } from './types';

export class API {
  private axios: Axios;

  constructor() {
    this.axios = axios.create({
      baseURL: AUTH_BASE_URL,
    });

    this.axios.interceptors.request.use((config) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('one-month-intern-token');
        if (token) {
          config.headers.set('Authorization', `Bearer ${token}`);
        }
      }
      return config;
    });

    this.axios.interceptors.response.use(
      <T extends MeResponse>(response: AxiosResponse<T>): T => {
        if (response.data.accessToken) {
          localStorage.setItem('one-month-intern-token', response.data.accessToken);
        }
        return response.data;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  }
  public async signUp(data: AuthData): Promise<MeResponse> {
    const path = '/register';
    return this.axios.post<MeResponse, MeResponse>(path, data);
  }
  public async logIn(data: AuthData): Promise<MeResponse> {
    const path = '/login?expiresIn=10m';
    return this.axios.post<MeResponse, MeResponse>(path, data);
  }
  public async getUser(): Promise<MeResponse> {
    const path = '/user';
    return this.axios.get<MeResponse, MeResponse>(path);
  }
  public async changeProfile(data: AuthData): Promise<MeResponse> {
    const path = '/profile';
    return this.axios.patch<MeResponse, MeResponse>(path, data);
  }
}

const api = new API();
export default api;
