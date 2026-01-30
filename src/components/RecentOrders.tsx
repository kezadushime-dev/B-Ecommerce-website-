import React from 'react';
import { Link } from 'react-router-dom';

const orders = [
  { id: '#ORD-001', product: 'Earphone G1', customer: 'John Doe', total: '$17,678', date: '12 May 2025', status: 'Completed' },
  { id: '#ORD-002', product: 'Ipol Pro S6', customer: 'Jane Smith', total: '$12,400', date: '13 May 2025', status: 'Pending' },
  { id: '#ORD-003', product: 'Smartwatch', customer: 'Mike Ross', total: '$8,200', date: '14 May 2025', status: 'Canceled' },
];

export const RecentOrders = () => {
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
              <tr key={index} className="text-sm text-gray-700">
                <td className="py-4 font-medium">{order.product}</td>
                <td className="py-4 text-gray-500">{order.customer}</td>
                <td className="py-4 font-bold">{order.total}</td>
                <td className="py-4 text-gray-500">{order.date}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                    order.status === 'Pending' ? 'bg-amber-100 text-amber-600' : 
                    'bg-red-100 text-red-600'
                  }`}>
                    {order.status}
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