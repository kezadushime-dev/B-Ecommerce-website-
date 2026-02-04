import api from './api';

interface EmailData {
  to: string;
  subject: string;
  message: string;
}

export const sendOrderStatusEmail = async (email: string, status: string, orderId: string): Promise<any> => {
  try {
    const emailData: EmailData = {
      to: email,
      subject: `Order ${status.charAt(0).toUpperCase() + status.slice(1)} Notification`,
      message: `Your order #${orderId.slice(-8)} has been ${status}. Thank you for shopping with us!`
    };

    const response = await api.post('/api/send-email', emailData);
    return response.data;
  } catch (error: any) {
    console.error('Failed to send email:', error);
    throw error;
  }
};
