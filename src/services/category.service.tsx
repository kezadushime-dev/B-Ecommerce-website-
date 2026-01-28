import api from "../services/api";
import type { Category } from "../Types/category";

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get("/categories");
  return res.data;
};
