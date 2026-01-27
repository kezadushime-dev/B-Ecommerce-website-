import React, { useState } from 'react';
import { Heart, ShoppingCart, X } from 'lucide-react';

interface WishlistItem {
  id: number;
  name: string;
  price: string;
  image: string;
  discount?: string;
}

const WishlistPage: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: "Men Hooded Navy Blue T-Shirt",
      price: "$70.00",
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=300",
      discount: "19% OFF"
    },
    {
      id: 2,
      name: "Women's Summer Dress",
      price: "$95.00",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=300"
    }
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 font-sans">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <Heart size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500">Add items you love to your wishlist</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <img src={item.image} alt={item.name} className="w-full h-64 object-cover" />
                {item.discount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {item.discount}
                  </span>
                )}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <X size={16} className="text-gray-600" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-xl font-bold text-blue-600 mb-4">{item.price}</p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
