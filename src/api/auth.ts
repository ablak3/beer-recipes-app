import api from './axios';
import { Credentials } from '../types';

export const login = (credentials: Credentials) =>
  api.post<{ token: string }>('/auth/login', credentials);

export const register = (data: { username: string; email: string; password: string }) =>
  api.post('/auth/register', data);
