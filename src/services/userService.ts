import api from './api';

// User-related API functions using the configured Axios instance
export const userService = {
  // GET all users
  getUsers: async (params?: { search?: string; role?: string }) => {
    const response = await api.get('/users', { params });
    return response.data;
  },

  // GET single user
  getUser: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // POST create user
  createUser: async (userData: { name: string; email: string; role?: string }) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // PUT update user
  updateUser: async (id: string, userData: Partial<{ name: string; email: string; role: string }>) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  // DELETE user
  deleteUser: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};
