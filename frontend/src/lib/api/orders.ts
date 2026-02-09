import apiClient, { ApiResponse } from '../api-client';
import { Product } from './products';

export interface OrderItem {
  id: string;
  productId: string;
  orderId: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Order {
  id: string;
  userId: string;
  total: number;
  status: string;
  shippingAddress: string;
  paymentMethod?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderWithItems extends Order {
  items: (OrderItem & { product: Product })[];
}

export interface CartItemForOrder {
  id: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  paymentMethod: string;
}

// Public order functions
export async function createOrder(data: {
  items: { id: string; quantity: number }[];
  shippingAddress: string;
  paymentMethod?: string;
}): Promise<ApiResponse<Order>> {
  return apiClient.post<Order>('/api/actions/orders/create', data);
}

export async function getOrders(): Promise<ApiResponse<Order[]>> {
  return apiClient.get<Order[]>('/api/actions/orders');
}

export async function getOrder(id: string): Promise<ApiResponse<Order>> {
  return apiClient.get<Order>(`/api/actions/orders/${id}`);
}

export async function getOrderById(id: string): Promise<ApiResponse<OrderWithItems>> {
  return apiClient.get<OrderWithItems>(`/api/actions/orders/${id}`);
}

export async function getOrdersByIds(ids: string[]): Promise<ApiResponse<OrderWithItems[]>> {
  return apiClient.post<OrderWithItems[]>('/api/actions/orders/by-ids', { ids });
}

export async function getOrderForDisplay(id: string): Promise<ApiResponse<OrderWithItems>> {
  return apiClient.get<OrderWithItems>(`/api/actions/orders/${id}/display`);
}

export async function updateOrderStatus(orderId: string, status: string): Promise<ApiResponse<Order>> {
  return apiClient.post<Order>(`/api/actions/orders/${orderId}/status`, { status });
}

// Checkout functions
export async function processCheckout(
  items: CartItemForOrder[],
  formData: CheckoutFormData
): Promise<ApiResponse<Order>> {
  return apiClient.post<Order>('/api/actions/checkout', { items, formData });
}

// Custom orders
export async function createCustomOrder(data: any): Promise<ApiResponse<any>> {
  return apiClient.post<any>('/api/actions/custom-orders', data);
}

export async function getCustomOrderById(id: string): Promise<ApiResponse<any>> {
  return apiClient.get<any>(`/api/actions/custom-orders/${id}`);
}

export async function approveCustomOrder(id: string): Promise<ApiResponse<any>> {
  return apiClient.post<any>(`/api/actions/custom-orders/${id}/approve`, {});
}

export async function getCustomOrdersForAdmin(): Promise<ApiResponse<any[]>> {
  return apiClient.get<any[]>('/api/admin/custom-orders');
}

export async function updateCustomOrderQuote(id: string, quote: number): Promise<ApiResponse<any>> {
  return apiClient.post<any>(`/api/admin/custom-orders/${id}/quote`, { quote });
}

export async function updateCustomOrderStatus(id: string, status: string): Promise<ApiResponse<any>> {
  return apiClient.post<any>(`/api/admin/custom-orders/${id}/status`, { status });
}

// Admin order functions
export async function getAllOrders(): Promise<ApiResponse<Order[]>> {
  return apiClient.get<Order[]>('/api/admin/orders');
}

export async function deleteOrder(id: string): Promise<ApiResponse<void>> {
  return apiClient.delete<void>(`/api/admin/orders/${id}`);
}

export async function getOrderStats(): Promise<ApiResponse<any>> {
  return apiClient.get<any>('/api/admin/orders/stats');
}
