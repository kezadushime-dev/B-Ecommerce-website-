import api from './api';
import { sendOrderStatusEmail } from './email.service';

interface OrderData {
  shippingAddress: string;
  paymentMethod?: string;
  notes?: string;
}

interface CreateOrderData {
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
  userId?: string;
  shippingAddress: string;
  paymentMethod?: string;
  notes?: string;
}

interface OrderResponse {
  success: boolean;
  message: string;
  code?: string;
  order?: any;
}

export const placeOrder = async (orderData: OrderData): Promise<string> => {
  try {
    const response = await api.post<OrderResponse>('/api/orders', orderData);
    if (response.data.success) {
      return 'order success';
    } else {
      return 'order failed';
    }
  } catch (error: any) {
    console.error('Order placement failed:', error);
    return 'order failed';
  }
};

export const createOrder = async (orderData: CreateOrderData): Promise<any> => {
  try {
    const response = await api.post('/api/orders', orderData);
    return response.data;
  } catch (error: any) {
    console.error('Order creation failed:', error);
    throw error;
  }
};

export const getOrders = async (): Promise<any> => {
  try {
    const response = await api.get('/api/orders');
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch orders:', error);
    throw error;
  }
};

export const updateOrderStatus = async (id: string, status: string): Promise<any> => {
  try {
    // Get order details first to get customer email
    const orderResponse = await api.get(`/api/orders/${id}`);
    const order = orderResponse.data;
    const customerEmail = order.userEmail || order.email || 'customer@example.com'; // Fallback email

    const response = await api.patch(`/api/admin/orders/${id}/status`, { status });

    // Send email notification for all status changes
    try {
      await sendOrderStatusEmail(customerEmail, status, id);
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't throw error for email failure, just log it
    }

    return response.data;
  } catch (error: any) {
    console.error('Failed to update order status:', error);
    throw error;
  }
};

export const deleteOrder = async (id: string): Promise<any> => {
  try {
    // Get order details first to get customer email before deletion
    const orderResponse = await api.get(`/api/orders/${id}`);
    const order = orderResponse.data;
    const customerEmail = order.userEmail || order.email || 'customer@example.com';

    const response = await api.delete(`/api/admin/orders/${id}`);

    // Send email notification for order deletion
    try {
      await sendOrderStatusEmail(customerEmail, 'deleted', id);
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
    }

    return response.data;
  } catch (error: any) {
    console.error('Failed to delete order:', error);
    throw error;
  }
};
