import { useNavigate } from 'react-router-dom';

const categories = [
  { name: "T-Shirts", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500" },
  { name: "Men", img: "https://i.pinimg.com/1200x/b9/44/75/b94475bddf2e7c451335ad341b39ebca.jpg" },
  { name: "Women", img: "https://i.pinimg.com/1200x/99/20/d8/9920d86bdb387622f9b2f3a9c1306578.jpg" },
  { name: "Shoes", img: "https://i.pinimg.com/1200x/70/91/91/709191a7ab0f0c0df873c17146ce2237.jpg" },
  { name: "Bags", img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Watches", img: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Accessories", img: "https://images.pexels.com/photos/821406/pexels-photo-821406.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Electronics", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500" },
  { name: "Home & Kitchen", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=500" },
  { name: "Sports", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500" },
  { name: "Beauty", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=500" },
];

export const CategorySlider = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/product?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-row gap-4 overflow-x-auto">
        {categories.map((cat, i) => (
          <button key={i} className="flex flex-col items-center group cursor-pointer flex-shrink-0 bg-transparent border-none p-0" onClick={() => handleCategoryClick(cat.name)}>
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border border-gray-100 mb-3 transition-all duration-300 group-hover:shadow-lg group-hover:border-blue-500">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
