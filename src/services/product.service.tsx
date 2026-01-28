import api  from "../services/api";
import type {Product}  from "../pages/product";


export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get("/products");

  return res.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await api.get(`/Products/${id}`);
  return res.data;
};
