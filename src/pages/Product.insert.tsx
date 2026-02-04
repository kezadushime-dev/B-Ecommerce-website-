import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../services/product.service';
import { getCategories } from '../services/category.service';
import { userService } from '../services/userService';
import { ProductFilter } from '../components/productFiltter';
import { DashboardLayout } from '../components/DashboardLayout';
import {
  Plus, X, Edit, Trash2
} from 'lucide-react';

const ProductInsert: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [vendorId, setVendorId] = useState<string>('');
  const [inStock, setInStock] = useState<boolean>(true);
  const [stock, setStock] = useState<number>(0);
  const [images, setImages] = useState<string[]>(['https://mmi-global.com/wp-content/uploads/2020/05/default-product-image.jpg']);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('');

  const queryClient = useQueryClient();

  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

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
    if (price <= 0) {
      alert('Price must be a positive number');
      return;
    }

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
    setCategory(product.category);
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
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
            <p className="text-gray-600">Manage your product inventory</p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <ProductFilter selectedCategory={selectedCategoryFilter} onCategoryChange={setSelectedCategoryFilter} />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">All Products</h3>
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading products...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {productsData?.products && productsData.products.length > 0 ? (
                      productsData.products
                        .filter((product: any) => {
                          if (!selectedCategoryFilter) return true;
                          return product.category?.toLowerCase().trim() === selectedCategoryFilter.toLowerCase().trim();
                        })
                        .map((product: any) => {
                          const imageUrl = product.image || (product.images?.[0]) || 'https://mmi-global.com/wp-content/uploads/2020/05/default-product-image.jpg';
                          return (
                            <div key={product.id} className="bg-gray-50 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                              <img src={imageUrl} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                              <h4 className="text-sm font-semibold">{product.name}</h4>
                              <p className="text-xs text-gray-500">${product.price}</p>
                              <div className="flex gap-2 mt-2">
                                <button
                                  onClick={() => handleEdit(product)}
                                  className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  onClick={() => handleDelete(product.id)}
                                  className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          );
                        })
                    ) : (
                      <div className="col-span-full text-center py-8">
                        <p className="text-gray-500">No products found. Add your first product!</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
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
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none">
                    <option value="">Select a category</option>
                    {categoriesData?.map((cat: any) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
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
                  className="px-6 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                  disabled={createProductMutation.isPending || updateProductMutation.isPending}
                >
                  {(createProductMutation.isPending || updateProductMutation.isPending) ? 'Submitting...' : editingProduct ? 'Update' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProductInsert;
