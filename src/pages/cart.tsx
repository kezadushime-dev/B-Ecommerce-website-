import React from 'react';

const CartPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white py-16 text-center border-b">
        <h1 className="text-5xl font-black text-slate-800 mb-2">Shopping Cart</h1>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Home / Cart</p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-black text-slate-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Add some products to get started!</p>
            <button className="bg-blue-600 text-white px-8 py-3 font-bold uppercase text-sm hover:bg-black transition-all">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;