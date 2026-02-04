import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../services/order.service';

interface Order {
  _id: string;
  items: Array<{ name: string; quantity: number }>;
  userId?: string;
  userName?: string;
  total: number;
  createdAt: string;
  status: string;
  shippingAddress?: string;
}

export const RecentOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        // Assuming the API returns an array of orders or an object with an orders array
        const ordersData = Array.isArray(response) ? response : response.orders || [];
        setOrders(ordersData.slice(0, 5)); // Limit to 5 recent orders
      } catch (err) {
        setError('Failed to fetch orders');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-800 text-lg">Recent Orders</h3>
          <Link to="/orders" className="text-indigo-600 text-sm font-semibold hover:underline">See More {'>'}</Link>
        </div>
        <div className="text-center py-8">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-800 text-lg">Recent Orders</h3>
          <Link to="/orders" className="text-indigo-600 text-sm font-semibold hover:underline">See More {'>'}</Link>
        </div>
        <div className="text-center py-8 text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800 text-lg">Recent Orders</h3>
        <Link to="/orders" className="text-indigo-600 text-sm font-semibold hover:underline">See More {'>'}</Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-50 text-gray-400 text-xs uppercase tracking-wider">
              <th className="pb-3 font-medium">Product</th>
              <th className="pb-3 font-medium">Customer</th>
              <th className="pb-3 font-medium">Total</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order, index) => (
              <tr key={order._id || index} className="text-sm text-gray-700">
                <td className="py-4 font-medium">
                  {order.items?.map(item => item.name).join(', ') || 'N/A'}
                </td>
                <td className="py-4 text-gray-500">{order.userName || order.userId || 'Guest'}</td>
                <td className="py-4 font-bold">${order.total?.toFixed(2) || '0.00'}</td>
                <td className="py-4 text-gray-500">
                  {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                </td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                    order.status === 'confirmed' ? 'bg-blue-100 text-blue-600' :
                    order.status === 'not shipped' ? 'bg-amber-100 text-amber-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {order.status || 'Unknown'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
