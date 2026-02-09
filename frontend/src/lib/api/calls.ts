import apiClient, { ApiResponse } from '../api-client';

export interface VoiceCallSession {
  id: string;
  sessionId: string;
  userId: string;
  status: string;
  customerName?: string;
  customerEmail?: string;
  duration?: number;
  recordingUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Public call functions
export async function initiateCall(data: {
  sessionId: string;
  customerInfo?: {
    name?: string;
    email?: string;
  };
}): Promise<ApiResponse<VoiceCallSession>> {
  return apiClient.post<VoiceCallSession>('/api/actions/calls/initiate', data);
}

// Admin call functions
export async function getActiveCalls(): Promise<ApiResponse<VoiceCallSession[]>> {
  return apiClient.get<VoiceCallSession[]>('/api/admin/calls/active');
}

export async function getIncomingCallCount(): Promise<ApiResponse<number>> {
  return apiClient.get<number>('/api/admin/calls/incoming-count');
}

export async function getAllCallSessions(): Promise<ApiResponse<VoiceCallSession[]>> {
  return apiClient.get<VoiceCallSession[]>('/api/admin/calls');
}

export async function getCallStats(): Promise<ApiResponse<any>> {
  return apiClient.get<any>('/api/admin/calls/stats');
}

export async function updateCallStatus(id: string, status: string): Promise<ApiResponse<VoiceCallSession>> {
  return apiClient.post<VoiceCallSession>(`/api/admin/calls/${id}/status`, { status });
}

export async function deleteCallSession(id: string): Promise<ApiResponse<void>> {
  return apiClient.delete<void>(`/api/admin/calls/${id}`);
}

export async function answerCall(sessionId: string): Promise<ApiResponse<VoiceCallSession>> {
  return apiClient.post<VoiceCallSession>(`/api/admin/calls/${sessionId}/answer`, {});
}
