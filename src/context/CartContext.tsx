import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { isAuthenticated } from '../services/auth';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  colors: string[];
  sizes: string[];
  image: string;
  isFeatured: boolean;
  description: string;
  weight: string;
  material: string;
  userReviews: any[];
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: () => Promise<void>;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const fetchCart = async () => {
    try {
      const response = await api.get('/api/cart');
      setCart(response.data);
    } catch (error: any) {
      // If 404, cart doesn't exist yet, so don't log error
      if (error.response?.status !== 404) {
        console.error('Failed to fetch cart:', error);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      fetchCart();
    }
  }, []);

  const addToCart = async (product: Product) => {
    if (!isAuthenticated()) {
      toast.error('Please log in to add items to your cart.');
      return;
    }
    setCart(prev => {
      const item = prev.find(i => i.id === product.id);
      return item ? prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) : [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
    try {
      await api.post('/cart', { productId: product.id, quantity: 1 });
      toast.success(`${product.name} added to cart successfully!`);
    } catch (error) {
      console.error('Failed to add product to cart:', error);
      toast.error(`Failed to add ${product.name} to cart. Please try again.`);
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      await api.delete(`/api/cart/${id}`);
      await fetchCart();
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id);
    } else {
      // Note: Backend doesn't have PUT endpoint for updating quantity
      // For now, just update local state and refetch
      setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
      // TODO: Implement proper quantity update when backend supports it
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/api/cart');
      setCart([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const placeOrder = async () => {
    try {
      await api.post('/api/order', { items: cart });
      await clearCart();
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      placeOrder,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};
