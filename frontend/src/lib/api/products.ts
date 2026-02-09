import apiClient, { ApiResponse } from '../api-client';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  stock: number;
  categoryId?: string;
  category?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface GroupedProducts {
  featured: Product[];
  newArrivals: Product[];
  byCategory: { [key: string]: Product[] };
}

// Public product functions
export async function getProducts(params?: {
  category?: string;
  search?: string;
}): Promise<ApiResponse<Product[]>> {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.set('category', params.category);
  if (params?.search) searchParams.set('search', params.search);
  
  const query = searchParams.toString();
  return apiClient.get<Product[]>(`/api/actions/products${query ? `?${query}` : ''}`);
}

export async function getProduct(id: string): Promise<ApiResponse<Product>> {
  return apiClient.get<Product>(`/api/actions/products/${id}`);
}

export async function getHomePageData(): Promise<ApiResponse<GroupedProducts>> {
  return apiClient.get<GroupedProducts>('/api/actions/products/homepage');
}

export async function getProductsByCategorySlug(slug: string): Promise<ApiResponse<Product[]>> {
  return apiClient.get<Product[]>(`/api/actions/products/category/${slug}`);
}

export async function searchProducts(query: string): Promise<ApiResponse<Product[]>> {
  return apiClient.get<Product[]>(`/api/actions/products?search=${encodeURIComponent(query)}`);
}

// Admin product functions
export async function getAllProductsForAdmin(): Promise<ApiResponse<Product[]>> {
  return apiClient.get<Product[]>('/api/admin/products');
}

export async function createProduct(data: any): Promise<ApiResponse<Product>> {
  return apiClient.post<Product>('/api/admin/products', data);
}

export async function updateProduct(id: string, data: any): Promise<ApiResponse<Product>> {
  return apiClient.put<Product>(`/api/admin/products/${id}`, data);
}

export async function deleteProduct(id: string): Promise<ApiResponse<void>> {
  return apiClient.delete<void>(`/api/admin/products/${id}`);
}

export async function toggleProductFeatured(id: string): Promise<ApiResponse<Product>> {
  return apiClient.post<Product>(`/api/admin/products/${id}/toggle-featured`, {});
}

export async function generateModelPhoto(productId: string, prompt: string): Promise<ApiResponse<any>> {
  return apiClient.post<any>(`/api/admin/products/${productId}/generate-model`, { prompt });
}

export async function saveProductModelImage(productId: string, imageUrl: string): Promise<ApiResponse<Product>> {
  return apiClient.post<Product>(`/api/admin/products/${productId}/save-model-image`, { imageUrl });
}

export async function deleteProductImage(productId: string, imageUrl: string): Promise<ApiResponse<Product>> {
  return apiClient.post<Product>(`/api/admin/products/${productId}/delete-image`, { imageUrl });
}

export async function deleteProductModelImage(productId: string, imageUrl: string): Promise<ApiResponse<Product>> {
  return apiClient.post<Product>(`/api/admin/products/${productId}/delete-model-image`, { imageUrl });
}

export async function updateProductStock(productId: string, stock: number): Promise<ApiResponse<Product>> {
  return apiClient.post<Product>(`/api/admin/products/${productId}/stock`, { stock });
}

export async function publishProductToSocial(productId: string, platforms: string[]): Promise<ApiResponse<any>> {
  return apiClient.post<any>(`/api/admin/products/${productId}/publish-social`, { platforms });
}

export async function getSocialMediaPosts(): Promise<ApiResponse<any[]>> {
  return apiClient.get<any[]>('/api/admin/social-media/posts');
}

export async function getSocialMediaStats(): Promise<ApiResponse<any>> {
  return apiClient.get<any>('/api/admin/social-media/stats');
}

export async function retrySocialMediaPost(postId: string): Promise<ApiResponse<any>> {
  return apiClient.post<any>(`/api/admin/social-media/posts/${postId}/retry`, {});
}

export async function generateProductFromImage(imageData: string): Promise<ApiResponse<any>> {
  return apiClient.post<any>('/api/admin/products/generate-from-image', { imageData });
}

export async function generateProductsFromMultipleImages(images: string[]): Promise<ApiResponse<any[]>> {
  return apiClient.post<any[]>('/api/admin/products/generate-from-multiple', { images });
}
