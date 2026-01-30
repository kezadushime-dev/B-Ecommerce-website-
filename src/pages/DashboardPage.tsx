import React from 'react';
import { DashboardLayout } from './Dashboard';
import { TargetCard } from '../components/TargetCard';
import { RevenueCard } from '../components/RevenueCard';
import { StatCard } from '../components/StatCard';
import { RecentOrders } from '../components/RecentOrders';

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TargetCard />
        <RevenueCard/>
        <StatCard/>
        <RevenueCard/>
        <RecentOrders/>
        {/* Add more dashboard components here as needed */}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
