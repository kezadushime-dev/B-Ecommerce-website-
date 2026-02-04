// services/api.ts
import axios from 'axios';

// Create a basic Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a public API instance without auth interceptor
export const publicApi = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
