import React from 'react';
import { DashboardLayout } from './Dashboard';
import { Search, Filter, Download } from 'lucide-react';

const orders = [
  { id: '#ORD-001', product: 'Earphone G1', customer: 'John Doe', total: '$17,678', date: '12 May 2025', status: 'Completed' },
  { id: '#ORD-002', product: 'Ipol Pro S6', customer: 'Jane Smith', total: '$12,400', date: '13 May 2025', status: 'Pending' },
  { id: '#ORD-003', product: 'Smartwatch', customer: 'Mike Ross', total: '$8,200', date: '14 May 2025', status: 'Canceled' },
  { id: '#ORD-004', product: 'Wireless Mouse', customer: 'Sarah Johnson', total: '$5,500', date: '15 May 2025', status: 'Completed' },
  { id: '#ORD-005', product: 'Bluetooth Speaker', customer: 'David Lee', total: '$9,800', date: '16 May 2025', status: 'Pending' },
  { id: '#ORD-006', product: 'Gaming Keyboard', customer: 'Emily Chen', total: '$15,200', date: '17 May 2025', status: 'Completed' },
  { id: '#ORD-007', product: 'USB-C Hub', customer: 'Alex Rodriguez', total: '$7,300', date: '18 May 2025', status: 'Canceled' },
  { id: '#ORD-008', product: 'Monitor Stand', customer: 'Lisa Wang', total: '$4,100', date: '19 May 2025', status: 'Completed' },
];

const OrdersPage = () => {
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
              className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{order.product}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{order.customer}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">{order.total}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{order.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        View Details
                      </button>
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
            Showing 1 to {orders.length} of {orders.length} orders
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
