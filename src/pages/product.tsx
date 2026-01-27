import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import {
  Heart, Share2, Maximize2, ShoppingCart, ChevronDown, Star, LayoutGrid, List,
  ArrowLeft, Search, User, ShoppingBag, X, Trash2, Scale, Plus, Minus, Send
} from 'lucide-react';

// --- Types ---
interface Review {
  username: string;
  rating: number;
  comment: string;
  date: string;
}

interface Product {
  id: number;
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
  userReviews: Review[];
}

interface CartItem extends Product {
  quantity: number;
}

// --- MASSIVE DATASET ---
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1, name: "Men Hooded Navy & Grey T-Shirt", category: "T-Shirts",
    price: 70.00, originalPrice: 95.00, rating: 5, reviews: 1,
    colors: ['navy', 'grey'], sizes: ['S', 'M', 'L', 'XL'],
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=500",
    isFeatured: true, description: "70% cotton, 30% polyester. Easy to wear and versatile.",
    weight: "250g", material: "Cotton Blend",
    userReviews: [{ username: "John Doe", rating: 5, comment: "Excellent fit!", date: "2024-05-01" }]
  },
  {
    id: 2, name: "Premium Silver Analog Watch", category: "Watches",
    price: 49.00, originalPrice: 85.00, rating: 4, reviews: 1,
    colors: ['silver', 'black'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500",
    isFeatured: false, description: "Water-resistant stainless steel casing.",
    weight: "150g", material: "Steel", userReviews: []
  },
  {
    id: 3, name: "Women Silk Blouson Top", category: "Women",
    price: 47.00, rating: 3, reviews: 1, colors: ['white', 'pink'], sizes: ['S', 'M'],
    image: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?q=80&w=500",
    isFeatured: true, description: "Soft silk fabric with floral prints.",
    weight: "120g", material: "Silk", userReviews: []
  },
  {
    id: 4, name: "Classic Aviator Sunglasses", category: "Accessories",
    price: 35.00, rating: 5, reviews: 10, colors: ['gold', 'black'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=500",
    isFeatured: false, description: "UV400 Protection with metal frames.",
    weight: "30g", material: "Metal", userReviews: []
  },
  {
    id: 5, name: "Leather Travel Duffle Bag", category: "Bags",
    price: 150.00, rating: 4.5, reviews: 8, colors: ['brown', 'tan'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=500",
    isFeatured: false, description: "Handcrafted genuine leather bag.",
    weight: "1.2kg", material: "Leather", userReviews: []
  },
  {
    id: 6, name: "Blue Skinny Stretch Jeans", category: "Men",
    price: 65.00, rating: 4, reviews: 4, colors: ['blue'], sizes: ['30', '32', '34'],
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=500",
    isFeatured: false, description: "High-quality stretch denim.",
    weight: "600g", material: "Denim", userReviews: []
  },
  {
    id: 7, name: "Urban Knit Sneakers", category: "Shoes",
    price: 89.00, rating: 5, reviews: 15, colors: ['black', 'grey'], sizes: ['8', '9', '10'],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500",
    isFeatured: true, description: "Breathable mesh upper with foam sole.",
    weight: "400g", material: "Mesh", userReviews: []
  },
  {
    id: 8, name: "Vintage Graphic Tee", category: "T-Shirts",
    price: 55.00, originalPrice: 75.00, rating: 4.5, reviews: 12,
    colors: ['white', 'black'], sizes: ['S', 'M', 'L', 'XL'],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500",
    isFeatured: false, description: "Retro-inspired graphic print on soft cotton.",
    weight: "200g", material: "Cotton", userReviews: []
  },
  {
    id: 9, name: "Athletic Performance Shirt", category: "T-Shirts",
    price: 45.00, rating: 4, reviews: 8, colors: ['blue', 'red'], sizes: ['S', 'M', 'L'],
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=500",
    isFeatured: false, description: "Moisture-wicking fabric for active lifestyles.",
    weight: "180g", material: "Polyester", userReviews: []
  },
  {
    id: 10, name: "Casual Polo Shirt", category: "T-Shirts",
    price: 60.00, rating: 4.2, reviews: 6, colors: ['green', 'navy'], sizes: ['M', 'L', 'XL'],
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=500",
    isFeatured: false, description: "Classic polo design with breathable fabric.",
    weight: "220g", material: "Cotton Blend", userReviews: []
  },
  {
    id: 11, name: "Digital Smartwatch", category: "Watches",
    price: 199.00, originalPrice: 299.00, rating: 4.8, reviews: 25,
    colors: ['black', 'silver'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?q=80&w=500",
    isFeatured: true, description: "Fitness tracking and smart notifications.",
    weight: "50g", material: "Plastic", userReviews: []
  },
  {
    id: 12, name: "Luxury Gold Watch", category: "Watches",
    price: 350.00, rating: 5, reviews: 18, colors: ['gold'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=500",
    isFeatured: false, description: "Elegant gold-plated timepiece.",
    weight: "120g", material: "Gold Plated", userReviews: []
  },
  {
    id: 13, name: "Sport Chronograph Watch", category: "Watches",
    price: 120.00, rating: 4.3, reviews: 14, colors: ['black', 'blue'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=500",
    isFeatured: false, description: "Durable chronograph for sports enthusiasts.",
    weight: "180g", material: "Stainless Steel", userReviews: []
  },
  {
    id: 14, name: "Elegant Evening Dress", category: "Women",
    price: 120.00, originalPrice: 180.00, rating: 4.7, reviews: 22,
    colors: ['black', 'red'], sizes: ['S', 'M', 'L'],
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=500",
    isFeatured: true, description: "Flowing chiffon dress for special occasions.",
    weight: "300g", material: "Chiffon", userReviews: []
  },
  {
    id: 15, name: "Casual Summer Skirt", category: "Women",
    price: 40.00, rating: 4, reviews: 9, colors: ['yellow', 'blue'], sizes: ['S', 'M'],
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa?q=80&w=500",
    isFeatured: false, description: "Light and airy skirt for warm weather.",
    weight: "150g", material: "Cotton", userReviews: []
  },
  {
    id: 16, name: "Professional Blazer", category: "Women",
    price: 150.00, rating: 4.5, reviews: 16, colors: ['grey', 'black'], sizes: ['M', 'L'],
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=500",
    isFeatured: false, description: "Tailored blazer for office wear.",
    weight: "500g", material: "Wool Blend", userReviews: []
  },
  {
    id: 17, name: "Leather Belt", category: "Accessories",
    price: 45.00, rating: 4.2, reviews: 11, colors: ['brown', 'black'], sizes: ['S', 'M', 'L'],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500",
    isFeatured: false, description: "Genuine leather belt with classic buckle.",
    weight: "100g", material: "Leather", userReviews: []
  },
  {
    id: 18, name: "Silk Scarf", category: "Accessories",
    price: 65.00, originalPrice: 90.00, rating: 4.8, reviews: 19,
    colors: ['multicolor'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1601762603332-db5e4b2ccb55?q=80&w=500",
    isFeatured: false, description: "Luxurious silk scarf with intricate patterns.",
    weight: "50g", material: "Silk", userReviews: []
  },
  {
    id: 19, name: "Baseball Cap", category: "Accessories",
    price: 25.00, rating: 4, reviews: 7, colors: ['navy', 'black'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500",
    isFeatured: false, description: "Adjustable cap for casual outings.",
    weight: "80g", material: "Cotton", userReviews: []
  },
  {
    id: 20, name: "Tote Bag", category: "Bags",
    price: 80.00, rating: 4.4, reviews: 13, colors: ['beige', 'black'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500",
    isFeatured: false, description: "Spacious canvas tote for everyday use.",
    weight: "300g", material: "Canvas", userReviews: []
  },
  {
    id: 21, name: "Backpack", category: "Bags",
    price: 95.00, originalPrice: 120.00, rating: 4.6, reviews: 21,
    colors: ['grey', 'blue'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500",
    isFeatured: false, description: "Durable backpack with multiple compartments.",
    weight: "800g", material: "Nylon", userReviews: []
  },
  {
    id: 22, name: "Crossbody Bag", category: "Bags",
    price: 70.00, rating: 4.3, reviews: 10, colors: ['red', 'black'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500",
    isFeatured: false, description: "Stylish crossbody bag for hands-free carrying.",
    weight: "250g", material: "Leather", userReviews: []
  },
  {
    id: 23, name: "Chinos Pants", category: "Men",
    price: 75.00, rating: 4.1, reviews: 12, colors: ['khaki', 'navy'], sizes: ['30', '32', '34'],
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=500",
    isFeatured: false, description: "Comfortable chinos for casual wear.",
    weight: "450g", material: "Cotton", userReviews: []
  },
  {
    id: 24, name: "Formal Shirt", category: "Men",
    price: 85.00, originalPrice: 110.00, rating: 4.5, reviews: 15,
    colors: ['white', 'blue'], sizes: ['M', 'L', 'XL'],
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=500",
    isFeatured: false, description: "Crisp formal shirt for professional settings.",
    weight: "280g", material: "Cotton", userReviews: []
  },
  {
    id: 25, name: "Hoodie", category: "Men",
    price: 90.00, rating: 4.7, reviews: 20, colors: ['grey', 'black'], sizes: ['S', 'M', 'L'],
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500",
    isFeatured: true, description: "Cozy hoodie with kangaroo pocket.",
    weight: "600g", material: "Fleece", userReviews: []
  },
  {
    id: 26, name: "Running Shoes", category: "Shoes",
    price: 120.00, originalPrice: 150.00, rating: 4.9, reviews: 30,
    colors: ['white', 'black'], sizes: ['8', '9', '10', '11'],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500",
    isFeatured: true, description: "Lightweight running shoes with cushioning.",
    weight: "350g", material: "Mesh", userReviews: []
  },
  {
    id: 27, name: "Boots", category: "Shoes",
    price: 140.00, rating: 4.4, reviews: 18, colors: ['brown', 'black'], sizes: ['8', '9', '10'],
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=500",
    isFeatured: false, description: "Durable leather boots for all terrains.",
    weight: "900g", material: "Leather", userReviews: []
  },
  {
    id: 28, name: "Sandals", category: "Shoes",
    price: 50.00, rating: 4, reviews: 8, colors: ['tan', 'black'], sizes: ['8', '9', '10'],
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=500",
    isFeatured: false, description: "Comfortable sandals for summer days.",
    weight: "200g", material: "Rubber", userReviews: []
  },
  {
    id: 29, name: "Wireless Headphones", category: "Electronics",
    price: 150.00, originalPrice: 200.00, rating: 4.6, reviews: 35,
    colors: ['black', 'white'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500",
    isFeatured: true, description: "Noise-cancelling wireless headphones.",
    weight: "250g", material: "Plastic", userReviews: []
  },
  {
    id: 30, name: "Smartphone", category: "Electronics",
    price: 699.00, rating: 4.8, reviews: 50, colors: ['black', 'blue'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=500",
    isFeatured: true, description: "Latest smartphone with advanced features.",
    weight: "180g", material: "Glass", userReviews: []
  },
  {
    id: 31, name: "Laptop", category: "Electronics",
    price: 1200.00, originalPrice: 1500.00, rating: 4.7, reviews: 40,
    colors: ['silver', 'black'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=500",
    isFeatured: false, description: "Powerful laptop for work and entertainment.",
    weight: "1.5kg", material: "Aluminum", userReviews: []
  },
  {
    id: 32, name: "Coffee Maker", category: "Home & Kitchen",
    price: 80.00, rating: 4.3, reviews: 22, colors: ['black', 'silver'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=500",
    isFeatured: false, description: "Automatic coffee maker for perfect brews.",
    weight: "2kg", material: "Plastic", userReviews: []
  },
  {
    id: 33, name: "Blender", category: "Home & Kitchen",
    price: 60.00, originalPrice: 80.00, rating: 4.5, reviews: 28,
    colors: ['white', 'black'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=500",
    isFeatured: false, description: "High-speed blender for smoothies and more.",
    weight: "1.2kg", material: "Plastic", userReviews: []
  },
  {
    id: 34, name: "Cookware Set", category: "Home & Kitchen",
    price: 200.00, rating: 4.6, reviews: 15, colors: ['silver'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=500",
    isFeatured: false, description: "Non-stick cookware set for healthy cooking.",
    weight: "3kg", material: "Aluminum", userReviews: []
  },
  {
    id: 35, name: "Yoga Mat", category: "Sports",
    price: 40.00, rating: 4.4, reviews: 25, colors: ['purple', 'blue'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500",
    isFeatured: false, description: "Non-slip yoga mat for comfortable practice.",
    weight: "1kg", material: "Rubber", userReviews: []
  },
  {
    id: 36, name: "Dumbbells Set", category: "Sports",
    price: 100.00, originalPrice: 130.00, rating: 4.7, reviews: 32,
    colors: ['black'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500",
    isFeatured: false, description: "Adjustable dumbbells for home workouts.",
    weight: "10kg", material: "Iron", userReviews: []
  },
  {
    id: 37, name: "Basketball", category: "Sports",
    price: 30.00, rating: 4.2, reviews: 18, colors: ['orange'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=500",
    isFeatured: false, description: "Official size basketball for indoor/outdoor play.",
    weight: "600g", material: "Rubber", userReviews: []
  },
  {
    id: 38, name: "Lipstick", category: "Beauty",
    price: 20.00, rating: 4.5, reviews: 40, colors: ['red', 'pink'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=500",
    isFeatured: false, description: "Long-lasting matte lipstick.",
    weight: "10g", material: "Wax", userReviews: []
  },
  {
    id: 39, name: "Skincare Set", category: "Beauty",
    price: 75.00, originalPrice: 100.00, rating: 4.8, reviews: 55,
    colors: ['neutral'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=500",
    isFeatured: true, description: "Complete skincare routine for glowing skin.",
    weight: "200g", material: "Various", userReviews: []
  },
  {
    id: 40, name: "Perfume", category: "Beauty",
    price: 90.00, rating: 4.6, reviews: 30, colors: ['clear'], sizes: ['OS'],
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=500",
    isFeatured: false, description: "Elegant fragrance for everyday wear.",
    weight: "150g", material: "Liquid", userReviews: []
  }
];

const App = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [view, setView] = useState<'shop' | 'wishlist' | 'compare'>('shop');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [compareList, setCompareList] = useState<number[]>([]);

  // Filter States
  const [search, setSearch] = useState('');
  const [catFilt, setCatFilt] = useState('All');
  const [priceFilt, setPriceFilt] = useState(200);
  const [colorFilt, setColorFilt] = useState<string | null>(null);
  const [sizeFilt, setSizeFilt] = useState<string | null>(null);
  const [ratingFilt, setRatingFilt] = useState<number>(0);

  // Set category filter from URL query param
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setCatFilt(category);
    }
  }, [searchParams]);

  // New states for design
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Category counts
  const categoryCounts = useMemo(() => {
    return products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [products]);

  // Price ranges
  const priceRanges = [
    { label: '$0.00 – $50.00', max: 50 },
    { label: '$50.00 – $100.00', max: 100 },
    { label: '$100.00 – $200.00', max: 200 },
    { label: '$200.00 – $400.00', max: 400 },
    { label: '$400.00 – $800.00', max: 800 },
  ];

  // Review Form State
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  // --- Filtering Logic ---
  const filtered = useMemo(() => {
    return products.filter(p => {
      return (catFilt === 'All' || p.category === catFilt) &&
             (p.price <= priceFilt) &&
             (p.name.toLowerCase().includes(search.toLowerCase())) &&
             (!colorFilt || p.colors.includes(colorFilt)) &&
             (!sizeFilt || p.sizes.includes(sizeFilt)) &&
             (p.rating >= ratingFilt);
    });
  }, [products, catFilt, priceFilt, search, colorFilt, sizeFilt, ratingFilt]);

  // --- Cart/Wishlist/Compare Handlers ---
  const handleAddToCart = (p: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCart(prev => {
      const item = prev.find(i => i.id === p.id);
      return item ? prev.map(i => i.id === p.id ? {...i, quantity: i.quantity + 1} : i) : [...prev, {...p, quantity: 1}];
    });
    setIsCartOpen(true);
  };

  const submitReview = () => {
    if (!selectedProduct || !newReview.comment) return;
    const review: Review = {
      username: "Guest User",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString()
    };
    setProducts(prev => prev.map(p => p.id === selectedProduct.id ? {
      ...p, 
      userReviews: [review, ...p.userReviews],
      reviews: p.reviews + 1
    } : p));
    setNewReview({ rating: 5, comment: '' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
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
                      <button onClick={() => setCart(prev => prev.map(i => i.id === item.id ? {...i, quantity: Math.max(1, i.quantity - 1)} : i))} className="p-1 border"><Minus size={10}/></button>
                      <span className="text-xs">{item.quantity}</span>
                      <button onClick={() => setCart(prev => prev.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i))} className="p-1 border"><Plus size={10}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t font-black bg-white">
              <div className="flex justify-between mb-4"><span>Subtotal:</span><span>${cart.reduce((a, b) => a + (b.price * b.quantity), 0).toFixed(2)}</span></div>
              <button className="w-full bg-blue-600 text-white py-4 hover:bg-black transition">CHECKOUT</button>
            </div>
          </div>
        </div>
      )}

      {/* --- HEADER --- */}
      {!selectedProduct && (
        <nav className="border-b sticky top-0 bg-blue-600 z-50">
          <div className="max-w-7xl mx-auto px-4 h-32 flex items-center justify-center">
            <h1 className="text-3xl font-black text-white cursor-pointer" onClick={() => {setView('shop'); setSelectedProduct(null)}}>{catFilt === 'All' ? 'All Products' : catFilt}</h1>
          </div>
        </nav>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* --- COMPARE VIEW --- */}
        {view === 'compare' && (
          <div className="animate-in fade-in">
            <h2 className="text-2xl font-black mb-8 border-b pb-4">COMPARE PRODUCTS</h2>
            <div className="grid grid-cols-4 border bg-white">
              <div className="space-y-16 p-6 bg-slate-50 border-r font-bold text-sm uppercase text-slate-400">
                <div className="h-40">Info</div><div>Price</div><div>Category</div><div>Rating</div><div>Action</div>
              </div>
              {compareList.map(id => {
                const p = products.find(x => x.id === id)!;
                return (
                  <div key={id} className="p-6 text-center border-r last:border-0 relative">
                    <div className="h-40 mb-16"><img src={p.image} className="w-32 h-32 object-cover mx-auto mb-2" /><p className="font-bold text-xs">{p.name}</p></div>
                    <div className="mb-16 font-black text-blue-600">${p.price}</div>
                    <div className="mb-16 text-xs">{p.category}</div>
                    <div className="mb-16 flex justify-center text-orange-400"><Star size={14} fill="currentColor"/> {p.rating}</div>
                    <button onClick={() => handleAddToCart(p)} className="bg-slate-900 text-white text-[10px] px-4 py-2 font-bold">ADD TO CART</button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* --- WISHLIST VIEW --- */}
        {view === 'wishlist' && (
          <div className="animate-in fade-in">
            <h2 className="text-2xl font-black mb-8 border-b pb-4">YOUR WISHLIST</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {wishlist.map(id => {
                const p = products.find(x => x.id === id)!;
                return (
                  <div key={id} className="border p-4 relative group">
                    <button onClick={() => setWishlist(w => w.filter(i => i !== id))} className="absolute top-2 right-2 text-slate-300 hover:text-red-500"><X size={18}/></button>
                    <img src={p.image} className="w-full aspect-square object-cover mb-4" />
                    <h4 className="font-bold text-sm mb-2">{p.name}</h4>
                    <button onClick={() => handleAddToCart(p)} className="w-full bg-blue-600 text-white py-2 text-xs font-bold">MOVE TO CART</button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* --- SHOP VIEW --- */}
        {view === 'shop' && !selectedProduct && (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 space-y-8">
              <div>
                <h3 className="font-black text-xs uppercase mb-4 border-b pb-2">Product Categories</h3>
                <div className="flex flex-col gap-2 text-sm text-slate-500">
                  {Object.entries(categoryCounts).map(([cat, count]) => (
                    <span key={cat} onClick={() => setCatFilt(cat)} className={`cursor-pointer hover:text-blue-600 ${catFilt === cat ? 'text-blue-600 font-bold' : ''}`}>{cat} ({count})</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-black text-xs uppercase mb-4 border-b pb-2">Filter by Price</h3>
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <label key={range.label} className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={priceFilt === range.max}
                        onChange={() => setPriceFilt(range.max)}
                        className="accent-blue-600"
                      />
                      {range.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-black text-xs uppercase mb-4 border-b pb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {['S', 'M', 'L', 'XL', 'OS', '8', '9', '10'].map(s => (
                    <button key={s} onClick={() => setSizeFilt(s === sizeFilt ? null : s)} className={`px-3 py-1 border text-[10px] font-bold ${sizeFilt === s ? 'bg-blue-600 border-blue-600 text-white' : 'text-slate-400'}`}>{s}</button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-black text-xs uppercase mb-4 border-b pb-2">Min Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3].map(r => (
                    <div key={r} onClick={() => setRatingFilt(r)} className={`flex items-center gap-2 cursor-pointer text-xs ${ratingFilt === r ? 'text-blue-600' : 'text-slate-400'}`}>
                      <div className="flex text-orange-400">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < r ? "currentColor" : "none"} />)}
                      </div>
                      & Up
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Product Count & Controls */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-slate-600">Showing 1–{Math.min(itemsPerPage, filtered.length)} Products of {filtered.length} Products</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'text-blue-600' : 'text-slate-400'}`} aria-label="Grid view"><LayoutGrid size={18} /></button>
                    <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'text-blue-600' : 'text-slate-400'}`} aria-label="List view"><List size={18} /></button>
                  </div>
                  <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="border px-3 py-1 text-sm">
                    <option value={12}>Show 12</option>
                    <option value={24}>Show 24</option>
                    <option value={36}>Show 36</option>
                  </select>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border px-3 py-1 text-sm">
                    <option value="default">Default sorting</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filtered.slice(0, itemsPerPage).map(p => (
                  <div key={p.id} className="group cursor-pointer" onClick={() => setSelectedProduct(p)}>
                    <div className="relative bg-slate-100 overflow-hidden mb-4">
                      {p.isFeatured && <span className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 z-10">FEATURED</span>}
                      <img src={p.image} alt={p.name} className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700" />

                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                        <button onClick={(e) => {e.stopPropagation(); setWishlist(prev => [...prev, p.id])}} className="p-2 bg-white rounded-full shadow hover:text-red-500" aria-label="Add to wishlist"><Heart size={16}/></button>
                        <button onClick={(e) => {e.stopPropagation(); setCompareList(prev => [...prev, p.id])}} className="p-2 bg-white rounded-full shadow hover:text-blue-600" aria-label="Compare product"><Scale size={16}/></button>
                      </div>

                      <div className="absolute bottom-0 w-full bg-blue-600 text-white text-[10px] font-black py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform uppercase tracking-widest">
                        ADD TO CART
                      </div>
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs text-slate-400 uppercase">{p.category}</span>
                      <h4 className="text-sm font-bold group-hover:text-blue-600 transition-colors">{p.name}</h4>
                      <div className="flex items-center gap-1">
                        <div className="flex text-orange-400">
                          {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < Math.floor(p.rating) ? "currentColor" : "none"} />)}
                        </div>
                        <span className="text-xs text-slate-400">({p.reviews})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900">${p.price.toFixed(2)}</span>
                        {p.originalPrice && (
                          <>
                            <span className="text-xs text-slate-300 line-through">${p.originalPrice.toFixed(2)}</span>
                            <span className="text-xs text-red-500 font-bold">{Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% OFF</span>
                          </>
                        )}
                      </div>
                      {p.colors.length > 0 && (
                        <div className="flex gap-1">
                          {p.colors.slice(0, 3).map(color => (
                            <div key={color} className="w-4 h-4 rounded-full border border-slate-300" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Arrows */}
              {filtered.length > itemsPerPage && (
                <div className="flex justify-center mt-8 gap-4">
                  <button className="p-3 bg-white shadow-lg rounded-full hover:bg-gray-100" aria-label="Previous page">
                    <ArrowLeft size={20} />
                  </button>
                  <button className="p-3 bg-white shadow-lg rounded-full hover:bg-gray-100" aria-label="Next page">
                    <ChevronDown size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- DETAIL VIEW --- */}
        {selectedProduct && (
          <div className="animate-in slide-in-from-bottom-10 duration-500">
            <button onClick={() => setSelectedProduct(null)} className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-8 hover:text-blue-600 uppercase"><ArrowLeft size={16}/> Back to products</button>
            <div className="flex flex-col lg:flex-row border border-gray-200 bg-white overflow-hidden">
              <div className="w-full lg:w-1/5 p-4 space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <img key={i} src={selectedProduct.image} alt={`${selectedProduct.name} ${i}`} className="w-full h-24 object-cover cursor-pointer border border-gray-300 hover:border-blue-500" />
                ))}
              </div>
              <div className="w-full lg:w-3/5 relative h-[500px]">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="w-full lg:w-1/5 p-8 space-y-6">
                <h2 className="text-4xl font-black uppercase tracking-tighter">{selectedProduct.name}</h2>
                <div className="bg-blue-50 border border-blue-100 p-4 flex gap-6 text-blue-600 font-black">
                  <div>340 <span className="block text-[8px] uppercase text-slate-400">Days</span></div>
                  <div>13 <span className="block text-[8px] uppercase text-slate-400">Hrs</span></div>
                  <div>55 <span className="block text-[8px] uppercase text-slate-400">Mins</span></div>
                </div>
                <div className="text-4xl font-black text-blue-600">${selectedProduct.price}</div>
                <p className="text-slate-500 text-sm leading-relaxed">{selectedProduct.description}</p>

                <div className="flex gap-4">
                  <button onClick={() => handleAddToCart(selectedProduct)} className="flex-1 bg-blue-600 text-white py-5 font-black uppercase tracking-widest hover:bg-slate-900 transition">ADD TO CART</button>
                  <button className="px-6 border"><Heart size={20}/></button>
                </div>

                {/* REVIEWS SECTION */}
                <div className="mt-12 border-t pt-10">
                  <h3 className="font-black text-lg mb-6 uppercase">Customer Reviews</h3>
                  <div className="space-y-6 mb-10">
                    {selectedProduct.userReviews.map((rev: Review, i: number) => (
                      <div key={i} className="bg-slate-50 p-4 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-sm">{rev.username}</span>
                          <span className="text-[10px] text-slate-400">{rev.date}</span>
                        </div>
                        <div className="flex text-orange-400 mb-2">
                          {[...Array(5)].map((_, starI) => <Star key={starI} size={10} fill={starI < rev.rating ? "currentColor" : "none"} />)}
                        </div>
                        <p className="text-xs text-slate-600 italic">"{rev.comment}"</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Review Form */}
                  <div className="bg-slate-900 p-6 text-white rounded">
                    <h4 className="text-xs font-black uppercase mb-4">Write a Review</h4>
                    <div className="flex gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map(num => (
                        <Star key={num} size={16} onClick={() => setNewReview({...newReview, rating: num})} className={`cursor-pointer ${newReview.rating >= num ? 'text-orange-400 fill-orange-400' : 'text-slate-600'}`} />
                      ))}
                    </div>
                    <textarea
                      placeholder="Your thoughts..."
                      value={newReview.comment}
                      onChange={e => setNewReview({...newReview, comment: e.target.value})}
                      className="w-full bg-slate-800 border-none rounded p-3 text-xs mb-4 outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button onClick={submitReview} className="bg-blue-600 px-6 py-2 text-xs font-bold uppercase flex items-center gap-2 hover:bg-blue-700">Submit Review <Send size={12}/></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;