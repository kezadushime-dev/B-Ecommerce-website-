import api  from "../services/api";
import type {Product}  from "../pages/product";

interface Apiresponse{

  message:string;
  products?:Product[];
}


export const getProducts = async (): Promise<Apiresponse> => {
  const res = await api.get("/products");

  // Transform the products to match the Product interface
  const transformedProducts = res.data.products?.map((p: any) => ({
    id: p._id || p.id,
    name: p.name,
    category: typeof p.category === 'object' ? p.category.name : p.category,
    price: p.price,
    originalPrice: p.originalPrice,
    rating: p.rating || 0,
    reviews: p.reviews || 0,
    colors: p.colors || [],
    sizes: p.sizes || [],
    image: p.image,
    isFeatured: p.isFeatured || false,
    description: p.description || '',
    weight: p.weight || '',
    material: p.material || '',
    userReviews: p.userReviews || []
  }));

  return {
    message: res.data.message,
    products: transformedProducts
  };
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await api.get(`/Products/${id}`);
  return res.data;
};
