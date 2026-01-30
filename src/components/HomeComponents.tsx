import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import {
  ShoppingCart,
  Eye,
  Heart,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Search,
  Truck,
  RotateCcw,
  Headphones
} from 'lucide-react';
import { PromoGrid } from './PromoGrid';
import { categoryService } from '../services/category.service';
import type { Category } from '../Types/category';
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/product.service";

// --- STYLES (Swiper CSS imports) ---
import 'swiper/css/bundle';

// --- DATA ---
// Removed static menProducts and womenProducts arrays as they are now fetched from API

const categories = [
  { name: "Accessories", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200", count: 5 },
  { name: "Clothing", img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=200", count: 12 },
  { name: "Electronics", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200", count: 8 },
  { name: "Furniture", img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=200", count: 4 },
  { name: "Shoes", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200", count: 15 },
  { name: "Watches", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200", count: 9 },
];

// --- COMPONENTS ---

const ProductCard = ({ product }: { product: any }) => (
  <div className="group bg-white p-2 border border-transparent hover:shadow-sm transition-all duration-300">
    <div className="relative aspect-[3/4] overflow-hidden bg-[#f9f9f9] mb-3">
      {product.discount && (
        <span className="absolute top-2 left-2 bg-[#77b43f] text-white text-[10px] px-2 py-0.5 font-bold z-10">
          {product.discount}
        </span>
      )}
      <img src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={product.name} />
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <button className="bg-white p-2 rounded-full shadow hover:bg-blue-600 hover:text-white transition-colors" aria-label="Add to cart"><ShoppingCart size={16} /></button>
        <button className="bg-white p-2 rounded-full shadow hover:bg-blue-600 hover:text-white transition-colors" aria-label="Add to wishlist"><Heart size={16} /></button>
      </div>
    </div>
    <h4 className="text-[11px] text-blue-600 font-bold uppercase truncate mb-1 hover:text-black cursor-pointer">{product.name}</h4>
    <p className="text-sm font-black text-slate-800">{product.price}</p>
  </div>
);

export default function StoreFront() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans text-slate-900">

      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. CATEGORY SECTION */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-black text-center mb-8 uppercase">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center group cursor-pointer">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border border-gray-100 group-hover:border-blue-500 transition-all duration-300">
                <img src={cat.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200"} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h4 className="font-bold text-sm uppercase mb-1 group-hover:text-blue-600 transition-colors">{cat.name}</h4>
              <p className="text-gray-400 text-xs">{cat.productCount || 0} Products</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PRODUCTS SLIDER */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-black text-center mb-8 uppercase">Featured Products</h2>
        <Swiper modules={[Autoplay, Navigation]} navigation autoplay={{ delay: 3000 }} loop spaceBetween={20} slidesPerView={1} breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}>
          {productsData?.products?.slice(0, 6).map((p: any) => (
            <SwiperSlide key={p.id}>
              <ProductCard product={{
                id: p.id,
                name: p.name,
                price: `$${p.price.toFixed(2)}`,
                discount: p.originalPrice ? `${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% OFF` : undefined,
                image: p.images && p.images.length > 0 ? p.images[0] : 'https://via.placeholder.com/400x400'
              }} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 4. MEN'S FASHION SECTION */}
      <MensFashionSection products={productsData} isLoading={productsLoading} />

      {/* 5. WOMEN'S FASHION SECTION */}
      <WomensFashionSection products={productsData} isLoading={productsLoading} />

      {/* 6. SERVICE SECTION */}
      <ServiceSection />

      {/* 7. FOOTER */}
    

    </div>
  );
}

export const Hero = () => {
  return (
    <section className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-12 gap-4 lg:h-[550px]">
        {/* Main Hero Slider (8 Cols) */}
        <div className="col-span-12 lg:col-span-8 rounded-sm overflow-hidden relative group">
          <Swiper modules={[Autoplay, Pagination]} pagination={{ clickable: true }} autoplay={{ delay: 5000 }} loop className="h-full bg-[#f3f4f6]">
            <SwiperSlide>
              <div className="relative h-full w-full flex items-center">
                <div className="z-10 pl-10 md:pl-20">
                  <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">New Season 2026</span>
                  <h2 className="text-4xl md:text-7xl font-serif text-slate-900 mb-6 leading-tight uppercase italic">Summer <br/>Sale</h2>
                  <p className="text-xl font-bold text-gray-700 mb-8 tracking-widest uppercase">Min. 40% Off</p>
                  <button className="border-2 border-blue-600 text-blue-600 font-black px-10 py-3 uppercase text-xs hover:bg-blue-600 hover:text-white transition-all">Shop Now</button>
                </div>
                <img src="https://i.pinimg.com/736x/34/0a/27/340a27d7d2a79c2faff7a96efa3b8533.jpg" className="absolute right-0 h-full w-3/3 object-cover object-top" alt="Hero" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative h-full w-full flex items-center">
                <div className="z-10 pl-10 md:pl-20">
                  <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">Winter Collection</span>
                  <h2 className="text-4xl md:text-7xl font-serif text-slate-900 mb-6 leading-tight uppercase italic">Cozy <br/>Winter</h2>
                  <p className="text-xl font-bold text-gray-700 mb-8 tracking-widest uppercase">Up to 50% Off</p>
                  <button className="border-2 border-blue-600 text-blue-600 font-black px-10 py-3 uppercase text-xs hover:bg-blue-600 hover:text-white transition-all">Shop Now</button>
                </div>
                <img src="https://i.pinimg.com/1200x/e7/e5/fa/e7e5fa7a0f62c19cc20a313ebe5ff8bc.jpg" className="absolute right-0 h-full w-3/3 object-cover object-top" alt="Hero 2" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Side Banners (4 Cols) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <div className="relative flex-1 bg-white p-8 flex flex-col justify-center overflow-hidden group border border-gray-100">
            <div className="z-10">
              <p className="text-blue-600 text-[10px] font-black uppercase mb-1">White Sneakers</p>
              <h3 className="text-2xl font-bold mb-4 uppercase italic">Min. 30% Off</h3>
              <button className="bg-blue-600 text-white px-6 py-2 text-[10px] font-bold uppercase hover:bg-black transition-colors">Shop Now</button>
            </div>
            <img src="https://i.pinimg.com/736x/c8/dc/f3/c8dcf3faebc2b8d0a118c3d5965b8d3f.jpg" className="absolute right-0 h-full w-2/2 object-cover group-hover:scale-110 transition-transform duration-700" alt="Sneakers" />
          </div>
          <div className="relative flex-1 bg-white p-8 flex flex-col justify-center overflow-hidden group border border-gray-100">
            <div className="z-10">
              <p className="text-blue-600 text-[10px] font-black uppercase mb-1">Jewery Fashion</p>
              <h3 className="text-2xl font-bold mb-4 uppercase italic">Up to 65% Off</h3>
              <button className="bg-blue-600 text-white px-6 py-2 text-[10px] font-bold uppercase hover:bg-black transition-colors">Shop Now</button>
            </div>
            <img src="https://i.pinimg.com/1200x/a3/10/71/a310711612081d5d9326313b34e3a7b5.jpg" className="absolute right-0 h-full w-2/2 object-cover group-hover:scale-110 transition-transform duration-700" alt="Fashion" />
          </div>
        </div>
      </div>
    </section>
  );
};

export const MensFashionSection = ({ products, isLoading }: { products?: any, isLoading: boolean }) => {
  const menProducts = products?.products?.filter((p: any) => {
    const category = typeof p.category === 'string' ? p.category : p.category?.name;
    return category?.toLowerCase().includes('men') || category?.toLowerCase().includes('male');
  }) || [];

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row border border-gray-200 bg-white">
        {/* Category Sidebar */}
        <div className="w-full lg:w-[15%] border-r border-gray-100 p-4">
          <h3 className="font-black text-sm text-blue-600 border-b-2 border-blue-600 inline-block pb-1 uppercase mb-6">Men's Fashion</h3>
          <ul className="text-[13px] text-gray-500 space-y-4">
            {['Wallets', 'T-Shirts', 'Shirts', 'Jeans', 'Jackets'].map(c => (
              <li key={c} className="hover:text-blue-600 cursor-pointer transition-colors flex justify-between items-center group">
                {c} <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-600" />
              </li>
            ))}
          </ul>
        </div>

        {/* Large Center Promo Image with Swiper & Price Badge */}
        <div className="w-full lg:w-[35%] relative border-r border-gray-100 overflow-hidden group min-h-[500px]">
          <div className="absolute top-10 inset-x-0 z-10 text-center pointer-events-none">
            <h2 className="text-3xl font-black uppercase text-gray-800 tracking-tighter italic">Men's Apparel</h2>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Sale 30% Off</p>
          </div>

          <Swiper modules={[Autoplay]} autoplay={{ delay: 4000 }} loop className="h-full">
             <SwiperSlide>
                <img src="https://i.pinimg.com/1200x/43/d8/80/43d88090031ae649b3fd076ad23f3f9d.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Men Promo 1" />
             </SwiperSlide>
             <SwiperSlide>
                <img src="https://i.pinimg.com/736x/ca/78/52/ca78523cbd8fe818b9aae86b0d99f8de.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Men Promo 2" />
             </SwiperSlide>
          </Swiper>

          {/* Signature Green Price Badge */}
          <div className="absolute bottom-10 left-10 z-20">
            <div className="bg-[#77b43f] text-white w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold rotate-[-12deg] shadow-xl border-2 border-white/20">
              <span className="text-[10px]">$</span>
              <span className="text-2xl leading-none">39</span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full lg:w-[50%] p-4 grid grid-cols-2 md:grid-cols-3 gap-3">
          {isLoading ? (
            <p>Loading men's products...</p>
          ) : (
            menProducts.slice(0, 6).map((p: any) => (
              <ProductCard
                key={p.id}
                product={{
                  id: p.id,
                  name: p.name,
                  price: `$${p.price.toFixed(2)}`,
                  discount: p.originalPrice ? `${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% OFF` : undefined,
                  image: p.images && p.images.length > 0 ? p.images[0] : 'https://via.placeholder.com/400x400'
                }}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export const WomensFashionSection = ({ products, isLoading }: { products?: any, isLoading: boolean }) => {
  const womenProducts = products?.products?.filter((p: any) => {
    const category = typeof p.category === 'string' ? p.category : p.category?.name;
    return category?.toLowerCase().includes('women') || category?.toLowerCase().includes('female') || category?.toLowerCase().includes('lady');
  }) || [];

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row border border-gray-200 bg-white">
        {/* Category Sidebar */}
        <div className="w-full lg:w-[15%] border-r border-gray-100 p-4">
          <h3 className="font-black text-sm text-blue-600 border-b-2 border-blue-600 inline-block pb-1 uppercase mb-6">Women's Fashion</h3>
          <ul className="text-[13px] text-gray-500 space-y-4">
            {['Dresses', 'Tops', 'Skirts', 'Jackets', 'Accessories'].map(c => (
              <li key={c} className="hover:text-blue-600 cursor-pointer transition-colors flex justify-between items-center group">
                {c} <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-600" />
              </li>
            ))}
          </ul>
        </div>

        {/* Large Center Promo Image with Swiper & Price Badge */}
        <div className="w-full lg:w-[35%] relative border-r border-gray-100 overflow-hidden group min-h-[500px]">
          <div className="absolute top-10 inset-x-0 z-10 text-center pointer-events-none">
            <h2 className="text-3xl font-black uppercase text-gray-800 tracking-tighter italic">Women's Apparel</h2>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Sale 40% Off</p>
          </div>

          <Swiper modules={[Autoplay]} autoplay={{ delay: 4000 }} loop className="h-full">
             <SwiperSlide>
                <img src="https://i.pinimg.com/736x/ec/8f/d9/ec8fd96337511bafbb39cfa7a3a34113.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Women Promo 1" />
             </SwiperSlide>
             <SwiperSlide>
                <img src="https://i.pinimg.com/736x/84/39/fd/8439fd50cf425660c18874924ccb3e33.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Women Promo 2" />
             </SwiperSlide>
          </Swiper>

          {/* Signature Green Price Badge */}
          <div className="absolute bottom-10 left-10 z-20">
            <div className="bg-[#77b43f] text-white w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold rotate-[-12deg] shadow-xl border-2 border-white/20">
              <span className="text-[10px]">$</span>
              <span className="text-2xl leading-none">45</span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full lg:w-[50%] p-4 grid grid-cols-2 md:grid-cols-3 gap-3">
          {isLoading ? (
            <p>Loading women's products...</p>
          ) : (
            womenProducts.slice(0, 6).map((p: any) => (
              <ProductCard
                key={p.id}
                product={{
                  id: p.id,
                  name: p.name,
                  price: `$${p.price.toFixed(2)}`,
                  discount: p.originalPrice ? `${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% OFF` : undefined,
                  image: p.images && p.images.length > 0 ? p.images[0] : 'https://via.placeholder.com/400x400'
                }}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export const ServiceSection = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#f0f9ff] p-8 rounded-sm text-center border border-blue-50 flex flex-col items-center">
          <Truck className="text-blue-600 mb-3" size={32} />
          <h3 className="text-lg font-black uppercase mb-2">Free Shipping</h3>
          <p className="text-gray-500 text-sm">On all orders over $100</p>
        </div>
        <div className="bg-[#f0fdf4] p-8 rounded-sm text-center border border-green-50 flex flex-col items-center">
          <Headphones className="text-green-600 mb-3" size={32} />
          <h3 className="text-lg font-black uppercase mb-2">24/7 Support</h3>
          <p className="text-gray-500 text-sm">Online help whenever you need</p>
        </div>
        <div className="bg-[#fff7ed] p-8 rounded-sm text-center border border-orange-50 flex flex-col items-center">
          <RotateCcw className="text-orange-600 mb-3" size={32} />
          <h3 className="text-lg font-black uppercase mb-2">Easy Returns</h3>
          <p className="text-gray-500 text-sm">30-day money back guarantee</p>
        </div>
      </div>
    </section>
  );
};


export { PromoGrid };
