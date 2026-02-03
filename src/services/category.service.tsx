import api, { publicApi } from "../services/api";
import type { Category } from "../Types/category";

// Types
export interface CategoryFilters {
  search?: string;
  parentId?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

export interface PaginatedCategories {
  data: Category[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// Category service functions
export const categoryService = {
  // GET all categories with pagination and filters
  getCategories: async (params?: CategoryFilters): Promise<Category[]> => {
    const response = await publicApi.get<Category[]>('/api/categories', { params });
    return response.data;
  },

  // GET single category
  getCategory: async (id: string): Promise<Category> => {
    const response = await api.get<ApiResponse<Category>>(`/api/categories/${id}`);
    return response.data.data;
  },

  // POST create category
  createCategory: async (categoryData: Omit<Category, '_id'>): Promise<Category> => {
    const response = await api.post<Category>('/api/categories', categoryData);
    return response.data;
  },

  // PUT update category
  updateCategory: async (id: string, categoryData: Partial<Omit<Category, '_id'>>): Promise<Category> => {
    const response = await api.put<Category>(`/api/categories/${id}`, categoryData);
    return response.data;
  },

  // DELETE category
  deleteCategory: async (id: string): Promise<void> => {
    await api.delete(`/api/categories/${id}`);
  },
};

// Legacy function for backward compatibility
export const getCategories = async (): Promise<Category[]> => {
  const response = await categoryService.getCategories();
  return response;
};
