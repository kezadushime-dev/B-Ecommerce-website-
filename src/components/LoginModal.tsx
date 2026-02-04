import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { login, register, getStoredUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', avatar: '' });
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    try {
      await login({ email: loginData.email, password: loginData.password });
      setLoginError('');
      setLoginSuccess('Login successful!');
      setTimeout(() => {
        onClose();
        const user = getStoredUser();
        if (user && user.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      }, 1000);
    } catch (error: any) {
      setLoginError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRegisterError('');
    setRegisterSuccess('');
    try {
      await register(registerData);
      setRegisterSuccess('Registration successful! Check your email for password.');
    } catch (error: any) {
      setRegisterError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          title="Close modal"
        >
          <X size={20} />
        </button>

        {/* Tab Switcher */}
        <div className="flex mb-8 border-b">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider ${
              isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider ${
              !isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'
            }`}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black uppercase mb-2">Login</h2>
              <p className="text-gray-500 text-sm">Get access to your Orders, Wishlist and Recommendations.</p>
            </div>

            <form className="space-y-6" onSubmit={handleLoginSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Username/Email address"
                  name="username"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full border border-gray-200 p-4 text-sm focus:border-blue-600 outline-none transition-all"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full border border-gray-200 p-4 pr-12 text-sm focus:border-blue-600 outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>



              {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="remember" className="accent-blue-600" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-blue-600 hover:underline">Lost your password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-black py-4 uppercase text-sm tracking-wider hover:bg-black transition-all disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'LOG IN'}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black uppercase mb-2">Sign Up</h2>
              <p className="text-gray-500 text-sm">Create your account to get started.</p>
            </div>

            <form className="space-y-6" onSubmit={handleRegisterSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  className="w-full border border-gray-200 p-4 text-sm focus:border-blue-600 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  className="w-full border border-gray-200 p-4 text-sm focus:border-blue-600 outline-none transition-all"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  className="w-full border border-gray-200 p-4 pr-12 text-sm focus:border-blue-600 outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Avatar URL"
                  name="avatar"
                  value={registerData.avatar}
                  onChange={(e) => setRegisterData({ ...registerData, avatar: e.target.value })}
                  className="w-full border border-gray-200 p-4 text-sm focus:border-blue-600 outline-none transition-all"
                />
              </div>

              <p className="text-xs text-gray-400 leading-relaxed italic">
                Your personal data will be used to support your experience throughout this website.
              </p>

              {registerError && <p className="text-red-500 text-sm">{registerError}</p>}
              {registerSuccess && <p className="text-green-500 text-sm">{registerSuccess}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white border-2 border-blue-600 text-blue-600 font-black py-4 uppercase text-sm tracking-wider hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'SIGN UP'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
