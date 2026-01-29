import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { getCurrentUser, logout, getStoredUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  role: string;
  // Add other fields as needed
}

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    } else {
      setError('No user data found. Please log in.');
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <div className="relative h-[200px] flex items-center justify-center bg-[#222] mb-16">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">My Profile</h1>
      </div>

      <div className="container mx-auto px-4 max-w-2xl">
        {user && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="mt-1 text-sm text-gray-900">{user.role}</p>
              </div>
              {/* Add more fields as needed */}
            </div>
            <button
              onClick={handleLogout}
              className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
