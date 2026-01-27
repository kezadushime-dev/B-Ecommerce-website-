import React from 'react';
import { Hero, MensFashionSection, WomensFashionSection, ProductSection, PromoGrid } from '../components/HomeComponents';
import { CategorySlider } from '../components/CategorySlider';

export const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <CategorySlider />
      <ProductSection />
      <MensFashionSection />
      <WomensFashionSection />
      <PromoGrid />
    
    </div>
  );
};