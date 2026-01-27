import React from 'react';
import { Link } from 'react-router-dom';

export const AuthPage: React.FC = () => {
  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <div className="relative h-[200px] flex items-center justify-center bg-[#222] mb-16">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">My Account</h1>
      </div>

      <div className="container mx-auto px-4 max-w-5xl mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          <div>
            <h2 className="text-2xl font-black uppercase mb-8 border-b-2 border-blue-600 w-max pb-2">Login</h2>
            <form className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-gray-600 tracking-wider">Username or email address *</label>
                <input type="text" className="border border-gray-200 p-3 text-sm focus:border-blue-600 outline-none transition-all" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-gray-600 tracking-wider">Password *</label>
                <input type="password" className="border border-gray-200 p-3 text-sm focus:border-blue-600 outline-none transition-all" />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                  <input type="checkbox" className="accent-blue-600" /> Remember me
                </label>
                <a href="#" className="text-xs text-blue-600 hover:underline">Lost password?</a>
              </div>
              <button className="w-full bg-blue-600 text-white font-black py-4 uppercase text-xs tracking-[0.2em] hover:bg-black transition-all">
                Login
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase mb-8 border-b-2 border-blue-600 w-max pb-2">Register</h2>
            <form className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-gray-600 tracking-wider">Email address *</label>
                <input type="email" className="border border-gray-200 p-3 text-sm focus:border-blue-600 outline-none transition-all" />
              </div>
              <p className="text-xs text-gray-400 leading-relaxed italic">
                A password will be sent to your email address. Your personal data will be used to support your experience throughout this website.
              </p>
              <button className="w-full bg-white border-2 border-blue-600 text-blue-600 font-black py-4 uppercase text-xs tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all">
                Register
              </button>
            </form>
          </div>

        </div>
        
        <div className="text-center mt-12">
          <Link to="/contact" className="text-blue-600 hover:underline text-sm font-bold">
            Need help? Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};