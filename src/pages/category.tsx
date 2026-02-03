import { useEffect, useState } from "react";
import { getCategories, categoryService } from "../services/category.service";
import type { Category } from "../Types/category";

const CategoryPage = () => {
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

  const handleAddNew = () => {
    setSelectedCategory(null);
    setEditingName("");
    setEditingImage(null);
    setIsAdding(true);
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

      {/* Right side: Edit panel */}
      <div className="w-1/2 p-4">
        {(selectedCategory || isAdding) ? (
          <div>
            <h2 className="text-xl font-bold mb-4">{isAdding ? "Add New Category" : "Edit Category"}</h2>
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
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={updating || !editingName.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                {updating ? "Saving..." : isAdding ? "Add Category" : "Save Changes"}
              </button>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setEditingName("");
                  setEditingImage(null);
                  setIsAdding(false);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p>Select a category to edit or click "Add New Category"</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
