import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginModal } from '../components/LoginModal';
import { ProfileModal } from '../components/ProfileModal';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import { X, Minus, Plus } from 'lucide-react';

export const Header: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { cart, isCartOpen, setIsCartOpen, updateQuantity } = useCart();

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
            <span>Welcome to Isoko Hub!</span>
            <Link to="/blog" className="hover:text-gray-200">Blog</Link>
            <span>FAQ</span>
            <Link to="/contact" className="hover:text-gray-200">Contact Us</Link>
          </div>
        </div>
      </div>

      {/* Main Blue Header */}
      <div className="bg-[#2463EB] py-4 md:py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 px-2 md:px-4">
          <div className="text-2xl md:text-4xl font-bold text-white tracking-tighter">Isoko Hub.</div>

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
            {isAuthenticated ? (
              <button onClick={() => setIsProfileModalOpen(true)} className="flex items-center gap-2 hover:text-gray-200">
                <span className="text-xl">👤</span>
                <div className="leading-tight hidden md:block">HELLO, <br/><strong>{user?.name || 'USER'}</strong></div>
                <div className="leading-tight md:hidden"><strong>{user?.name || 'USER'}</strong></div>
              </button>
            ) : (
              <button onClick={() => setIsLoginModalOpen(true)} className="flex items-center gap-2 hover:text-gray-200">
                <span className="text-xl">👤</span>
                <div className="leading-tight hidden md:block">HELLO, <br/><strong>SIGN IN</strong></div>
                <div className="leading-tight md:hidden"><strong>SIGN IN</strong></div>
              </button>
            )}
            <Link to="/wishlist" className="relative">
              <span className="text-xl">🤍</span>
              <span className="absolute -top-2 -right-2 bg-white text-blue-600 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
            </Link>
            <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-2 hover:text-gray-200">
              <span className="text-xl">🛒</span>
              <div className="hidden md:block">Cart<br/><strong>{cart.length} items</strong></div>
              <div className="md:hidden"><strong>{cart.length}</strong></div>
            </button>
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

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />

      {/* --- SLIDE CART --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-sm bg-white h-full shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-lg uppercase">Your Cart ({cart.length})</h2>
              <X className="cursor-pointer" onClick={() => setIsCartOpen(false)} />
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 border-b pb-4">
                  <img src={item.image} className="w-16 h-20 object-cover" />
                  <div className="flex-1">
                    <h4 className="text-xs font-bold uppercase">{item.name}</h4>
                    <p className="text-blue-600 font-bold">${item.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 border"><Minus size={10}/></button>
                      <span className="text-xs">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 border"><Plus size={10}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t font-black bg-white">
              <div className="flex justify-between mb-4"><span>Subtotal:</span><span>${cart.reduce((a, b) => a + (b.price * b.quantity), 0).toFixed(2)}</span></div>
              <button onClick={() => alert('Order sent please')} className="w-full bg-blue-600 text-white py-4 hover:bg-black transition">CHECKOUT</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
