import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const forgotPasswordMutation = useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: () => {
      setSuccessMessage('Password reset email sent! Check your inbox.');
      setTimeout(() => navigate('/auth'), 3000);
    },
    onError: (error) => {
      console.error('Forgot password error:', error);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await forgotPasswordMutation.mutate({ email });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Your Password?</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={forgotPasswordMutation.isPending}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {forgotPasswordMutation.isPending ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>

          {forgotPasswordMutation.isSuccess && (
            <p className="text-green-500 text-sm text-center">{successMessage}</p>
          )}
          {forgotPasswordMutation.isError && (
            <p className="text-red-500 text-sm text-center">
              {forgotPasswordMutation.error instanceof Error ? forgotPasswordMutation.error.message : 'Failed to send reset email'}
            </p>
          )}

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/auth')}
              className="text-indigo-600 hover:text-indigo-500 text-sm"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
