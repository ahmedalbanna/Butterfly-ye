import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { withCors } from '@/middleware/cors';
import { requireAuth } from '@/middleware/auth';

async function handler(request: NextRequest, user: any) {
  try {
    const body = await request.json();
    const { message, sessionId } = body;

    if (!message || !sessionId) {
      return NextResponse.json(
        { success: false, error: 'Message and session ID are required' },
        { status: 400 }
      );
    }

    // Create or get session
    let session = await prisma.chatSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      session = await prisma.chatSession.create({
        data: {
          id: sessionId,
          userId: user.uid,
          messages: [],
        },
      });
    }

    // Add message to session
    const messages = Array.isArray(session.messages) ? session.messages : [];
    messages.push({
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    });

    const updatedSession = await prisma.chatSession.update({
      where: { id: sessionId },
      data: { messages },
    });

    return NextResponse.json({ success: true, data: updatedSession });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

export const POST = withCors(requireAuth(handler));
