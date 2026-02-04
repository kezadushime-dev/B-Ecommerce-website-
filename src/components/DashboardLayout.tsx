import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getStoredUser } from '../services/auth';
import {
  LayoutDashboard, ShoppingCart, Box, Users, Megaphone,
  Bell, Settings, User, LogOut, ChevronDown, Menu, X
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active = false, hasChild = false, to }: any) => {
  const content = (
    <div className={`flex items-center justify-between px-4 py-3 cursor-pointer rounded-lg transition-all ${
      active ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200' : 'text-slate-500 hover:bg-blue-50 hover:text-blue-600'
    }`}>
      <div className="flex items-center gap-3">
        <Icon size={18} />
        <span className="font-medium text-sm">{label}</span>
      </div>
      {hasChild && <ChevronDown size={16} />}
    </div>
  );
  
  return to ? <Link to={to}>{content}</Link> : content;
};

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const user = getStoredUser();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'ml-1/4 w-3/4' : 'w-full'
      }`}>
        {/* Header */}
        <header className="bg-white shadow-lg px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Welcome Back {user?.name || user?.username}</h1>
                <p className="text-slate-500 text-sm">Here is a summary of your store</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
                <Bell size={20} />
              </button>
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <div className="p-4 lg:p-8 overflow-y-auto flex-1">
          {children}
        </div>
      </main>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-1/4 bg-white shadow-xl flex flex-col p-4 gap-2 transform transition-transform duration-300 ease-in-out z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between px-2 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold italic shadow-lg">I</div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Isoko Hub</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={pathname === '/dashboard'} to="/dashboard" />
          <SidebarItem icon={Box} label="Product" hasChild />
          <div className="pl-10 flex flex-col gap-2 mt-2 mb-4">
             <Link to="/add-product">
               <span className={`text-sm font-medium cursor-pointer transition-all ${
                 pathname === '/add-product' ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-blue-600'
               }`}>Product List</span>
             </Link>
             <Link to="/product-category">
               <span className={`text-sm font-medium cursor-pointer transition-all ${
                 pathname === '/product-category' ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-blue-600'
               }`}>Product Categories</span>
             </Link>
          </div>
          <SidebarItem icon={Users} label="User Management" active={pathname === '/user-management'} to="/user-management" />
          <SidebarItem icon={ShoppingCart} label="Orders" active={pathname === '/orders'} to="/orders" />
          <SidebarItem icon={Megaphone} label="Campaign" />
        </nav>
        
        {/* User Info at Bottom */}
        <div className="mt-auto pt-4 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-inner">
          <div className="flex items-center gap-3 px-4 py-3">
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover shadow-md" />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-md">
                <User size={16} className="text-blue-600" />
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-800">{user?.name || user?.username}</p>
              <p className="text-xs text-blue-600">{user?.role}</p>
            </div>
            <Link to="/" className="p-1 text-slate-400 hover:text-blue-600 transition-colors" title="Go to Homepage">
              <LogOut size={16} />
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
};