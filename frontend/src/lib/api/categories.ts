import apiClient, { ApiResponse } from '../api-client';

export interface Category {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    products: number;
  };
}

export interface CategoryWithCounts extends Category {
  productCount: number;
}

export async function getCategories(): Promise<ApiResponse<Category[]>> {
  return apiClient.get<Category[]>('/api/actions/categories');
}

export async function getCategoryBySlug(slug: string): Promise<ApiResponse<Category>> {
  return apiClient.get<Category>(`/api/actions/categories/slug/${slug}`);
}

export async function getCategoriesWithCounts(): Promise<ApiResponse<CategoryWithCounts[]>> {
  return apiClient.get<CategoryWithCounts[]>('/api/actions/categories/with-counts');
}

export async function createCategory(data: { name: string; description?: string }): Promise<ApiResponse<Category>> {
  return apiClient.post<Category>('/api/admin/categories', data);
}

export async function updateCategory(id: string, data: { name: string; description?: string }): Promise<ApiResponse<Category>> {
  return apiClient.put<Category>(`/api/admin/categories/${id}`, data);
}

export async function deleteCategory(id: string): Promise<ApiResponse<void>> {
  return apiClient.delete<void>(`/api/admin/categories/${id}`);
}
