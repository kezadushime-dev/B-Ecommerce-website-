import React from 'react';
import { X, User, Mail, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLogout } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const logoutMutation = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      onClose();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          title="Close modal"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            {user?.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <User size={32} className="text-blue-600" />
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-800">{user?.name || 'User'}</h2>
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <Mail size={16} />
            {user?.email}
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              onClose();
              navigate('/profile');
            }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View Full Profile
          </button>
          <button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <LogOut size={16} />
            {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
    </div>
  );
};
