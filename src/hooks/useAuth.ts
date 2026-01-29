import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService, getStoredUser, isAuthenticated } from '../services/auth';
import type { User } from '../services/auth';

// Custom hook for authentication state
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(getStoredUser());
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getStoredUser());
      setIsAuth(isAuthenticated());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    user,
    isAuthenticated: isAuth,
  };
};

// Custom hook for logout
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.clear();
     // window.location.href = '/auth';
    },
    onError: (error) => {
      console.error('Logout error:', error);
      // Still clear local data even if server logout fails
      queryClient.clear();
      //window.location.href = '/auth';
    },
  });
};
