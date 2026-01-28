import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Heart, ChevronDown, Star, LayoutGrid, List,
  ArrowLeft, X, Scale, Plus, Minus, Send
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/product.service";

// --- Types ---
interface Review {
  username: string;
  rating: number;
  comment: string;
  date: string;
}

 export interface Product {
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



const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const { data: fetchedProducts, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] = useState<'shop' | 'wishlist' | 'compare'>('shop');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [wishlist, setWishlist] = useState<number[]>([]);
  const [compareList, setCompareList] = useState<number[]>([]);
  const { addToCart } = useCart();

  // Update products when fetched from database
  useEffect(() => {
    if (fetchedProducts?.products) {
      setProducts(fetchedProducts.products);
    }
  }, [fetchedProducts]);

  // Filter States
  const [catFilt, setCatFilt] = useState('All');
  const [priceFilt, setPriceFilt] = useState(200);
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
             (!sizeFilt || p.sizes.includes(sizeFilt)) &&
             (p.rating >= ratingFilt);
    });
  }, [products, catFilt, priceFilt, sizeFilt, ratingFilt]);

  // --- Cart/Wishlist/Compare Handlers ---
  const handleAddToCart = (p: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    addToCart(p);
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
                    <div className="h-40 mb-16"><img src={p.image} alt={p.name} className="w-32 h-32 object-cover mx-auto mb-2" /><p className="font-bold text-xs">{p.name}</p></div>
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
                    <button title="Remove from wishlist" onClick={() => setWishlist(w => w.filter(i => i !== id))} className="absolute top-2 right-2 text-slate-300 hover:text-red-500"><X size={18}/></button>
                    <img src={p.image} alt={p.name} className="w-full aspect-square object-cover mb-4" />
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
                  <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} title="Items per page" className="border px-3 py-1 text-sm">
                    <option value={12}>Show 12</option>
                    <option value={24}>Show 24</option>
                    <option value={36}>Show 36</option>
                  </select>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} title="Sort by" className="border px-3 py-1 text-sm">
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
                          {p.colors.slice(0, 3).map(color => {
                            const colorMap: {[key: string]: string} = {
                              'red': 'bg-red-500',
                              'blue': 'bg-blue-500',
                              'black': 'bg-black',
                              'white': 'bg-white',
                              'green': 'bg-green-500',
                              'yellow': 'bg-yellow-500',
                              'purple': 'bg-purple-500',
                              'orange': 'bg-orange-500',
                              'pink': 'bg-pink-500',
                              'gray': 'bg-gray-500'
                            };
                            return <div key={color} className={`w-4 h-4 rounded-full border border-slate-300 ${colorMap[color.toLowerCase()] || 'bg-gray-300'}`} />;
                          })}
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
                  <button title="Add to wishlist" className="px-6 border"><Heart size={20}/></button>
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

export default ProductPage;
