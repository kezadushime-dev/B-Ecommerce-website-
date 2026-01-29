import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      console.log('Login successful', data);
      setSuccessMessage('Login successful!');
      setTimeout(() => navigate('/profile'), 1000); // Redirect after 1 second
    },
    onError: (error) => {
      console.error('Login error:', error);
    }
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      console.log('Registration successful', data);
      // Handle successful registration
    },
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginMutation.mutate(loginData);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(registerData);
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
                <label className="text-xs font-bold uppercase text-gray-600 tracking-wider">Username *</label>
                <input
                  type="text"
                  value={registerData.username}
                  onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                  className="border border-gray-200 p-3 text-sm focus:border-blue-600 outline-none transition-all"
                  placeholder="Username"
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
                <input
                  type="file"
                  onChange={(e) => setRegisterData({ ...registerData, profileImage: e.target.files?.[0]?.name || '' })}
                  className="border border-gray-200 p-3 text-sm focus:border-blue-600 outline-none transition-all"
                  accept="image/*"
                />
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
