// services/api.ts
import axios from 'axios';

// Create a basic Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: parseInt(import.meta.env.VITE_TIMEOUT || '30000'),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a public API instance without auth interceptor
export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: parseInt(import.meta.env.VITE_TIMEOUT || '30000'),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
