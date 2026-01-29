import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCategories } from '../services/category.service';
import type { Category } from '../Types/category';

const defaultImg = "https://i.pinimg.com/736x/99/07/d0/9907d06aefd20069d74a159a5e6251ab.jpg"; // Default image for categories

export const CategorySlider = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/product?category=${encodeURIComponent(categoryName)}`);
  };

  if (loading) return <div className="container mx-auto px-4 py-10">Loading categories...</div>;
  if (error) return <div className="container mx-auto px-4 py-10">Error loading categories: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-row gap-4 overflow-x-auto">
        {categories.map((cat) => (
          <button key={cat.name} className="flex flex-col items-center group cursor-pointer flex-shrink-0 bg-transparent border-none p-0" onClick={() => handleCategoryClick(cat.name)}>
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border border-gray-100 mb-3 transition-all duration-300 group-hover:shadow-lg group-hover:border-blue-500">
              <img src={defaultImg} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
