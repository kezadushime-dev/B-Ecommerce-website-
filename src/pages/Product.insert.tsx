import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createProduct } from '../services/product.service';
import {
  LayoutDashboard, ShoppingBag, Users, BarChart3,
  Settings, HelpCircle, Search, Bell, Globe,
  Plus, X, Upload
} from 'lucide-react';

const ProductInsert: React.FC = () => {
  // Form states matching the Mongoose schema
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [vendorId, setVendorId] = useState<string>('');
  const [inStock, setInStock] = useState<boolean>(true);
  const [stock, setStock] = useState<number>(0);
  const [images, setImages] = useState<string[]>(['https://mmi-global.com/wp-content/uploads/2020/05/default-product-image.jpg']);

  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      alert('Product created successfully!');
      // Reset form or redirect
    },
  });

  const handleSubmit = () => {
    const productData = {
      name,
      description,
      price,
      category,
      vendorId,
      inStock,
      stock,
      images
    };

    createProductMutation.mutate(productData);
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
          <NavItem icon={<ShoppingBag size={18}/>} label="Product List" active />
          <NavItem icon={<ShoppingBag size={18}/>} label="Product Category" path="/product-category" />
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
            <span>Product List</span> <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Add Product</span>
          </div>
          <div className="flex items-center gap-4">
            <Bell size={20} className="text-gray-400 cursor-pointer" />
            <Globe size={20} className="text-gray-400 cursor-pointer" />
            <button className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 text-sm bg-[#6366F1] text-white rounded-lg hover:bg-indigo-700 font-medium"
              disabled={createProductMutation.isPending}
            >
              {createProductMutation.isPending ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </header>

        <div className="p-8 max-w-4xl mx-auto">
          <Card title="Product Information">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Product Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter product name" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter product description" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg h-32 outline-none focus:ring-1 focus:ring-indigo-500 text-sm leading-relaxed"></textarea>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Price</label>
                <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value) || 0)} placeholder="Enter price" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Category ID</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter category ObjectId" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Vendor ID</label>
                <input type="text" value={vendorId} onChange={(e) => setVendorId(e.target.value)} placeholder="Enter vendor ObjectId" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">In Stock</label>
                  <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Stock Quantity</label>
                  <input type="number" value={stock} onChange={(e) => setStock(parseInt(e.target.value) || 0)} placeholder="Enter stock quantity" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Images (comma-separated URLs)</label>
                <input type="text" value={images.join(', ')} onChange={(e) => setImages(e.target.value.split(',').map(url => url.trim()))} placeholder="Enter image URLs separated by commas" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none" />
              </div>
            </div>
          </Card>
        </div>
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



export default ProductInsert;
