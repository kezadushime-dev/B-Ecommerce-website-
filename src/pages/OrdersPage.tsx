import React, { useState } from 'react';
import { DashboardLayout } from './Dashboard';
import { Search, Download, Eye, Trash2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrders, updateOrderStatus, deleteOrder } from '../services/order.service';

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const queryClient = useQueryClient();

  // Fetch orders
  const { data, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  // 🔥 FIX: Support different API response shapes
  const orders = Array.isArray(data) ? data : data?.orders || [];

  // Update order status
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateOrderStatus(id, status as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  // Delete order
  const deleteOrderMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  // 🔥 SAFE FILTER
  const filteredOrders = orders.filter((order: any) => {
    const id = order?._id?.toString()?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      id.includes(search) ||
      order.items?.some((item: any) =>
        item?.name?.toLowerCase()?.includes(search)
      );

    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter;

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
        <div className="flex justify-center items-center h-64 text-slate-500">
          Loading orders...
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64 text-red-500">
          Error loading orders
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
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl">
            <Download size={16} />
            Export
          </button>
        </div>

        {/* Search + Filter */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="not shipped">Not Shipped</option>
            <option value="cancelled">Cancelled</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Products</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Delivery</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-slate-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order: any) => (
                  <tr key={order?._id || Math.random()} className="hover:bg-slate-50">

                    <td className="px-6 py-4 font-medium">
                      {order?.orderNumber || `#${order?._id?.slice(-8) || '—'}`}
                    </td>

                    <td className="px-6 py-4">
                      {order.itemCount ? `${order.itemCount} item${order.itemCount > 1 ? 's' : ''}` : order.items?.map((item: any) => `${item?.productName || item?.name} x${item?.quantity || 1}`).join(', ') || 'No items'}
                    </td>

                    <td className="px-6 py-4">{order.userId || 'Guest'}</td>

                    <td className="px-6 py-4">
                      {order.userName || order.name || 'N/A'}
                    </td>

                    <td className="px-6 py-4">
                      {order.shippingAddress || 'N/A'}
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      ${Number(order.totalAmount || order.total || 0).toFixed(2)}
                    </td>

                    <td className="px-6 py-4">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : '—'}
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        <option value="pending">{order.statusLabel || '⏳ Pending'}</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="not shipped">Not Shipped</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>

                    <td className="px-6 py-4 flex gap-2">
                      <Eye size={16} className="text-indigo-600 cursor-pointer" />
                      <Trash2
                        size={16}
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleDeleteOrder(order._id)}
                      />
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrdersPage;
