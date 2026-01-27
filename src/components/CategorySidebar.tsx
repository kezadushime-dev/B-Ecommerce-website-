import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid } from 'swiper/modules';
import { ChevronLeft, ChevronRight, ShoppingCart, Eye } from 'lucide-react';

const categories = [
  { name: "Men", img: "https://i.pinimg.com/1200x/b9/44/75/b94475bddf2e7c451335ad341b39ebca.jpg" },
  { name: "Women", img: "https://i.pinimg.com/1200x/99/20/d8/9920d86bdb387622f9b2f3a9c1306578.jpg" },
  { name: "Shoes", img: "https://i.pinimg.com/1200x/70/91/91/709191a7ab0f0c0df873c17146ce2237.jpg" },
  { name: "Bags", img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Watches", img: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Jewellery", img: "https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=200" },
];

const products = [
  { id: 1, name: "Men Hooded Navy Blue...", price: "$70.00–$95.00", discount: "19% OFF", image: "https://i.pinimg.com/736x/be/0c/65/be0c65f0452e6119511f96c129965509.jpg" },
  { id: 2, name: "Men Navy & Red Check...", price: "$99.00–$124.00", discount: "20% OFF", image: "https://i.pinimg.com/736x/22/b3/4d/22b34d2ee7def7b9e9dbdac6d9f027eb.jpg" },
  { id: 3, name: "Light Blue Solid Jeans", price: "$89.00–$96.00", discount: "7% OFF", image: "https://i.pinimg.com/1200x/3e/7a/34/3e7a34d8c407b79dd12b9872f550c865.jpg" },
  { id: 4, name: "Blue Skinny Fit Str...", price: "$120.00", image: "https://i.pinimg.com/1200x/ff/5d/b0/ff5db058436188f59fecf1c8788e53b2.jpg" },
];

export const CategorySidebar = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Categories Section */}
        <div className="lg:w-3/5">
          <h3 className="text-xl font-bold mb-6">Shop by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <div key={i} className="flex flex-col items-center group cursor-pointer">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border border-gray-100 mb-3 transition-all duration-300 group-hover:shadow-lg group-hover:border-blue-500">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Promo Grid Section */}
        <div className="lg:w-2/5 relative group bg-white">
          <h3 className="text-xl font-bold mb-6">Featured Products</h3>
          <Swiper
            modules={[Navigation, Grid]}
            navigation={{ nextEl: '.p-next', prevEl: '.p-prev' }}
            slidesPerView={2}
            grid={{ rows: 2, fill: 'row' }}
            spaceBetween={10}
            className="h-[400px]"
          >
            {products.map((p) => (
              <SwiperSlide key={p.id}>
                <div className="group/item p-2 text-center">
                  <div className="relative aspect-[3/4] overflow-hidden mb-2 bg-gray-50">
                    {p.discount && <span className="absolute top-2 left-2 bg-[#77b43f] text-white text-[10px] px-1.5 py-0.5 font-bold z-10">{p.discount}</span>}
                    <img src={p.image} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity bg-black/5">
                      <button title="Add to cart" className="bg-white p-2 rounded-full shadow-sm hover:bg-blue-600 hover:text-white"><ShoppingCart size={14}/></button>
                      <button title="Quick view" className="bg-white p-2 rounded-full shadow-sm hover:bg-blue-600 hover:text-white"><Eye size={14}/></button>
                    </div>
                  </div>
                  <h4 className="text-[12px] text-blue-600 line-clamp-1">{p.name}</h4>
                  <p className="text-sm font-bold">{p.price}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button title="Previous" className="p-prev absolute right-16 top-6 z-10 bg-white border p-1 opacity-0 group-hover:opacity-100 transition-opacity"><ChevronLeft size={16}/></button>
          <button title="Next" className="p-next absolute right-2 top-6 z-10 bg-white border p-1 opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight size={16}/></button>
        </div>
      </div>
    </div>
  );
};