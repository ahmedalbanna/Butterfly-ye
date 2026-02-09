import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { withCors } from '@/middleware/cors';
import { requireAuth } from '@/middleware/auth';
import { addToCallQueue, publishAdminNotification } from '@/lib/redis';

async function handler(request: NextRequest, user: any) {
  try {
    const body = await request.json();
    const { sessionId, customerInfo } = body;

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Create voice call session
    const callSession = await prisma.voiceCallSession.create({
      data: {
        sessionId,
        userId: user.uid,
        status: 'waiting',
        customerName: customerInfo?.name || 'Anonymous',
        customerEmail: customerInfo?.email,
      },
    });

    // Add to call queue
    await addToCallQueue({
      sessionId,
      userId: user.uid,
      customerName: customerInfo?.name || 'Anonymous',
      timestamp: new Date().toISOString(),
    });

    // Notify admins
    await publishAdminNotification({
      type: 'new_call',
      sessionId,
      customerName: customerInfo?.name || 'Anonymous',
    });

    return NextResponse.json({ success: true, data: callSession });
  } catch (error) {
    console.error('Error initiating call:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to initiate call' },
      { status: 500 }
    );
  }
}

export const POST = withCors(requireAuth(handler));
