import React, { useState } from 'react';
import { Heart, Search, ArrowLeftRight, ShoppingCart, Star } from 'lucide-react';
import { Modal } from '../modal/modal';

interface ProductProps {
  name: string;
  category: string | { name: string };
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount?: number;
  image: string;
}

export const ProductCard: React.FC<ProductProps> = ({ name, category, price, oldPrice, rating, reviewCount, image }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const discountPercentage = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return (
    <>
      <div className="group cursor-pointer">
        {/* Image Container */}
        <div className="relative w-64 h-80 overflow-hidden bg-gray-100 rounded-sm mb-4">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* FEATURED Badge */}
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-1 font-bold uppercase">
            FEATURED
          </span>

          {/* Wishlist Icon */}
          <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:bg-red-500 hover:text-white transition-colors" aria-label="Add to wishlist">
            <Heart size={16} />
          </button>

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button className="bg-white p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors" aria-label="Add to cart">
              <ShoppingCart size={16} />
            </button>
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="bg-white p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
              aria-label="Quick view"
            >
              <Search size={16} />
            </button>
            <button className="bg-white p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors" aria-label="Compare product">
              <ArrowLeftRight size={16} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="pt-4 flex flex-col items-start">
          <span className="text-gray-400 text-[11px] uppercase font-bold mb-1">{typeof category === 'string' ? category : category.name}</span>
          <h3 className="text-sm font-bold text-slate-800 hover:text-blue-600 cursor-pointer transition-colors mb-2">
            {name}
          </h3>
          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({reviewCount || 0})</span>
          </div>
          <div className="flex items-center gap-2">
            {oldPrice && (
              <>
                <span className="text-gray-400 line-through text-sm">${oldPrice.toFixed(2)}</span>
                <span className="text-red-500 font-bold text-sm">{discountPercentage}% OFF</span>
              </>
            )}
            <span className="text-blue-600 font-bold text-sm">${price.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* QUICK VIEW MODAL */}
      <Modal isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)}>
        <div className="grid grid-cols-1 md:grid-cols-2 p-8 gap-8">
          <div className="bg-gray-100 aspect-square">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold mb-2 uppercase">{name}</h2>
            <div className="flex gap-2 text-xl font-bold text-blue-600 mb-4">
              {oldPrice && <span className="text-gray-400 line-through">${oldPrice.toFixed(2)}</span>}
              <span>${price.toFixed(2)}</span>
            </div>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              This is a high-quality fashion piece from the Kapee 2026 collection. 
              Designed for comfort and style, perfect for any professional or casual setting.
            </p>
            <div className="flex flex-col gap-4 mt-auto">
              <div className="flex gap-4 items-center">
                <label htmlFor="quantity" className="sr-only">Quantity</label>
                <input
                  id="quantity"
                  type="number"
                  defaultValue={1}
                  min="1"
                  className="w-16 border p-2 text-center outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Product quantity"
                />
                <button className="flex-1 bg-blue-600 text-white font-bold py-3 uppercase hover:bg-black transition-colors" aria-label="Add to cart">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};