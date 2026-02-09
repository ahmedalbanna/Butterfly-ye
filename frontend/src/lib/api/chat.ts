import apiClient, { ApiResponse } from '../api-client';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  userId: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface CustomerMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  replies?: any[];
}

// Public chat functions
export async function sendMessage(data: {
  message: string;
  sessionId: string;
}): Promise<ApiResponse<ChatSession>> {
  return apiClient.post<ChatSession>('/api/actions/messages/send', data);
}

export async function getAIResponse(data: {
  message: string;
  conversationHistory?: ChatMessage[];
}): Promise<ApiResponse<{ response: string; suggestions?: string[] }>> {
  return apiClient.post('/api/actions/chat/ai-response', data);
}

export async function createCustomerMessage(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<ApiResponse<CustomerMessage>> {
  return apiClient.post<CustomerMessage>('/api/actions/messages/customer', data);
}

// Admin chat functions
export async function getActiveChatSessions(): Promise<ApiResponse<ChatSession[]>> {
  return apiClient.get<ChatSession[]>('/api/admin/chat/active');
}

export async function getActiveChatCount(): Promise<ApiResponse<number>> {
  return apiClient.get<number>('/api/admin/chat/active-count');
}

export async function getAllMessages(): Promise<ApiResponse<CustomerMessage[]>> {
  return apiClient.get<CustomerMessage[]>('/api/admin/messages');
}

export async function getMessageById(id: string): Promise<ApiResponse<CustomerMessage>> {
  return apiClient.get<CustomerMessage>(`/api/admin/messages/${id}`);
}

export async function getMessageStats(): Promise<ApiResponse<any>> {
  return apiClient.get<any>('/api/admin/messages/stats');
}

export async function updateMessageStatus(id: string, status: string): Promise<ApiResponse<CustomerMessage>> {
  return apiClient.post<CustomerMessage>(`/api/admin/messages/${id}/status`, { status });
}

export async function updateMessagePriority(id: string, priority: string): Promise<ApiResponse<CustomerMessage>> {
  return apiClient.post<CustomerMessage>(`/api/admin/messages/${id}/priority`, { priority });
}

export async function addMessageReply(messageId: string, reply: string): Promise<ApiResponse<CustomerMessage>> {
  return apiClient.post<CustomerMessage>(`/api/admin/messages/${messageId}/reply`, { reply });
}

export async function replyToMessage(id: string, reply: string): Promise<ApiResponse<CustomerMessage>> {
  return apiClient.post<CustomerMessage>(`/api/admin/messages/${id}/reply`, { reply });
}

export async function deleteMessage(id: string): Promise<ApiResponse<void>> {
  return apiClient.delete<void>(`/api/admin/messages/${id}`);
}
