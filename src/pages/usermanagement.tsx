import React, { useState, useEffect } from 'react';
import { Mail, MoreHorizontal, UserPlus } from 'lucide-react';
import { DashboardLayout } from './Dashboard';
import { userService } from '../services/userService';
import type { User } from '../Types/user';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddUser, setShowAddUser] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<{ username: string; email: string; role: string }>({ username: '', email: '', role: 'User' });

  const handleAddUser = async () => {
    try {
      await userService.createUser(newUser);
      setNewUser({ username: '', email: '', role: 'User' });
      setShowAddUser(false);
      // Refetch users
      const fetchedUsers = await userService.getUsers();
      const usersArray = Array.isArray(fetchedUsers) ? fetchedUsers : fetchedUsers.users || fetchedUsers.data || [];
      setUsers(usersArray);
    } catch (err) {
      setError('Failed to add user');
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.getUsers();
        console.log('Fetched users:', fetchedUsers);
        const usersArray = Array.isArray(fetchedUsers) ? fetchedUsers : fetchedUsers.users || fetchedUsers.data || [];
        console.log('Users array:', usersArray);
        setUsers(usersArray);
      } catch (err) {
        setError('Failed to fetch users');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
            <p className="text-slate-500 text-sm">Manage and view all users</p>
          </div>
          <button onClick={() => setShowAddUser(true)} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors">
            <UserPlus size={16} />
            Add User
          </button>
        </div>

        {/* Loading and Error States */}
        {loading && <p className="text-center text-slate-500">Loading users...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Users Table */}
        {!loading && !error && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr className="text-left">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img src={user.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} alt={user.username} className="w-10 h-10 rounded-full bg-slate-100" />
                        <div>
                          <p className="font-semibold text-sm text-slate-900">{user.username}</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1"><Mail size={12} /> {user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">{user.role}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
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
        )}

        {/* Pagination */}
        {!loading && !error && users.length > 0 && (
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-600">
              Showing 1 to {users.length} of {users.length} users
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
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserList;
