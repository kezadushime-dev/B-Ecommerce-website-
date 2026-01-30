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


  console.log(products?.products);
  

  return (
    <div>
      <Hero />
      <CategorySlider />
      Products
      {/* 4. Replace the static <ProductSection /> with your dynamic row logic */}
      {/* We check loading here specifically so the rest of the page (Hero/Slider) is still visible */}
      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-4">
          { products && products.products?.map((p) => (
            <div key={p.id} className="flex-shrink-0 w-64">
              <ProductCard {...p} id={p.id.toString()} />
            </div>
          ))}
        </div>
      )}

      <MensFashionSection products={products} isLoading={isLoading} />
      <WomensFashionSection products={products} isLoading={isLoading} />
     <ServiceSection/>
    </div>
  );
};