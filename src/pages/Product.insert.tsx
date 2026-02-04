import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../services/product.service';
import { getCategories } from '../services/category.service';
import { userService } from '../services/userService';
import { ProductFilter } from '../components/productFiltter';
import {
  LayoutDashboard, ShoppingBag, Users, BarChart3,
  Settings, HelpCircle, Search, Bell, Globe,
  Plus, X, Upload, Edit, Trash2
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

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Filter state
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('');

  const queryClient = useQueryClient();

  // Fetch products
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  // Fetch users (vendors)
  const { data: usersData } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getUsers(),
  });

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      alert('Product created successfully!');
      setIsModalOpen(false);
      resetForm();
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      alert('Product updated successfully!');
      setIsModalOpen(false);
      setEditingProduct(null);
      resetForm();
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      alert('Product deleted successfully!');
    },
  });

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice(0);
    setCategory('');
    setVendorId('');
    setInStock(true);
    setStock(0);
    setImages(['https://mmi-global.com/wp-content/uploads/2020/05/default-product-image.jpg']);
  };

  const handleSubmit = () => {
    const productData = {
      name,
      description,
      price: price.toString(),
      category,
      vendorId,
      inStock,
      stock,
      images
    };

    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, data: productData });
    } else {
      createProductMutation.mutate(productData);
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);

    // Set category name for display
    const categoryObj = categoriesData?.find((cat: any) => cat._id === product.category);
    setCategory(categoryObj ? categoryObj.name : product.category);

    // Set vendor name for display
    const vendorObj = usersData?.users?.find((user: any) => user.id === product.vendorId || user._id === product.vendorId);
    setVendorId(vendorObj ? vendorObj.name : product.vendorId || '');

    setInStock(product.inStock);
    setStock(product.stock);
    setImages(product.images);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProductMutation.mutate(id);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
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

        <div className="p-8 flex gap-8">
          {/* Left: Filter Sidebar */}
          <div className="w-1/4">
            <ProductFilter selectedCategory={selectedCategoryFilter} onCategoryChange={setSelectedCategoryFilter} />
          </div>

          {/* Middle: Add Product Button and Product List */}
          <div className="w-3/4">
            <button
              onClick={openAddModal}
              className="w-full px-6 py-4 bg-[#6366F1] text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center justify-center gap-2 mb-6"
            >
              <Plus size={20} />
              Add Product
            </button>

            <Card title="All Products">
              {isLoading ? (
                <p>Loading products...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {productsData?.products
                    ?.filter((product: any) => {
                      if (!selectedCategoryFilter) return true;
                      return product.category?.toLowerCase().trim() === selectedCategoryFilter.toLowerCase().trim();
                    })
                    .map((product: any) => (
                      <div key={product.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                        <img src={product.images[0] || 'https://mmi-global.com/wp-content/uploads/2020/05/default-product-image.jpg'} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                        <h4 className="text-sm font-semibold">{product.name}</h4>
                        <p className="text-xs text-gray-500">${product.price}</p>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                            aria-label="Edit product"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                            aria-label="Delete product"
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
        </div>

        {/* Modal for Add/Edit Product */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700" aria-label="Close modal">
                  <X size={20} />
                </button>
              </div>
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
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none" aria-label="Select category" title="Select a category">
                    <option value="">Select a category</option>
                    {categoriesData?.map((cat: any) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Vendor</label>
                  <select value={vendorId} onChange={(e) => setVendorId(e.target.value)} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none" aria-label="Select vendor" title="Select a vendor">
                    <option value="">Select a vendor</option>
                    {usersData?.users?.map((user: any) => (
                      <option key={user.id || user._id} value={user.name}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-4">
                  <div>
                    <label htmlFor="inStock" className="block text-xs font-semibold text-gray-500 uppercase mb-1">In Stock</label>
                    <input id="inStock" type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500" title="In Stock" />
                  </div>
                  <div>8
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Stock Quantity</label>
                    <input type="number" value={stock} onChange={(e) => setStock(parseInt(e.target.value) || 0)} placeholder="Enter stock quantity" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none" />
                  </div>
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
                  disabled={createProductMutation.isPending || updateProductMutation.isPending}
                >
                  {(createProductMutation.isPending || updateProductMutation.isPending) ? 'Submitting...' : editingProduct ? 'Update' : 'Submit'}
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



export default ProductInsert;
