import React, { useState, useEffect } from 'react';
import { getCategories } from '../services/category.service';
import type { Category } from '../Types/category';

export const ProductFilter: React.FC = () => {
  const [price, setPrice] = useState(500);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
        setLoading(false);
      });
  }, []);
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'Blue', hex: '#2463EB' },
    { name: 'Red', hex: '#EF4444' },
    { name: 'Gray', hex: '#9CA3AF' },
    { name: 'Green', hex: '#10B981' }
  ];

  return (
    <aside className="w-full space-y-8 pr-8">
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-2">Categories</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          {loading ? (
            <li>Loading categories...</li>
          ) : (
            categories.map((cat) => (
              <li key={cat.id} className="flex justify-between items-center hover:text-blue-600 cursor-pointer transition-colors group">
                <span>{cat.name}</span>
                <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full group-hover:bg-blue-100">12</span>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Price Filter */}
      <div>
        <label htmlFor="price-range" className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-2">Filter by Price</label>
        <input
          id="price-range"
          type="range"
          min="0"
          max="1000"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          aria-label="Price range"
        />
        <div className="flex justify-between mt-4 text-sm font-bold">
          <span>Price: $0 — ${price}</span>
          <button className="text-blue-600 uppercase text-[11px] hover:underline">Filter</button>
        </div>
      </div>

      {/* Color Filter */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-2">Filter by Color</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <div 
              key={color.name}
              className="group flex flex-col items-center gap-1 cursor-pointer"
              title={color.name}
            >
              <div 
                className="w-6 h-6 rounded-full border border-gray-200 group-hover:scale-110 transition-transform" 
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-[9px] uppercase text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {color.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-2">Size</h3>
        <div className="flex flex-wrap gap-2">
          {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
            <button key={size} className="border px-3 py-1 text-xs hover:border-blue-600 hover:text-blue-600 transition-all">
              {size}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export const ShopPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Sidebar (takes up 1/4 of the width) */}
        <div className="w-full md:w-1/4">
          <ProductFilter />
        </div>

        {/* Right Product Grid (takes up 3/4 of the width) */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-8 bg-gray-50 p-4 rounded-sm">
            <p className="text-sm text-gray-500">Showing 1–12 of 36 results</p>
            <select className="bg-transparent text-sm font-bold outline-none cursor-pointer" aria-label="Sort products">
              <option>Default Sorting</option>
              <option>Price: Low to High</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Map your products here */}
            {/* <ProductCard ... /> */}
          </div>
        </div>
      </div>
    </div>
  );
};