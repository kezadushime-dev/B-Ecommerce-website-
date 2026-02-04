import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authService, getStoredUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', avatar: '' });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        setRegisterData({ ...registerData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      console.log('Login successful', data);
      console.log('User role:', data.user.role);
      setSuccessMessage('Login successful! Redirecting...');
      
      // Force page refresh and redirect
      setTimeout(() => {
        if (data.user.role.toLowerCase() === 'admin') {
          window.location.href = '/dashboard';
        } else {
          window.location.href = '/';
        }
      }, 1000);
    },
    onError: (error) => {
      console.error('Login error:', error);
    }
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      console.log('Registration successful', data);
      setSuccessMessage('Registration successful! Redirecting...');
      
      // Force page refresh and redirect
      setTimeout(() => {
        if (data.user.role.toLowerCase() === 'admin') {
          window.location.href = '/dashboard';
        } else {
          window.location.href = '/';
        }
      }, 1000);
    },
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginMutation.mutate(loginData);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      avatar: registerData.avatar
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <h2 className="text-2xl font-black uppercase mb-8 border-b-2 border-blue-600 w-max pb-2">Login</h2>
            <form className="space-y-6" onSubmit={handleLoginSubmit}>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-gray-600 tracking-wider">Email address *</label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="border border-gray-200 p-3 text-sm focus:border-blue-600 outline-none transition-all"
                  placeholder="Email address"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-gray-600 tracking-wider">Password *</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="border border-gray-200 p-3 text-sm focus:border-blue-600 outline-none transition-all"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-blue-600 text-white font-black py-4 uppercase text-xs tracking-[0.2em] hover:bg-black transition-all disabled:opacity-50"
              >
                {loginMutation.isPending ? 'Logging in...' : 'Login'}
              </button>
              {successMessage && (
                <p className="text-green-500 text-sm">{successMessage}</p>
              )}
              {loginMutation.isError && (
                <p className="text-red-500 text-sm">
                  {loginMutation.error instanceof Error ? loginMutation.error.message : 'Login failed'}
                </p>
              )}
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase mb-8 border-b-2 border-blue-600 w-max pb-2">Register</h2>
            <form className="space-y-6" onSubmit={handleRegisterSubmit}>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-gray-600 tracking-wider">Name *</label>
                <input
                  type="text"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  className="border border-gray-200 p-3 text-sm focus:border-blue-600 outline-none transition-all"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-gray-600 tracking-wider">Email address *</label>
                <input
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  className="border border-gray-200 p-3 text-sm focus:border-blue-600 outline-none transition-all"
                  placeholder="Email address"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-gray-600 tracking-wider">Password *</label>
                <input
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  className="border border-gray-200 p-3 text-sm focus:border-blue-600 outline-none transition-all"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-gray-600 tracking-wider">Profile Image</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label 
                    htmlFor="avatar-upload" 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors border border-blue-200"
                  >
                    <Upload size={16} />
                    Choose Image
                  </label>
                  {registerData.avatar && (
                    <img 
                      src={registerData.avatar} 
                      alt="Avatar Preview" 
                      className="w-12 h-12 rounded-full object-cover shadow-md" 
                    />
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed italic">
                Your personal data will be used to support your experience throughout this website.
              </p>
              {registerMutation.isError && (
                <p className="text-red-500 text-sm">
                  {registerMutation.error instanceof Error ? registerMutation.error.message : 'Registration failed'}
                </p>
              )}
              {registerMutation.isSuccess && (
                <p className="text-green-500 text-sm">Registration successful! Welcome!</p>
              )}
              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full bg-white border-2 border-blue-600 text-blue-600 font-black py-4 uppercase text-xs tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50"
              >
                {registerMutation.isPending ? 'Registering...' : 'Register'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
