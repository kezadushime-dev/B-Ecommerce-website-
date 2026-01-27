import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
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

            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Username/Email address"
                  name="username"
                  className="w-full border border-gray-200 p-4 text-sm focus:border-blue-600 outline-none transition-all"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  className="w-full border border-gray-200 p-4 pr-12 text-sm focus:border-blue-600 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="remember" className="accent-blue-600" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-blue-600 hover:underline">Lost your password?</a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-black py-4 uppercase text-sm tracking-wider hover:bg-black transition-all"
              >
                LOG IN
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black uppercase mb-2">Sign Up</h2>
              <p className="text-gray-500 text-sm">Create your account to get started.</p>
            </div>

            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="fullname"
                  className="w-full border border-gray-200 p-4 text-sm focus:border-blue-600 outline-none transition-all"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  className="w-full border border-gray-200 p-4 text-sm focus:border-blue-600 outline-none transition-all"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  className="w-full border border-gray-200 p-4 pr-12 text-sm focus:border-blue-600 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirm_password"
                  className="w-full border border-gray-200 p-4 text-sm focus:border-blue-600 outline-none transition-all"
                />
              </div>

              <div className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="terms" className="accent-blue-600" />
                <span className="text-gray-600">I agree to the Terms & Conditions</span>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-black py-4 uppercase text-sm tracking-wider hover:bg-black transition-all"
              >
                SIGN UP
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
