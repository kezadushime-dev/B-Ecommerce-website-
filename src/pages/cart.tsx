import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, placeOrder } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white py-16 text-center border-b">
        <h1 className="text-5xl font-black text-slate-800 mb-2">Shopping Cart</h1>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Home / Cart</p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-black text-slate-800 mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Add some products to get started!</p>
              <button className="bg-blue-600 text-white px-8 py-3 font-bold uppercase text-sm hover:bg-black transition-all">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div>
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between border-b py-4">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-gray-500">${item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                    <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500">Remove</button>
                  </div>
                </div>
              ))}
              <div className="mt-8 text-right">
                <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
                <button onClick={placeOrder} className="mt-4 bg-blue-600 text-white px-8 py-3 font-bold uppercase text-sm hover:bg-black transition-all">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
