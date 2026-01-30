import api from './api';

// Constants
export const AUTH_TOKEN_KEY = 'authToken';

// Types
export interface User {
  id: string;
  name?: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  avatar?: string;
  createdAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role?: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  profileImage?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem('user');
      // Redirect to auth page instead of home
      if (window.location.pathname !== '/auth') {
       // window.location.href = '/home';
      }
    }
    return Promise.reject(error);
  }
);

// Auth service functions
export const authService = {
  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    const { user, token } = response.data;

    // Store auth data
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem('user', JSON.stringify(user));

    return { user, token };
  },

  // Register
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', userData);
    const { user, token } = response.data;

    // Store auth data
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem('user', JSON.stringify(user));

    return { user, token };
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      // Even if logout fails on server, clear local data
      console.warn('Server logout failed, clearing local data anyway');
    } finally {
      // Always clear local data
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem('user');
    }
  },

  // Refresh token
  refreshToken: async (): Promise<{ token: string }> => {
    const response = await api.post('/auth/refresh');
    const { token } = response.data;

    // Update stored token
    localStorage.setItem(AUTH_TOKEN_KEY, token);

    return { token };
  },
};

// Utility functions
export const getStoredUser = (): User | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getStoredToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getStoredToken();
};

export const clearAuthData = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem('user');
};

// Direct exports for convenience
export const login = authService.login;
export const register = authService.register;
export const getCurrentUser = authService.getCurrentUser;
export const logout = authService.logout;
