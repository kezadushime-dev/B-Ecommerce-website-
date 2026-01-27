import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ProductCard } from './productCard';
import { ShoppingCart, Eye } from 'lucide-react';

interface FashionProduct {
  id: number;
  name: string;
  price: string;
  discount?: string;
  image: string;
}

export const Hero: React.FC = () => {
  const heroImages = [
    "https://i.pinimg.com/1200x/ef/e5/6b/efe56bc0d50e3e4d4d96a9bad6f61da0.jpg",
    "https://i.pinimg.com/736x/70/91/91/709191a7ab0f0c0df873c17146ce2237.jpg",
    "https://i.pinimg.com/736x/7f/8a/9b/7f8a9b8c4d5e6f7a8b9c0d1e2f3a4b5c.jpg",
    "https://i.pinimg.com/736x/be/0c/65/be0c65f0452e6119511f96c129965509.jpg",
    "https://i.pinimg.com/736x/22/b3/4d/22b34d2ee7def7b9e9dbdac6d9f027eb.jpg"
  ];

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-12 gap-4 h-[550px]">
        <div className="col-span-12 md:col-span-8 rounded-sm overflow-hidden relative group">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            className="h-full"
          >
            {heroImages.map((src, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full w-full">
                  <img
                    src={src}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                    alt={`Hero ${index + 1}`}
                  />
                  <div className="absolute inset-0 bg-black/5 flex flex-col justify-center pl-16">
                    <span className="text-blue-600 font-bold uppercase tracking-widest mb-2 text-xs">New Season</span>
                    <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">SUMMER <br/> COLLECTION</h2>
                    <button className="bg-blue-600 text-white font-bold px-10 py-4 w-max uppercase text-xs hover:bg-black transition-all duration-300 shadow-lg" aria-label="Shop Summer Collection">
                      Shop Now
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
          <div className="flex-1 relative group overflow-hidden">
            <img src="https://i.pinimg.com/736x/70/91/91/709191a7ab0f0c0df873c17146ce2237.jpg" className="absolute inset-0 w-full h-full object-cover" alt="White Sneakers" />
            <div className="absolute inset-0 bg-black/30 flex items-center p-8">
              <div className="z-10 text-white">
                <p className="text-blue-300 text-xs font-bold uppercase mb-1">White Sneakers</p>
                <h3 className="text-2xl font-black mb-4 uppercase leading-none">Min. 30% Off</h3>
                <button className="border-b-2 border-white text-white text-[11px] font-black uppercase hover:text-blue-300 transition-colors">Shop Now</button>
              </div>
            </div>
          </div>

          <div className="flex-1 relative group overflow-hidden">
            <img src="https://i.pinimg.com/736x/7f/8a/9b/7f8a9b8c4d5e6f7a8b9c0d1e2f3a4b5c.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Women's Fashion" />
            <div className="absolute inset-0 bg-black/20 flex items-center p-8">
              <div className="z-10 text-white">
                <p className="text-orange-300 text-xs font-bold uppercase mb-1">Women's Fashion</p>
                <h3 className="text-2xl font-black mb-1 uppercase leading-none">Up to 65% Off</h3>
                <p className="text-gray-200 text-xs mb-4">Shoes & Backpacks</p>
                <button className="bg-orange-600 text-white text-[10px] font-bold px-6 py-2 uppercase hover:bg-black transition-all">Shop Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



const menProducts = [
  { id: 1, name: "Men Hooded Navy Blue", price: "$70.00–$95.00", discount: "19% OFF", image: "https://i.pinimg.com/736x/be/0c/65/be0c65f0452e6119511f96c129965509.jpg" },
  { id: 2, name: "Men Navy & Red Check", price: "$99.00–$124.00", discount: "20% OFF", image: "https://i.pinimg.com/736x/22/b3/4d/22b34d2ee7def7b9e9dbdac6d9f027eb.jpg" },
  { id: 3, name: "Light Blue Solid Jeans", price: "$89.00–$96.00", discount: "7% OFF", image: "https://i.pinimg.com/1200x/3e/7a/34/3e7a34d8c407b79dd12b9872f550c865.jpg" },
  { id: 4, name: "Blue Skinny Fit", price: "$120.00", image: "https://i.pinimg.com/1200x/ff/5d/b0/ff5db058436188f59fecf1c8788e53b2.jpg" },
];

const womenProducts = [
  { id: 5, name: "Women Off White Printed", price: "$47.00", image: "https://i.pinimg.com/736x/7f/8a/9b/7f8a9b8c4d5e6f7a8b9c0d1e2f3a4b5c.jpg" },
  { id: 6, name: "Women Khaki Solid Top", price: "$199.00", image: "https://i.pinimg.com/736x/8a/9b/7c/8a9b7c6d5e4f3a2b1c0d9e8f7a6b5c4d.jpg" },
  { id: 7, name: "Women Navy Blue Solid", price: "$160.00–$190.00", image: "https://i.pinimg.com/736x/9b/7c/8a/9b7c8a6d5e4f3a2b1c0d9e8f7a6b5c4d.jpg" },
  { id: 8, name: "Women Blue Solid Denim", price: "$49.00", oldPrice: "$89.00", discount: "45% OFF", image: "https://i.pinimg.com/736x/7c/8a/9b/7c8a9b6d5e4f3a2b1c0d9e8f7a6b5c4d.jpg" },
];

const FashionProductCard = ({ product }: { product: any }) => (
  <div className="group relative bg-white p-2">
    <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-3">
      {product.discount && (
        <span className="absolute top-2 left-2 bg-[#77b43f] text-white text-[10px] px-1.5 py-0.5 font-bold z-10">
          {product.discount}
        </span>
      )}
      <img src={product.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={product.name} />
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <button className="bg-white p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors" aria-label="Add to cart"><ShoppingCart size={16} /></button>
        <button className="bg-white p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors" aria-label="View product"><Eye size={16} /></button>
      </div>
    </div>
    <h4 className="text-[12px] text-blue-600 font-medium mb-1 truncate hover:text-black cursor-pointer">{product.name}</h4>
    <p className="text-sm font-bold text-gray-900">{product.price}</p>
  </div>
);

export const MensFashionSection = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row border border-gray-200 bg-white overflow-hidden">
        <div className="w-full lg:w-1/5 border-r border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-sm tracking-tight text-blue-600">Men's Fashion</h3>
          </div>
          <ul className="text-[13px] text-gray-500 py-2">
            {['Wallets', 'T Shirts', 'Shirts', 'Jeans', 'Jackets & Coats'].map((cat) => (
              <li key={cat} className="px-6 py-2.5 hover:text-blue-600 cursor-pointer transition-colors border-b border-gray-50 last:border-0">{cat}</li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-2/5 relative border-r border-gray-100 h-[400px]">
          <div className="h-full bg-[#f9f9f9] flex flex-col items-center pt-16 text-center px-6">
            <h2 className="text-3xl font-black uppercase text-gray-800 tracking-tighter leading-none mb-2">Men's Clothing</h2>
            <p className="text-gray-400 text-sm uppercase tracking-[0.2em] font-bold">Up to 50% Off</p>
            <div className="absolute bottom-0 w-full h-[75%]">
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className="h-full"
              >
                <SwiperSlide>
                  <img src="https://i.pinimg.com/736x/be/0c/65/be0c65f0452e6119511f96c129965509.jpg" className="w-full h-full object-contain" alt="Men's Fashion 1" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="https://i.pinimg.com/736x/22/b3/4d/22b34d2ee7def7b9e9dbdac6d9f027eb.jpg" className="w-full h-full object-contain" alt="Men's Fashion 2" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="https://i.pinimg.com/1200x/3e/7a/34/3e7a34d8c407b79dd12b9872f550c865.jpg" className="w-full h-full object-contain" alt="Men's Fashion 3" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="https://i.pinimg.com/1200x/ff/5d/b0/ff5db058436188f59fecf1c8788e53b2.jpg" className="w-full h-full object-contain" alt="Men's Fashion 4" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className="absolute bottom-10 left-8 z-20">
            <div className="bg-[#77b43f] text-white w-14 h-14 rounded-full flex flex-col items-center justify-center font-bold rotate-[-12deg] shadow-xl border-2 border-white/20">
              <span className="text-[10px] leading-none">$</span>
              <span className="text-xl">39</span>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/5 p-4">
          <div className="grid grid-cols-2 gap-2 h-full">
            {menProducts.map((p) => <FashionProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export const WomensFashionSection = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row border border-gray-200 bg-white overflow-hidden">
        <div className="w-full lg:w-1/5 border-r border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-sm tracking-tight text-pink-600">Women's Fashion</h3>
          </div>
          <ul className="text-[13px] text-gray-500 py-2">
            {['Trousers & Capris', 'Tops', 'Shorts & Skirts', 'Lingerie & Nightwear', 'Jeans', 'Dresses'].map((cat) => (
              <li key={cat} className="px-6 py-2.5 hover:text-pink-600 cursor-pointer transition-colors border-b border-gray-50 last:border-0">{cat}</li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-2/5 relative border-r border-gray-100 h-[400px]">
          <div className="h-full bg-[#fdf2f8] flex flex-col items-center pt-16 text-center px-6">
            <h2 className="text-3xl font-black uppercase text-gray-800 tracking-tighter leading-none mb-2">New Arrival</h2>
            <p className="text-gray-400 text-sm uppercase tracking-[0.2em] font-bold">Up to 70% Off</p>
            <img src="https://i.pinimg.com/736x/7f/8a/9b/7f8a9b8c4d5e6f7a8b9c0d1e2f3a4b5c.jpg" className="absolute bottom-0 max-h-[75%] object-contain" alt="Women's Fashion" />
          </div>
          <div className="absolute bottom-10 left-8 z-20">
            <div className="bg-pink-500 text-white w-14 h-14 rounded-full flex flex-col items-center justify-center font-bold rotate-[-12deg] shadow-xl border-2 border-white/20">
              <span className="text-[10px] leading-none">$</span>
              <span className="text-xl">29</span>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/5 p-4">
          <div className="grid grid-cols-2 gap-2 h-full">
            {womenProducts.map((p) => <FashionProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

const featuredProducts = [
  { id: 1, name: "Minimalist Cotton Shirt", category: "Clothing", price: 45.00, oldPrice: 60.00, rating: 5, reviewCount: 128, image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 2, name: "Leather Weekend Bag", category: "Bags", price: 120.00, rating: 4, reviewCount: 89, image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 3, name: "Classic Gold Watch", category: "Accessories", price: 85.00, oldPrice: 110.00, rating: 5, reviewCount: 156, image: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 4, name: "White Urban Sneakers", category: "Shoes", price: 55.00, rating: 4, reviewCount: 203, image: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 5, name: "Designer Sunglasses", category: "Accessories", price: 95.00, rating: 5, reviewCount: 67, image: "https://images.pexels.com/photos/1572631/pexels-photo-1572631.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 6, name: "Premium Denim Jacket", category: "Clothing", price: 150.00, oldPrice: 200.00, rating: 4.5, reviewCount: 94, image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 7, name: "Elegant Evening Dress", category: "Clothing", price: 180.00, rating: 5, reviewCount: 112, image: "https://images.pexels.com/photos/2235071/pexels-photo-2235071.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 8, name: "Casual Canvas Sneakers", category: "Shoes", price: 75.00, rating: 4, reviewCount: 178, image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 9, name: "Luxury Perfume", category: "Beauty", price: 120.00, oldPrice: 150.00, rating: 5, reviewCount: 145, image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 10, name: "Wireless Headphones", category: "Electronics", price: 200.00, rating: 4.5, reviewCount: 87, image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 1, name: "Minimalist Cotton Shirt", category: "Clothing", price: 45.00, oldPrice: 60.00, rating: 5, reviewCount: 128, image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 2, name: "Leather Weekend Bag", category: "Bags", price: 120.00, rating: 4, reviewCount: 89, image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 3, name: "Classic Gold Watch", category: "Accessories", price: 85.00, oldPrice: 110.00, rating: 5, reviewCount: 156, image: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 4, name: "White Urban Sneakers", category: "Shoes", price: 55.00, rating: 4, reviewCount: 203, image: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 5, name: "Designer Sunglasses", category: "Accessories", price: 95.00, rating: 5, reviewCount: 67, image: "https://images.pexels.com/photos/1572631/pexels-photo-1572631.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 6, name: "Premium Denim Jacket", category: "Clothing", price: 150.00, oldPrice: 200.00, rating: 4.5, reviewCount: 94, image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 7, name: "Elegant Evening Dress", category: "Clothing", price: 180.00, rating: 5, reviewCount: 112, image: "https://images.pexels.com/photos/2235071/pexels-photo-2235071.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 8, name: "Casual Canvas Sneakers", category: "Shoes", price: 75.00, rating: 4, reviewCount: 178, image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 9, name: "Luxury Perfume", category: "Beauty", price: 120.00, oldPrice: 150.00, rating: 5, reviewCount: 145, image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 10, name: "Wireless Headphones", category: "Electronics", price: 200.00, rating: 4.5, reviewCount: 87, image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 1, name: "Minimalist Cotton Shirt", category: "Clothing", price: 45.00, oldPrice: 60.00, rating: 5, reviewCount: 128, image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 2, name: "Leather Weekend Bag", category: "Bags", price: 120.00, rating: 4, reviewCount: 89, image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 3, name: "Classic Gold Watch", category: "Accessories", price: 85.00, oldPrice: 110.00, rating: 5, reviewCount: 156, image: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 4, name: "White Urban Sneakers", category: "Shoes", price: 55.00, rating: 4, reviewCount: 203, image: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 5, name: "Designer Sunglasses", category: "Accessories", price: 95.00, rating: 5, reviewCount: 67, image: "https://images.pexels.com/photos/1572631/pexels-photo-1572631.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 6, name: "Premium Denim Jacket", category: "Clothing", price: 150.00, oldPrice: 200.00, rating: 4.5, reviewCount: 94, image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 7, name: "Elegant Evening Dress", category: "Clothing", price: 180.00, rating: 5, reviewCount: 112, image: "https://images.pexels.com/photos/2235071/pexels-photo-2235071.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 8, name: "Casual Canvas Sneakers", category: "Shoes", price: 75.00, rating: 4, reviewCount: 178, image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 9, name: "Luxury Perfume", category: "Beauty", price: 120.00, oldPrice: 150.00, rating: 5, reviewCount: 145, image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 10, name: "Wireless Headphones", category: "Electronics", price: 200.00, rating: 4.5, reviewCount: 87, image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=400" },
];

export const ProductSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-16 border-t border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-800">Featured Products</h2>
          <div className="h-[3px] w-14 bg-blue-600 mt-2 mx-auto md:mx-0"></div>
        </div>

        <div className="flex items-center gap-6">
          <ul className="flex gap-6 text-[11px] font-black uppercase text-gray-400">
            <li className="text-blue-600 cursor-pointer border-b-2 border-blue-600 pb-1">All</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors pb-1">New Arrival</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors pb-1">Bestseller</li>
          </ul>
          <button className="bg-blue-600 text-white font-bold px-6 py-2 uppercase text-xs hover:bg-black transition-colors">
            View All
          </button>
        </div>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={180}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 8,
            },
          }}
          navigation={{
            nextEl: '.swiper-button-next-featured',
            prevEl: '.swiper-button-prev-featured',
          }}
          className="featured-products-slider"
        >
          {featuredProducts.map(product => (
            <SwiperSlide key={product.id} className="flex-shrink-0 w-auto">
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="swiper-button-prev-featured absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors" aria-label="Previous products"></button>
        <button className="swiper-button-next-featured absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors" aria-label="Next products"></button>
      </div>
    </section>
  );
};

export const PromoGrid: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-8 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
          <p className="text-gray-600">On orders over $100</p>
        </div>
        <div className="bg-green-50 p-8 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
          <p className="text-gray-600">Customer service available</p>
        </div>
        <div className="bg-orange-50 p-8 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-2">Easy Returns</h3>
          <p className="text-gray-600">30-day return policy</p>
        </div>
      </div>
    </section>
  );
};