import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { isAuthenticated } from '../services/auth';
import { useAuth } from '../hooks/useAuth';
import { createOrder } from '../services/order.service';

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
  cartItemId: string; // _id from backend cart item
}

interface OrderData {
  shippingAddress: string;
  paymentMethod?: string;
  notes?: string;
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
  isPlacingOrder: boolean;
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
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const fetchCart = async () => {
    try {
      const response = await api.get('/cart');
      const cartItems: CartItem[] = response.data.map((item: any): CartItem => ({
        ...item.productId, // spread product properties
        quantity: item.quantity,
        cartItemId: item._id
      }));
      setCart(cartItems);
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
    setIsCartOpen(true);
    try {
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        // Remove existing item and add back with incremented quantity
        await api.delete(`/cart/${existingItem.cartItemId}`);
        await api.post('/cart', { productId: product.id, quantity: existingItem.quantity + 1 });
      } else {
        await api.post('/cart', { productId: product.id, quantity: 1 });
      }
      await fetchCart(); // Refetch to get updated cart with cartItemId
      toast.success(`${product.name} added to cart successfully!`);
    } catch (error) {
      console.error('Failed to add product to cart:', error);
      toast.error(`Failed to add ${product.name} to cart. Please try again.`);
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      await api.delete(`/cart/${id}`);
      await fetchCart();
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id);
    } else {
      try {
        const item = cart.find(item => item.id === id);
        if (item) {
          await api.delete(`/cart/${item.cartItemId}`);
          await api.post('/cart', { items: [{ productId: id, quantity }] });
          await fetchCart();
        }
      } catch (error) {
        console.error('Failed to update quantity:', error);
      }
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/cart/clear');
      setCart([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const placeOrder = async () => {
    setIsPlacingOrder(true);
    try {
      const items = cart.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const userId = user?.id;
      await createOrder({
        items,
        total,
        userId,
        shippingAddress: 'Default Address',
        paymentMethod: 'Credit Card',
        notes: 'Order placed via website'
      });
      await clearCart();
    } finally {
      setIsPlacingOrder(false);
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
      setIsCartOpen,
      isPlacingOrder
    }}>
      {children}
    </CartContext.Provider>
  );
};
