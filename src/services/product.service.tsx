import api, { publicApi } from "../services/api";
import type {Product}  from "../pages/product";

interface Apiresponse{

  message:string;
  products?:Product[];
}


export const getProducts = async (): Promise<Apiresponse> => {
  const res = await publicApi.get("/api/products");

  // Transform the products to match the Product interface
  const transformedProducts = res.data.products?.map((p: any) => {
    const imageBase = 'http://localhost:3000/uploads/';
    const processImage = (img: string) => img.startsWith('http') ? img : `${imageBase}${img.replace(/^\//, '')}`;

    return {
      id: p._id || p.id,
      name: p.name,
      category: typeof p.category === 'object' ? p.category.name : p.category,
      price: p.price,
      originalPrice: p.originalPrice,
      rating: p.rating || 0,
      reviews: p.reviews || 0,
      colors: p.colors || [],
      sizes: p.sizes || [],
      images: (p.images || (p.image ? [p.image] : [])).map(processImage),
      isFeatured: p.isFeatured || false,
      description: p.description || '',
      weight: p.weight || '',
      material: p.material || '',
      userReviews: p.userReviews || []
    };
  });

  return {
    message: res.data.message,
    products: transformedProducts
  };
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await api.get(`/api/products/${id}`);
  return res.data;
};
