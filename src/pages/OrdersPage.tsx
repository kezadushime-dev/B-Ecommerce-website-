import React, { useState } from 'react';
import { DashboardLayout } from './Dashboard';
import { Search, Filter, Download, Eye, Edit, Trash2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrders, updateOrderStatus, deleteOrder } from '../services/order.service';
import { getCurrentUser } from '../services/auth';

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const queryClient = useQueryClient();

  // Fetch orders
  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  // Update order status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateOrderStatus(id, status as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  // Delete order mutation
  const deleteOrderMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  // Filter orders based on search and status
  const filteredOrders = (Array.isArray(orders) ? orders : []).filter((order: any) => {
    const matchesSearch = order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items?.some((item: any) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateStatusMutation.mutate({ id: orderId, status: newStatus });
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      deleteOrderMutation.mutate(orderId);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-slate-500">Loading orders...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">Error loading orders</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Orders</h1>
            <p className="text-slate-500 text-sm">Manage and track all your orders</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Products</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order: any) => (
                  <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">#{order._id.slice(-8)}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {order.items.map((item: any) => item.name).join(', ')}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{order.userId || 'Guest'}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">${order.total?.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border-0 ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order._id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-slate-600">
            Showing 1 to {filteredOrders.length} of {filteredOrders.length} orders
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              1
            </button>
            <button className="px-3 py-1 text-sm bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
              2
            </button>
            <button className="px-3 py-1 text-sm bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrdersPage;
