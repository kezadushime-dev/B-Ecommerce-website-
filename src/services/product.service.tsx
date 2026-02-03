import api, { publicApi } from "../services/api";
import type {Product}  from "../pages/product";

interface Apiresponse{

  message:string;
  products?:Product[];
}


export const getProducts = async (): Promise<Apiresponse> => {
  const res = await publicApi.get("/api/products?limit=1000");

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
      description: typeof p.description === 'string' ? p.description : '',
      weight: typeof p.weight === 'string' ? p.weight : '',
      material: typeof p.material === 'string' ? p.material : '',
      userReviews: (p.userReviews || []).map((review: any) => ({
        user: review.user,
        username: typeof review.username === 'string' ? review.username : (typeof review.user?.username === 'string' ? review.user.username : 'Anonymous'),
        rating: typeof review.rating === 'number' ? review.rating : 0,
        comment: typeof review.comment === 'string' ? review.comment : '',
        createdAt: typeof review.createdAt === 'string' ? review.createdAt : (typeof review.date === 'string' ? review.date : new Date().toISOString()),
        _id: review._id || ''
      }))
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

export const createProduct = async (productData: any): Promise<any> => {
  const res = await api.post('/api/products', productData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const updateProduct = async (id: string, productData: any): Promise<any> => {
  const res = await api.patch(`/api/products/${id}`, productData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const deleteProduct = async (id: string): Promise<any> => {
  const res = await api.delete(`/api/products/${id}`);
  return res.data;
};
