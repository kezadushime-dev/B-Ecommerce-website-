import React, { useState } from 'react';
import { Upload, Plus, FolderPlus } from 'lucide-react';

const CreateCategory: React.FC = () => {
  const [catName, setCatName] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FolderPlus className="text-[#6366F1]" /> New Category
          </h1>
        </header>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-tight">Category Name</label>
            <input
              type="text"
              placeholder="e.g. Gaming Peripherals"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
              onChange={(e) => setCatName(e.target.value)}
            />
          </div>

          {/* Category Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-tight">Category Cover Image</label>
            <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
              {imagePreview ? (
                <img src={imagePreview} className="w-48 h-48 object-cover rounded-xl shadow-md" alt="Preview" />
              ) : (
                <div className="text-center">
                  <div className="bg-white p-4 rounded-full shadow-sm inline-block mb-3">
                    <Upload className="text-indigo-600" size={24} />
                  </div>
                  <p className="text-sm font-medium text-slate-600">Drop your category image here</p>
                  <p className="text-xs text-slate-400 mt-1">Recommended: 800x800px</p>
                </div>
              )}
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImg} />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button className="w-full bg-[#6366F1] text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition transform hover:-translate-y-0.5">
              Create Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
