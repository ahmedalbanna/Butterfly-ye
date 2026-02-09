import { NextRequest } from 'next/server';

export interface AuthUser {
  uid: string;
  email?: string;
  emailVerified: boolean;
}

/**
 * Validates Firebase ID token from request headers
 * In production, this should use Firebase Admin SDK for proper validation
 * For now, we accept the token and extract basic info
 */
export async function validateFirebaseToken(request: NextRequest): Promise<AuthUser | null> {
  const authHeader = request.headers.get('authorization');
  const firebaseToken = request.headers.get('x-firebase-token');
  
  const token = authHeader?.replace('Bearer ', '') || firebaseToken;
  
  if (!token) {
    return null;
  }
  
  try {
    // TODO: Implement proper Firebase Admin SDK token verification
    // For now, we decode the JWT payload (base64)
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    
    return {
      uid: payload.user_id || payload.sub,
      email: payload.email,
      emailVerified: payload.email_verified || false,
    };
  } catch (error) {
    console.error('Token validation error:', error);
    return null;
  }
}

export function requireAuth(handler: (request: NextRequest, user: AuthUser) => Promise<Response>) {
  return async (request: NextRequest) => {
    const user = await validateFirebaseToken(request);
    
    if (!user) {
      return Response.json(
        { success: false, error: 'Unauthorized - Invalid or missing authentication token' },
        { status: 401 }
      );
    }
    
    return handler(request, user);
  };
}
