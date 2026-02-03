import api from './api';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get('/api/orders');
  return response.data;
};

export const getOrderById = async (id: string): Promise<Order> => {
  const response = await api.get(`/api/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async (id: string, status: Order['status']): Promise<Order> => {
  const response = await api.patch(`/api/orders/${id}`, { status });
  return response.data;
};

export const deleteOrder = async (id: string): Promise<void> => {
  await api.delete(`/api/orders/${id}`);
};
