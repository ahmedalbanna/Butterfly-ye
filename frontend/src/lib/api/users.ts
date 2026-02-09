import apiClient, { ApiResponse } from '../api-client';

export interface User {
  id: string;
  firebaseUid: string;
  email: string;
  name: string;
  phone?: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Contact extends User {
  orderCount?: number;
  totalSpent?: number;
  lastOrderDate?: string;
}

export async function syncUserToDb(data: {
  email: string;
  name?: string;
  isAdmin?: boolean;
}): Promise<ApiResponse<User>> {
  return apiClient.post<User>('/api/actions/users/sync', data);
}

// Admin user/contact functions
export async function getAllContacts(): Promise<ApiResponse<Contact[]>> {
  return apiClient.get<Contact[]>('/api/admin/contacts');
}

export async function getContactStats(): Promise<ApiResponse<any>> {
  return apiClient.get<any>('/api/admin/contacts/stats');
}
