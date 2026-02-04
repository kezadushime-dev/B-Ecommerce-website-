import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { getCategories, categoryService } from '../services/category.service';
import type { Category } from '../Types/category';
import {
  LayoutDashboard, ShoppingBag, Users, BarChart3,
  Settings, HelpCircle, Search, Bell, Globe,
  Plus, X, Edit, Trash2
} from 'lucide-react';

const CategoryPage: React.FC = () => {
  // Form states
  const [name, setName] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const queryClient = useQueryClient();

  // Fetch categories
  const { data: categoriesData, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const createCategoryMutation = useMutation({
    mutationFn: categoryService.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      alert('Category created successfully!');
      setIsModalOpen(false);
      resetForm();
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => categoryService.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      alert('Category updated successfully!');
      setIsModalOpen(false);
      setEditingCategory(null);
      resetForm();
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: categoryService.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      alert('Category deleted successfully!');
    },
  });

  const resetForm = () => {
    setName('');
    setImages([]);
  };

  const handleSubmit = () => {
    const categoryData = {
      name,
      images
    };

    if (editingCategory) {
      updateCategoryMutation.mutate({ id: editingCategory._id, data: categoryData });
    } else {
      createCategoryMutation.mutate(categoryData);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    setImages(category.images || []);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategoryMutation.mutate(id);
    }
  };

  const openAddModal = () => {
    setEditingCategory(null);
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] font-sans text-[#1F2937]">

      {/* 1. SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col">
        <div className="p-6 text-2xl font-bold text-[#6366F1] flex items-center gap-2">
          <div className="w-8 h-8 bg-[#6366F1] rounded-lg"></div>
          Nova
        </div>

        <div className="px-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none focus:ring-1 focus:ring-indigo-500" />
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={18}/>} label="Dashboard" />
          <NavItem icon={<ShoppingBag size={18}/>} label="Orders" />
          <NavItem icon={<ShoppingBag size={18}/>} label="Product List" path="/product-list" />
          <NavItem icon={<ShoppingBag size={18}/>} label="Product Category" active />
          <NavItem icon={<Users size={18}/>} label="Customers" />
          <NavItem icon={<Users size={18}/>} label="User Management" path="/user-management" />
          <NavItem icon={<BarChart3 size={18}/>} label="Campaign" />
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-1">
          <NavItem icon={<HelpCircle size={18}/>} label="Help Center" />
          <NavItem icon={<Settings size={18}/>} label="Settings" />
          <div className="mt-4 p-2 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-full overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="User" />
            </div>
            <div>
              <p className="text-sm font-semibold">John Doe</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT */}
      <main className="flex-1">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Dashboard</span> <span className="text-gray-300">/</span>
            <span>Product Category</span> <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Add Category</span>
          </div>
          <div className="flex items-center gap-4">
            <Bell size={20} className="text-gray-400 cursor-pointer" />
            <Globe size={20} className="text-gray-400 cursor-pointer" />
            <button className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 text-sm bg-[#6366F1] text-white rounded-lg hover:bg-indigo-700 font-medium"
              disabled={createCategoryMutation.isPending}
            >
              {createCategoryMutation.isPending ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </header>

        <div className="p-8">
          <button
            onClick={openAddModal}
            className="w-full px-6 py-4 bg-[#6366F1] text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center justify-center gap-2 mb-6"
          >
            <Plus size={20} />
            Add Category
          </button>

          <Card title="All Categories">
            {isLoading ? (
              <p>Loading categories...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoriesData?.map((category: Category) => (
                  <div key={category._id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                    {category.images && category.images[0] && (
                      <img src={category.images[0]} alt={category.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                    )}
                    <h4 className="text-sm font-semibold">{category.name}</h4>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                        aria-label="Edit category"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                        aria-label="Delete category"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Modal for Add/Edit Category */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{editingCategory ? 'Edit Category' : 'Add Category'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700" aria-label="Close modal">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Category Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter category name" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Images (comma-separated URLs)</label>
                  <input type="text" value={images.join(', ')} onChange={(e) => setImages(e.target.value.split(',').map(url => url.trim()))} placeholder="Enter image URLs separated by commas" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none" />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 text-sm bg-[#6366F1] text-white rounded-lg hover:bg-indigo-700 font-medium"
                  disabled={createCategoryMutation.isPending || updateCategoryMutation.isPending}
                >
                  {(createCategoryMutation.isPending || updateCategoryMutation.isPending) ? 'Submitting...' : editingCategory ? 'Update' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// --- Sub-Components for Cleanliness ---

const NavItem = ({ icon, label, active = false, path }: { icon: React.ReactNode, label: string, active?: boolean, path?: string }) => {
  const content = (
    <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${active ? 'bg-[#6366F1] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );

  return path ? <Link to={path}>{content}</Link> : content;
};

const Card = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 className="text-sm font-bold text-gray-900 mb-4">{title}</h3>
    {children}
  </div>
);

export default CategoryPage;
