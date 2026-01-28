import React from 'react';
// 1. Keep your existing layout imports
import { Hero, MensFashionSection, WomensFashionSection, PromoGrid } from '../components/HomeComponents';
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


  console.log(products?.products);
  

  return (
    <div>
      <Hero />
      <CategorySlider />
      
      {/* 4. Replace the static <ProductSection /> with your dynamic grid logic */}
      {/* We check loading here specifically so the rest of the page (Hero/Slider) is still visible */}
      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          { products && products.products?.map((p) => (
            <ProductCard key={p.id}  {...p} />
          ))}
        </div>
      )}

      <MensFashionSection />
      <WomensFashionSection />
      <PromoGrid />
    </div>
  );
};