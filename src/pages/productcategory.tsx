import React, { useState, useEffect } from 'react';
import { getCategories, categoryService } from '../services/category.service';
import type { Category } from '../Types/category';
import { DashboardLayout } from '../components/DashboardLayout';

const ProductCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingImage, setEditingImage] = useState<File | null>(null);
  const [updating, setUpdating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setEditingName(category.name);
    setEditingImage(null);
    setIsAdding(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditingImage(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!editingName.trim()) return;
    setUpdating(true);
    try {
      const categoryData: Omit<Category, '_id'> = { name: editingName };
      if (editingImage) {
        // Convert image to base64
        const base64 = await toBase64(editingImage);
        categoryData.images = [base64 as string];
      }

      if (isAdding) {
        await categoryService.createCategory(categoryData);
      } else if (selectedCategory) {
        await categoryService.updateCategory(selectedCategory._id, categoryData);
      }

      await fetchCategories(); // Refresh list
      setSelectedCategory(null);
      setEditingName("");
      setEditingImage(null);
      setIsAdding(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const toBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <DashboardLayout>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">Product Categories</h1>
          <p className="text-gray-600">Manage your product categories with ease</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add New Category Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">+</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Add New Category</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category Name</label>
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="w-full p-3 border-2 border-blue-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter category name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category Image</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full p-3 border-2 border-blue-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                    {editingImage && (
                      <div className="mt-3 flex justify-center">
                        <img
                          src={URL.createObjectURL(editingImage)}
                          alt="Preview"
                          className="w-20 h-20 object-cover rounded-lg shadow-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setIsAdding(true);
                    handleSave();
                  }}
                  disabled={updating || !editingName.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                  {updating ? "Adding..." : "Add Category"}
                </button>
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">All Categories</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <div
                    key={cat._id}
                    className={`group relative bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer ${
                      selectedCategory?._id === cat._id ? "ring-2 ring-blue-500 shadow-lg" : ""
                    }`}
                    onClick={() => handleSelectCategory(cat)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {cat.images && cat.images[0] ? (
                          <img 
                            src={cat.images[0]} 
                            alt={cat.name} 
                            className="w-16 h-16 object-cover rounded-lg shadow-md" 
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center shadow-md">
                            <span className="text-blue-600 font-bold text-xl">{cat.name.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg">{cat.name}</h3>
                        <p className="text-sm text-gray-500">Category</p>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectCategory(cat);
                        }}
                        className="opacity-0 group-hover:opacity-100 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {selectedCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✏️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Edit {selectedCategory.name}</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category Name</label>
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="w-full p-3 border-2 border-blue-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-3 border-2 border-blue-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  {editingImage && (
                    <div className="mt-3 flex justify-center">
                      <img
                        src={URL.createObjectURL(editingImage)}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-lg shadow-md"
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setIsAdding(false);
                      handleSave();
                    }}
                    disabled={updating || !editingName.trim()}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {updating ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setEditingName("");
                      setEditingImage(null);
                    }}
                    className="flex-1 bg-gray-500 text-white font-bold py-3 rounded-lg hover:bg-gray-600 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProductCategory;
