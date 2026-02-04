import React, { useState, useEffect } from 'react';
import { Mail, MoreHorizontal, UserPlus, Upload } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { userService } from '../services/userService';
import type { User } from '../Types/user';
import { Modal } from '../modal/modal';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddUser, setShowAddUser] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<{ name: string; email: string; role: string; profileImage?: string }>({ name: '', email: '', role: 'User' });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        setNewUser({ ...newUser, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddUser = async () => {
    try {
      await userService.createUser(newUser);
      setNewUser({ name: '', email: '', role: 'User' });
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
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-50">
                  <tr className="text-left">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img 
                          src={user.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
                          alt={user.username} 
                          className="w-10 h-10 rounded-full bg-slate-100 shadow-md object-cover" 
                        />
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
                        <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium" onClick={() => alert(`Details for ${user.username}: Email: ${user.email}, Role: ${user.role}`)}>
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

        {/* Add User Modal */}
        <Modal isOpen={showAddUser} onClose={() => setShowAddUser(false)}>
          <div className="p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Add New User</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Profile Image</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="profile-image"
                  />
                  <label 
                    htmlFor="profile-image" 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors"
                  >
                    <Upload size={16} />
                    Choose Image
                  </label>
                  {newUser.profileImage && (
                    <img 
                      src={newUser.profileImage} 
                      alt="Preview" 
                      className="w-12 h-12 rounded-full object-cover shadow-md" 
                    />
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  placeholder="Enter user name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Select user role"
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default UserList;
