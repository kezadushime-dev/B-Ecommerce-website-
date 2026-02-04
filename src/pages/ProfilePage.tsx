import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { getCurrentUser, logout, getStoredUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { User, Camera, Mail, Shield, Calendar, Edit } from 'lucide-react';

interface UserProfile {
  id: string;
  name?: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt?: string;
}

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', avatar: '' });

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
      setEditData({ name: storedUser.name || '', avatar: storedUser.avatar || '' });
    } else {
      setError('No user data found. Please log in.');
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveProfile = () => {
    if (user) {
      const updatedUser = { ...user, ...editData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsEditing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-500 text-center">
          <p className="text-xl mb-4">{error}</p>
          <button onClick={() => navigate('/auth')} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">My Profile</h1>
            <p className="text-blue-100 text-lg">Manage your account settings</p>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
        {user && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name || 'User'} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-100">
                        <User size={40} className="text-blue-600" />
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700">
                      <Camera size={16} />
                    </button>
                  )}
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Hello, {user.name || 'User'}!
                  </h2>
                  <p className="text-gray-600 mb-4">Welcome back to your dashboard</p>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role.toUpperCase()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Edit size={16} />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6 sm:p-8">
              {isEditing ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Avatar URL</label>
                    <input
                      type="url"
                      value={editData.avatar}
                      onChange={(e) => setEditData({ ...editData, avatar: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter avatar URL"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleSaveProfile}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Mail className="text-blue-600" size={20} />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Email Address</p>
                        <p className="text-gray-900">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Shield className="text-green-600" size={20} />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Account Role</p>
                        <p className="text-gray-900 capitalize">{user.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {user.createdAt && (
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <Calendar className="text-purple-600" size={20} />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Member Since</p>
                          <p className="text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <User className="text-indigo-600" size={20} />
                      <div>
                        <p className="text-sm font-medium text-gray-700">User ID</p>
                        <p className="text-gray-900 font-mono text-sm">{user.id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="bg-gray-50 px-6 py-4 sm:px-8 flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex gap-4">
                {user.role === 'admin' && (
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Go to Dashboard
                  </button>
                )}
                <button
                  onClick={() => navigate('/')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Back to Home
                </button>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
