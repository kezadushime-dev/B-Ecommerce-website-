import api, { publicApi } from "../services/api";
import type {Product}  from "../pages/product";

interface Apiresponse{

  message:string;
  products?:Product[];
}


export const getProducts = async (): Promise<Apiresponse> => {
  try {
    const res = await publicApi.get("/api/products?limit=1000");
    
    console.log('Raw API response:', res.data);
    
    // Handle different API response structures
    let productsArray = res.data.products || res.data.data || res.data;
    
    if (!Array.isArray(productsArray)) {
      console.warn('Products is not an array:', productsArray);
      return {
        message: res.data.message || 'No products found',
        products: []
      };
    }

    console.log('Products array length:', productsArray.length);
    console.log('First product:', productsArray[0]);

    // Transform the products to match the Product interface
    const transformedProducts = productsArray.map((p: any) => {
      if (!p) {
        console.warn('Empty product found:', p);
        return null;
      }
      
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const imageBase = `${apiUrl}/uploads/`;
      const processImage = (img: string) => {
        if (!img) return 'https://via.placeholder.com/400x400';
        return img.startsWith('http') ? img : `${imageBase}${img.replace(/^\//, '')}`;
      };

      const transformed = {
        id: p._id || p.id || Math.random().toString(),
        name: p.name || 'Unnamed Product',
        category: typeof p.category === 'object' ? p.category?.name : p.category || 'Uncategorized',
        price: Number(p.price) || 0,
        originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
        rating: Number(p.rating) || 0,
        reviews: Number(p.reviews) || 0,
        colors: Array.isArray(p.colors) ? p.colors : [],
        sizes: Array.isArray(p.sizes) ? p.sizes : [],
        images: p.images ? (Array.isArray(p.images) ? p.images.map(processImage) : [processImage(p.images)]) : (p.image ? [processImage(p.image)] : []),
        image: p.image ? processImage(p.image) : (p.images && p.images[0] ? processImage(p.images[0]) : undefined),
        isFeatured: Boolean(p.isFeatured),
        description: String(p.description || ''),
        weight: String(p.weight || ''),
        material: String(p.material || ''),
        userReviews: Array.isArray(p.userReviews) ? p.userReviews.map((review: any) => ({
          user: review.user,
          username: review.username || review.user?.username || 'Anonymous',
          rating: Number(review.rating) || 0,
          comment: String(review.comment || ''),
          createdAt: review.createdAt || review.date || new Date().toISOString(),
          _id: review._id || Math.random().toString()
        })) : []
      };
      
      console.log('Transformed product:', transformed);
      return transformed;
    }).filter(Boolean);

    console.log('Final transformed products:', transformedProducts);

    return {
      message: res.data.message || 'Success',
      products: transformedProducts
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      message: 'Error fetching products',
      products: []
    };
  }
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
