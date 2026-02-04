import React from 'react';
// 1. Keep your existing layout imports
import { Hero, MensFashionSection, WomensFashionSection, PromoGrid, ServiceSection } from '../components/HomeComponents';
import { CategorySlider } from '../components/CategorySlider';

// 2. Add the new imports for data fetching
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/product.service";
import { ProductCard } from '../components/productCard';

export const HomePage: React.FC = () => {
  // 3. Add the useQuery hook
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });


  console.log('Products data:', products);
  console.log('Products array:', products?.products);
  console.log('Is loading:', isLoading);
  

  return (
    <div>
      <Hero />
      <CategorySlider />
      {/* 4. Replace the static <ProductSection /> with your dynamic row logic */}
      {/* We check loading here specifically so the rest of the page (Hero/Slider) is still visible */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Featured Products</h2>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            { products && products.products && products.products.length > 0 ? (
              products.products.slice(0, 10).map((p) => (
                <div key={p.id} className="w-full">
                  <ProductCard {...p} id={p.id.toString()} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No products available</p>
              </div>
            )}
          </div>
        )}
      </div>

      <MensFashionSection products={products} isLoading={isLoading} />
      <WomensFashionSection products={products} isLoading={isLoading} />
     <ServiceSection/>
    </div>
  );
};