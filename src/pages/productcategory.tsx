import React, { useState, useEffect } from 'react';
import { getCategories, categoryService } from '../services/category.service';
import type { Category } from '../Types/category';

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
    <div className="flex h-screen">
      {/* Left side: Add new category form */}
      <div className="w-1/2 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Add New Category</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={editingName}
            onChange={(e) => setEditingName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter category name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          {editingImage && (
            <img
              src={URL.createObjectURL(editingImage)}
              alt="Preview"
              className="mt-2 w-20 h-20"
            />
          )}
        </div>
        <button
          onClick={() => {
            setIsAdding(true);
            handleSave();
          }}
          disabled={updating || !editingName.trim()}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
        >
          {updating ? "Adding..." : "Add Category"}
        </button>
      </div>

      {/* Right side: Category list and edit form in two columns */}
      <div className="w-1/2 p-4 flex">
        {/* Left column: Category list */}
        <div className="w-1/2 pr-2">
          <h1 className="text-2xl font-bold mb-4">Categories</h1>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li
                key={cat._id}
                className={`p-2 border rounded cursor-pointer ${
                  selectedCategory?._id === cat._id ? "bg-blue-100" : ""
                }`}
                onClick={() => handleSelectCategory(cat)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {cat.images && cat.images[0] && <img src={cat.images[0]} alt={cat.name} className="w-10 h-10 mr-2" />}
                    <span>{cat.name}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCategory(cat);
                    }}
                    className="px-2 py-1 bg-blue-500 text-white text-sm rounded"
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column: Edit form */}
        <div className="w-1/2 pl-2">
          {selectedCategory ? (
            <div className="p-4 border rounded">
              <h3 className="text-lg font-bold mb-2">Edit {selectedCategory.name}</h3>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded"
                />
                {editingImage && (
                  <img
                    src={URL.createObjectURL(editingImage)}
                    alt="Preview"
                    className="mt-2 w-20 h-20"
                  />
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsAdding(false);
                    handleSave();
                  }}
                  disabled={updating || !editingName.trim()}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  {updating ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setEditingName("");
                    setEditingImage(null);
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 border rounded text-center text-gray-500">
              Select a category to edit
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
