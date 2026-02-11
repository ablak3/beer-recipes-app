import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8090', // adjust to match your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token from localStorage
api.interceptors.request.use(config => {
  const isAuthRequest = config.url?.includes('/auth/login');
  if(!isAuthRequest) {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;
