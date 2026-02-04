import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStoredUser } from '../services/auth';
import { getProducts } from '../services/product.service';
import { getOrders } from '../services/order.service';
import { userService } from '../services/userService';
import {
  Users, ShoppingBag, TrendingUp, DollarSign,
  Package, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';

const DashboardPage = () => {
  const user = getStoredUser();
  
  // Fetch data
  const { data: productsData } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
  
  const { data: ordersData } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });
  
  const { data: usersData } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getUsers(),
  });

  // Calculate stats
  const totalProducts = productsData?.products?.length || 0;
  const totalOrders = Array.isArray(ordersData) ? ordersData.length : ordersData?.orders?.length || 0;
  const totalUsers = usersData?.users?.length || 0;
  const totalRevenue = Array.isArray(ordersData) 
    ? ordersData.reduce((sum, order) => sum + (order.total || 0), 0)
    : ordersData?.orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0;

  // Recent orders (last 5)
  const recentOrders = Array.isArray(ordersData) 
    ? ordersData.slice(-5).reverse()
    : ordersData?.orders?.slice(-5).reverse() || [];

  // Order status distribution
  const orderStats = Array.isArray(ordersData) 
    ? ordersData.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {})
    : ordersData?.orders?.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {}) || {};

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
                <p className="text-sm text-green-600 mt-1">+12% from last month</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-full shadow-md">
                <DollarSign className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
                <p className="text-sm text-blue-600 mt-1">+8% from last month</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full shadow-md">
                <ShoppingBag className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
                <p className="text-sm text-blue-600 mt-1">+5% from last month</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full shadow-md">
                <Package className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
                <p className="text-sm text-blue-600 mt-1">+15% from last month</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full shadow-md">
                <Users className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Status Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status Distribution</h3>
            <div className="space-y-4">
              {Object.entries(orderStats).map(([status, count]) => {
                const percentage = totalOrders > 0 ? (count / totalOrders) * 100 : 0;
                const colors = {
                  pending: 'bg-yellow-500',
                  confirmed: 'bg-blue-500',
                  delivered: 'bg-green-500',
                  cancelled: 'bg-red-500',
                  'not shipped': 'bg-orange-500'
                };
                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${colors[status] || 'bg-gray-500'}`}></div>
                      <span className="text-sm font-medium capitalize">{status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${colors[status] || 'bg-gray-500'}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Revenue Trend */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
            <div className="flex items-center justify-center h-48 text-gray-500">
              <div className="text-center">
                <TrendingUp size={48} className="mx-auto mb-2 text-green-500" />
                <p>Revenue trending upward</p>
                <p className="text-2xl font-bold text-green-600 mt-2">+23.5%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              <Link to="/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Order ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Total</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={order._id || index} className="hover:bg-blue-50 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium">#{order._id?.slice(-8) || `ORD-${index}`}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">${order.total?.toFixed(2) || '0.00'}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/add-product" className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all shadow-sm">
                <Package className="text-blue-600" size={20} />
                <span className="font-medium text-blue-900">Add Product</span>
              </Link>
              <Link to="/orders" className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all shadow-sm">
                <ShoppingBag className="text-blue-600" size={20} />
                <span className="font-medium text-blue-900">View Orders</span>
              </Link>
              <Link to="/user-management" className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all shadow-sm">
                <Users className="text-blue-600" size={20} />
                <span className="font-medium text-blue-900">Manage Users</span>
              </Link>
              <Link to="/product-category" className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all shadow-sm">
                <Star className="text-blue-600" size={20} />
                <span className="font-medium text-blue-900">Categories</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
