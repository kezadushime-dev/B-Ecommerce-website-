import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TargetCard } from '../components/TargetCard';
import { RevenueCard } from '../components/RevenueCard';

import {
  LayoutDashboard, ShoppingCart, Box, Users,
  Megaphone, Search, Bell, Calendar, Plus, ChevronDown
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active = false, hasChild = false }: any) => (
  <div className={`flex items-center justify-between px-4 py-3 cursor-pointer rounded-lg transition-all ${
    active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'
  }`}>
    <div className="flex items-center gap-3">
      <Icon size={20} />
      <span className="font-medium text-sm">{label}</span>
    </div>
    {hasChild && <ChevronDown size={16} />}
  </div>
);

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col p-4 gap-2">
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold italic">N</div>
          <span className="text-xl font-bold text-slate-800">Isoko Hub</span>
        </div>

        <nav className="flex flex-col gap-1">
          <Link to="/dashboard">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={pathname === '/dashboard'} />
          </Link>
          <SidebarItem icon={Box} label="Product" hasChild />
          <div className="pl-12 flex flex-col gap-2 mt-2 mb-4">
             <Link to="/add-product">
               <span className="text-sm text-indigo-600 font-medium cursor-pointer">Product List</span>
             </Link>
             <span className="text-sm text-slate-400 cursor-pointer">Product Categories</span>
          </div>
          <Link to="/user-management">
            <SidebarItem icon={Users} label="User Management" active={pathname === '/user-management'} />
          </Link>
          <SidebarItem icon={Megaphone} label="Campaign" />
          <Link to="/orders">
            <SidebarItem icon={ShoppingCart} label="Orders" active={pathname === '/orders'} />
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Dashboard Content */}
        <div className="p-8 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Welcome Back Kevin</h1>
            <p className="text-slate-500 text-sm">Here is a summary of your store</p>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

// App.tsx or Dashboard.tsx

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-6">
        {/* Left Section: Target & Revenue */}
        <div className="col-span-8 flex flex-col gap-6">
          <div className="flex gap-6">
             <TargetCard />
             <div className="flex-1 space-y-6">
                {/* We can add the small Revenue/Orders line charts here later */}
                <div className="h-32 bg-indigo-600 rounded-3xl p-6 text-white">Quick Stats...</div>
             </div>
          </div>
          <RevenueCard />
        </div>

        {/* Right Section: Top Products (We'll do this next) */}
        <div className="col-span-4">
           {/* Product list goes here */}
        </div>
      </div>
    </DashboardLayout>
  );
};
