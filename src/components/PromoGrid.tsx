import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid } from 'swiper/modules';
import { ChevronLeft, ChevronRight, ShoppingCart, Eye } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';

const products = [
  { id: 1, name: "Men Hooded Navy Blue...", price: "$70.00–$95.00", discount: "19% OFF", featured: true, image: "https://i.pinimg.com/736x/be/0c/65/be0c65f0452e6119511f96c129965509.jpg" },
  { id: 2, name: "Men Navy & Red Check...", price: "$99.00–$124.00", discount: "20% OFF", image: "https://i.pinimg.com/736x/22/b3/4d/22b34d2ee7def7b9e9dbdac6d9f027eb.jpg" },
  { id: 3, name: "Light Blue Solid Jeans", price: "$89.00–$96.00", discount: "7% OFF", image: "https://i.pinimg.com/1200x/3e/7a/34/3e7a34d8c407b79dd12b9872f550c865.jpg" },
  { id: 4, name: "Blue Skinny Fit Str...", price: "$120.00", featured: true, image: "https://i.pinimg.com/1200x/ff/5d/b0/ff5db058436188f59fecf1c8788e53b2.jpg" },
];

export const PromoGrid: React.FC = () => {
  return (
    <div className="w-full lg:w-2/5 p-4 relative group bg-white">
      <Swiper
        modules={[Navigation, Grid]}
        navigation={{ nextEl: '.p-next', prevEl: '.p-prev' }}
        slidesPerView={2}
        grid={{ rows: 2, fill: 'row' }}
        spaceBetween={10}
        className="h-full"
      >
        {products.map((p) => (
          <SwiperSlide key={p.id}>
            <div className="group/item p-2 text-center">
              <div className="relative aspect-[3/4] overflow-hidden mb-2 bg-gray-50">
                {p.discount && <span className="absolute top-2 left-2 bg-[#77b43f] text-white text-[10px] px-1.5 py-0.5 font-bold z-10">{p.discount}</span>}
                <img src={p.image} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity bg-black/5">
                  <button className="bg-white p-2 rounded-full shadow-sm hover:bg-blue-600 hover:text-white"><ShoppingCart size={14}/></button>
                  <button className="bg-white p-2 rounded-full shadow-sm hover:bg-blue-600 hover:text-white"><Eye size={14}/></button>
                </div>
              </div>
              <h4 className="text-[12px] text-blue-600 line-clamp-1">{p.name}</h4>
              <p className="text-sm font-bold">${p.price}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="p-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border p-1 opacity-0 group-hover:opacity-100 transition-opacity"><ChevronLeft size={20}/></button>
      <button className="p-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border p-1 opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight size={20}/></button>
    </div>
  );
};