import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { withCors } from '@/middleware/cors';
import { requireAuth } from '@/middleware/auth';

async function handler(request: NextRequest, user: any) {
  try {
    const body = await request.json();
    const { email, name, isAdmin } = body;

    const dbUser = await prisma.user.upsert({
      where: { firebaseUid: user.uid },
      update: {
        email: email || user.email,
        name: name || email?.split('@')[0],
        isAdmin: isAdmin || false,
      },
      create: {
        firebaseUid: user.uid,
        email: email || user.email || '',
        name: name || email?.split('@')[0] || 'User',
        isAdmin: isAdmin || false,
      },
    });

    return NextResponse.json({ success: true, data: dbUser });
  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to sync user' },
      { status: 500 }
    );
  }
}

export const POST = withCors(requireAuth(handler));
