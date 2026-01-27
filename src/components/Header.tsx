import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const categories = [
  { name: "T-Shirts", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500" },
  { name: "Men", img: "https://i.pinimg.com/1200x/b9/44/75/b94475bddf2e7c451335ad341b39ebca.jpg" },
  { name: "Women", img: "https://i.pinimg.com/1200x/99/20/d8/9920d86bdb387622f9b2f3a9c1306578.jpg" },
  { name: "Shoes", img: "https://i.pinimg.com/1200x/70/91/91/709191a7ab0f0c0df873c17146ce2237.jpg" },
  { name: "Bags", img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Watches", img: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Accessories", img: "https://images.pexels.com/photos/821406/pexels-photo-821406.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Electronics", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500" },
  { name: "Home & Kitchen", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=500" },
  { name: "Sports", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500" },
  { name: "Beauty", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=500" },
];

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/product?category=${encodeURIComponent(categoryName)}`);
    setIsPanelOpen(false);
  };

  return (
    <header className="w-full font-sans">
      {/* Top Utility Bar */}
      <div className="bg-[#2463EB] text-white text-xs py-2 border-b border-blue-400">
        <div className="flex flex-col md:flex-row justify-between px-2 md:px-4 gap-2 md:gap-0">
          <div className="flex flex-wrap gap-2 md:gap-4">
            <span>ENGLISH ▾</span>
            <span>$ Dollar () US▾</span>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-4 uppercase tracking-tight">
            <span>Welcome to Online Market!</span>
            <Link to="/blog" className="hover:text-gray-200">Blog</Link>
            <span>FAQ</span>
            <Link to="/contact" className="hover:text-gray-200">Contact Us</Link>
          </div>
        </div>
      </div>

      {/* Main Blue Header */}
      <div className="bg-[#2463EB] py-4 md:py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 px-2 md:px-4">
          <div className="text-2xl md:text-4xl font-bold text-white tracking-tighter">Online Market.</div>

          {/* Search Bar */}
          <div className="w-full md:flex-1 md:max-w-2xl flex bg-white rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-1 px-4 md:px-6 py-2 outline-none text-sm"
            />
            <select className="hidden md:block border-l px-4 text-sm text-gray-500 bg-transparent outline-none">
              <option>All Categories</option>
            </select>
            <button className="px-4 md:px-6 text-blue-600">🔍</button>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 md:gap-6 text-white text-sm">
            <Link to="/auth" className="flex items-center gap-2 hover:text-gray-200">
              <span className="text-xl">👤</span>
              <div className="leading-tight hidden md:block">HELLO, <br/><strong>SIGN IN</strong></div>
              <div className="leading-tight md:hidden"><strong>SIGN IN</strong></div>
            </Link>
            <Link to="/wishlist" className="relative">
              <span className="text-xl">🤍</span>
              <span className="absolute -top-2 -right-2 bg-white text-blue-600 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
            </Link>
            <Link to="/cart" className="flex items-center gap-2 hover:text-gray-200">
              <span className="text-xl">🛒</span>
              <div className="hidden md:block">Cart<br/><strong>$0.00</strong></div>
              <div className="md:hidden"><strong>$0.00</strong></div>
            </Link>
          </div>
        </div>
      </div>

      {/* White Navigation Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="flex flex-col md:flex-row items-center px-2 md:px-4">
          <div className="bg-gray-50 border-x px-4 md:px-6 py-3 font-bold text-sm uppercase flex items-center gap-4 cursor-pointer w-full md:w-auto justify-center md:justify-start">
            <span>☰</span> SHOP BY DEPARTMENT
          </div>
          <ul className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 px-4 md:px-10 text-xs font-bold uppercase tracking-widest text-gray-700 py-2 md:py-0">
            <li><Link to="/" className="text-blue-600 hover:text-blue-700">Home ▾</Link></li>
            <li><Link to="/product" className="hover:text-blue-600">Shop ▾</Link></li>
            <li><Link to="/about" className="hover:text-blue-600">Pages ▾</Link></li>
            <li><Link to="/blog" className="hover:text-blue-600">Blog ▾</Link></li>
            <li className="hover:text-blue-600 cursor-pointer">Elements ▾</li>
            <li className="hover:text-blue-600 cursor-pointer">Buy Now</li>
          </ul>
        </div>
      </div>

      {/* Sliding Category Panel */}
      {isPanelOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsPanelOpen(false)}
          />
          {/* Panel */}
          <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold uppercase">Shop by Department</h2>
                <button
                  onClick={() => setIsPanelOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <img
                      src={category.img}
                      alt={category.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className="font-medium text-gray-800">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
